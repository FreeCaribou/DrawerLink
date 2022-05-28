import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DrawersModule } from './drawers/drawers.module';
import { LinksModule } from './links/links.module';
import { EncryptionModule } from './encryption/encryption.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      // ignoreEnvFile: true,
      // load: [appConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: +process.env.DATABASE_PORT || 3306,
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || '',
      database: process.env.NODE_ENV === 'prod' ?
        process.env.DATABASE_NAME || 'drawer_link' :
        process.env.DATABASE_NAME_TEST || 'drawer_link',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      logging: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    UsersModule,
    DrawersModule,
    LinksModule,
    EncryptionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
