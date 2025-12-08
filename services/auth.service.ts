import * as jwt from "jsonwebtoken";
import { serialize, parse } from "cookie";
import { AppDataSource } from "@/database/data-source";
import { User } from "@/entities/User.entity";

const JWT_SECRET = process.env.JWT_SECRET || 'notsecurelikethat';

export const authService = {

    signToken(payload: object) {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
    },

    verifyToken(token: string) {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch {
            return null;
        }
    },

    parseCookies(cookieHeader: string | undefined) {
        return parse(cookieHeader || "");
    },

    getUserByUsername: async (username: string): Promise<User> => {
        await initAppDataSource();
        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOneBy({ username });
        if (user) {
            return user;
        }
        throw new Error("User not found");
    },

};

async function initAppDataSource() {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
};