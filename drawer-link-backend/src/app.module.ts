import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DrawersModule } from './drawers/drawers.module';
import { LinksModule } from './links/links.module';
import { EncryptionModule } from './encryption/encryption.module';
import { appDataSourceConfig } from './data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      // ignoreEnvFile: true,
      // load: [appConfig],
    }),
    TypeOrmModule.forRoot({
      ...appDataSourceConfig, entities: [__dirname + '/**/*.entity{.ts,.js}']
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

