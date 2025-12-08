import "reflect-metadata";
import { SavedLink } from "../entities/SavedLink.entity";
import { DataSource } from "typeorm";
import { User } from "@/entities/User.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 5432,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    synchronize: false,
    logging: true,
    entities: [SavedLink, User],
})