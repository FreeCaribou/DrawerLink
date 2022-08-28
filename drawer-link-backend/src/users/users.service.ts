import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable()
export class UsersService {

  jwt = require('jsonwebtoken');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly encryptionService: EncryptionService
  ) { }

  async signUp(signUpUserDto: SignUpUserDto) {
    // verify not double email
    const findOneByEmail = await this.findUserByEmail(signUpUserDto.email);
    if (findOneByEmail) {
      // TODO the message
      throw new HttpException({ message: ['Email already in use'] }, HttpStatus.BAD_REQUEST);
    }

    // encrypt the password
    const encryptPwd = await this.encryptionService.hash(signUpUserDto.password);

    // let create it with the basic simple-user role
    let user = await this.userRepository.create({
      pseudo: signUpUserDto.pseudo,
      email: signUpUserDto.email,
      password: encryptPwd,
    });

    await this.userRepository.save(user);

    const token = await this.createUserToken(user);
    return { token, pseudo: user.pseudo, email: user.email }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.findUserByEmailAdmin(loginUserDto.email);

    // the user exist?
    if (!user) {
      throw new HttpException({ message: ['Are you already registered?'] }, HttpStatus.BAD_REQUEST);
    }

    // it is the good password?
    if (!await this.encryptionService.compare(loginUserDto.password, user.password)) {
      throw new HttpException({ message: ['Bad password.'] }, HttpStatus.BAD_REQUEST);
    }

    const token = await this.createUserToken(user);

    return { token, pseudo: user.pseudo, email: user.email };
  }

  findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email }, select: { uuid: true, pseudo: true, email: true } });
  }

  findUserByEmailAdmin(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  createUserToken(user: User) {
    return this.jwt.sign({ pseudo: user.pseudo, uuid: user.uuid }, process.env.JWT_SECURITY_KEY);
  }

}
