// For the migration !!!
require("dotenv").config();
require("reflect-metadata");
const { DataSource } = require("typeorm");
const { SavedLink } = require("../entities/SavedLink.entity");
const { Migration1764068383793 } = require("../migrations/1764068383793-migration");

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 5432,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  synchronize: false,
  logging: true,
  entities: [SavedLink],
  migrations: [Migration1764068383793],
});

module.exports = { AppDataSource };