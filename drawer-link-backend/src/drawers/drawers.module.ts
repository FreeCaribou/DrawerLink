import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from 'src/links/entities/link.entity';
import { User } from '../users/entities/user.entity';
import { DrawersController } from './drawers.controller';
import { DrawersService } from './drawers.service';
import { Drawer } from './entities/drawer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Drawer, User, Link])
  ],
  providers: [DrawersService],
  controllers: [DrawersController]
})
export class DrawersModule { }
