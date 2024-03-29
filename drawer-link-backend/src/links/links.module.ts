import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drawer } from '../drawers/entities/drawer.entity';
import { User } from '../users/entities/user.entity';
import { Link } from './entities/link.entity';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Link, User, Drawer])
  ],
  providers: [LinksService],
  controllers: [LinksController]
})
export class LinksModule { }
