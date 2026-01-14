// For the migration !!!
require("dotenv").config();
require("reflect-metadata");
const { DataSource } = require("typeorm");
const { SavedLink } = require("../entities/SavedLink.entity");
const { User } = require("../entities/User.entity");
const { Migration1764068383793 } = require("../migrations/1764068383793-migration");
const { Migration1765187450796 } = require("../migrations/1765187450796-migration");
const { Migration1765196004475 } = require("../migrations/1765196004475-migration");

const AppDataSourceMigration = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 5432,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  synchronize: false,
  logging: true,
  entities: [SavedLink, User],
  migrations: [Migration1764068383793, Migration1765187450796, Migration1765196004475],
});

module.exports = { AppDataSourceMigration };