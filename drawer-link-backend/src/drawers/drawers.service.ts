import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Repository } from "typeorm";
import { Drawer } from "./entities/drawer.entity";
import { CreateDrawerDto } from "./dto/create-drawer.dto";

@Injectable()
export class DrawersService {

  constructor(
    @InjectRepository(Drawer)
    private readonly drawerRepository: Repository<Drawer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAllByUser(token: string) {
    const jwt = require('jsonwebtoken');
    const dToken = jwt.verify(token, process.env.JWT_SECURITY_KEY);
    const user: User = await this.userRepository.findOne({ where: { uuid: dToken.uuid } });
    return this.drawerRepository.find({
      relations: {links: true},
      where: {
        user: {
          uuid: user.uuid,
        },
      },
    });
  }

  async deleteOne(uuid: string, token: string) {
    const drawer = await this.drawerRepository.findOne({ where: {uuid: uuid}, relations: {user: true} });
    if (!drawer) {
      throw new HttpException({ message: ['The drawer didn\'t exist'] }, HttpStatus.NOT_FOUND);
    }

    const jwt = require('jsonwebtoken');
    const user = jwt.verify(token, process.env.JWT_SECURITY_KEY);
    // we verify that the user is the owner
    if (user.uuid != drawer.user?.uuid) {
      throw new HttpException({ message: ['This isn\'t your drawer'] }, HttpStatus.FORBIDDEN);
    }

    await this.drawerRepository.delete(uuid);
    delete drawer.user;
    return drawer;
  }

  async create(createDrawerDto: CreateDrawerDto, token: string) {
    const jwt = require('jsonwebtoken');
    const dToken = jwt.verify(token, process.env.JWT_SECURITY_KEY);
    const user = await this.userRepository.findOne({ where: { uuid: dToken.uuid } });

    if (!user) {
      throw new HttpException({ message: ['You are not connected'] }, HttpStatus.FORBIDDEN);
    }

    createDrawerDto.user = user;
    const drawer = await this.drawerRepository.create(createDrawerDto);
    await this.drawerRepository.save(drawer);
    delete drawer.user;
    return drawer;
  }
}