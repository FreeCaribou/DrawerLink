import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Repository } from "typeorm";
import { Link } from "./entities/link.entity";
import { Drawer } from "../drawers/entities/drawer.entity";
import { CreateLinkDto } from "./dto/create-link.dto";

@Injectable()
export class LinksService {

  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
    @InjectRepository(Drawer)
    private readonly drawerRepository: Repository<Drawer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createLinkDto: CreateLinkDto, token: string) {
    const jwt = require('jsonwebtoken');
    const dToken = jwt.verify(token, process.env.JWT_SECURITY_KEY);

    const user = await this.userRepository.findOne({ where: { uuid: dToken.uuid } });
    if (!user) {
      throw new HttpException({ message: ['You are not connected'] }, HttpStatus.FORBIDDEN);
    }

    const drawer = await this.drawerRepository.findOne({ where: { uuid: createLinkDto.drawerUuid } });
    if (!drawer) {
      throw new HttpException({ message: ['The drawer you try to link does not exit'] }, HttpStatus.FORBIDDEN);
    }

    createLinkDto['user'] = user;
    createLinkDto['drawer'] = drawer;
    const link = await this.linkRepository.create(createLinkDto);
    await this.linkRepository.save(link);
    delete link.user;
    return link;
  }

  async getMyTags(token: string) {
    const jwt = require('jsonwebtoken');
    const dToken = jwt.verify(token, process.env.JWT_SECURITY_KEY);

    const user = await this.userRepository.findOne({ where: { uuid: dToken.uuid }, });
    if (!user) {
      throw new HttpException({ message: ['You are not connected'] }, HttpStatus.FORBIDDEN);
    }

    const links = await this.linkRepository.find({
      select: {
        tags: true,
      },
      where: {
        user: {
          uuid: user.uuid
        }
      },
    });

    return [... new Set(links.flatMap(l => l.tags))];
  };

}
