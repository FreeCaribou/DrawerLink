import { DataSource, DataSourceOptions } from "typeorm";
import { Drawer } from "./drawers/entities/drawer.entity";
import { Link } from "./links/entities/link.entity";
import { User } from "./users/entities/user.entity";

export const appDataSourceConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: +process.env.DATABASE_PORT || 3306,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.NODE_ENV === 'prod' ?
    process.env.DATABASE_NAME || 'drawer_link' :
    process.env.DATABASE_NAME_TEST || 'drawer_link',
  entities: [User, Drawer, Link],
  logging: true,
  synchronize: true,
}

export const AppDataSource = new DataSource(appDataSourceConfig);

AppDataSource.initialize();
