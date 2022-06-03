import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { mockingData } from '../src/common/mocking-data';
import { getConnection } from 'typeorm';
import { Drawer } from '../src/drawers/entities/drawer.entity';

jest.setTimeout(1000 * 10);

let connection;

describe('AppController (e2e)', () => {
  let app: INestApplication;

  let simpleUserToken;
  let secondUserToken

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    connection = await getConnection();

    await mockingData();
    await app.init();
  });

  it('(GET) / ', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('Users connection', () => {
    it('(POST) /users/login with Samy', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send({ email: "samy@drawerlink.com", password: "yep" })
        .expect(201);

      const responseBody = response.body;
      simpleUserToken = response.body.token;

      expect(simpleUserToken).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
      expect(responseBody.pseudo).toBe('Samy');
      expect(responseBody.email).toBe("samy@drawerlink.com");
    });

    it('(POST) /users/login with Caribou', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send({ email: "caribou@drawerlink.com", password: "plop" })
        .expect(201);

      const responseBody = response.body;
      secondUserToken = response.body.token;

      expect(simpleUserToken).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
      expect(responseBody.pseudo).toBe('Caribou');
    });

    it('(POST) /users/login with Samy but bad password', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send({ email: "samy@drawerlink.com", password: "wesh" })
        .expect(400);

      const responseBody = response.body;
      expect(responseBody.message[0]).toBe('Bad password.');
    });

    it('(POST) /users/login with Flo who dont exist yet', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send({ email: "flo@drawerlink.com", password: "hello" })
        .expect(400);

      const responseBody = response.body;
      expect(responseBody.message[0]).toBe('Are you already registered?');
    });

    it('(POST) /users/signup with Flo but without pseudo', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/signup')
        .send({ email: "flo@drawerlink.com", password: "hello" })
        .expect(400);

      const responseBody = response.body;
      expect(responseBody.message[0]).toBe('pseudo must be a string');
    });

    it('(POST) /users/signup with Flo', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/signup')
        .send({ email: "flo@drawerlink.com", password: "hello", pseudo: "Flo" })
        .expect(201);

      const responseBody = response.body;
      expect(responseBody.token).not.toBeNull();
      expect(responseBody.pseudo).toBe('Flo');
      expect(responseBody.email).toBe("flo@drawerlink.com");
    });

    it('(POST) /users/signup with Flo but already present', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/signup')
        .send({ email: "flo@drawerlink.com", password: "hello", pseudo: "Flo" })
        .expect(400);

      const responseBody = response.body;
      expect(responseBody.message[0]).toBe('Email already in use');
    });
  });

  describe('Drawer test', () => {
    let drawerPolitic: Drawer;
    it('(GET) /drawers get all drawers but have no user connected', async () => {
      const response = await request(app.getHttpServer())
        .get('/drawers')
        .expect(403);

      const responseBody = response.body;
      expect(responseBody.message[0]).toBe('You must be connected to use it');
    });

    it('(GET) /drawers get all drawers of Samy user', async () => {
      const response = await request(app.getHttpServer())
        .get('/drawers')
        .set('user_token', simpleUserToken)
        .expect(200);

      const responseBody = response.body;
      drawerPolitic = responseBody[0];
      expect(responseBody.length).toBe(2);
      expect(responseBody[0].label).toBe('Politic');
      expect(responseBody[1].description).toBe('For the games');
    });

    it('(DELETE) /drawers/:uuid delete the drawer politic from Samy but with other user', async () => {
      const response = await request(app.getHttpServer())
        .delete('/drawers/' + drawerPolitic.uuid)
        .set('user_token', secondUserToken)
        .expect(403);

      const responseBody = response.body;
      expect(responseBody.message[0]).toBe('This isn\'t your drawer');
    });

    it('(DELETE) /drawers/:uuid delete the drawer politic from Samy', async () => {
      const response = await request(app.getHttpServer())
        .delete('/drawers/' + drawerPolitic.uuid)
        .set('user_token', simpleUserToken)
        .expect(200);

      const responseBody = response.body;
      expect(responseBody.label).toBe('Politic');
    });

    it('(GET) /drawers get all drawers of Samy user, must have one after the delete', async () => {
      const response = await request(app.getHttpServer())
        .get('/drawers')
        .set('user_token', simpleUserToken)
        .expect(200);

      const responseBody = response.body;
      expect(responseBody.length).toBe(1);
    });

    it('(DELETE) /drawers/:uuid delete the drawer politic from Samy but not here anymore', async () => {
      const response = await request(app.getHttpServer())
        .delete('/drawers/' + drawerPolitic.uuid)
        .set('user_token', simpleUserToken)
        .expect(404);

      const responseBody = response.body;
      expect(responseBody.message[0]).toBe('The drawer didn\'t exist');
    });

    it('(POST) /drawers/ add a new drawer for Samy', async () => {
      const response = await request(app.getHttpServer())
        .post('/drawers')
        .set('user_token', simpleUserToken)
        .send({ label: "History" })
        .expect(201);

      const responseBody = response.body;
      expect(responseBody.label).toBe('History');
      expect(responseBody.user).toBeUndefined();
    });

    it('(GET) /drawers get all drawers of Samy user, must have two after the post', async () => {
      const response = await request(app.getHttpServer())
        .get('/drawers')
        .set('user_token', simpleUserToken)
        .expect(200);

      const responseBody = response.body;
      expect(responseBody.length).toBe(2);
    });
  });



  // The end, we close all
  afterAll(async () => {
    connection = await getConnection().close();
    await app.close();
  });

});
