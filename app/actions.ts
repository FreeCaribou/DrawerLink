'use server'

import { authService } from "@/services/auth.service";
import { savedLinkService } from "@/services/saved-link.service";
import { refresh } from "next/cache";
import * as bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createLinkAction(data: { label: string, link: string }) {
    const { label, link } = data;

    if (!label || !link) {
        console.warn('createLink called with invalid data:', data);
        return;
    }

    try {
        await savedLinkService.create({ label, link });
        refresh();
    } catch (error) {
        console.error('Creation of saved link failed');
    }
}

export async function loginAction(data: loginDto) {
    const { username, password } = data;

    if (!username || !password) {
        console.warn('login called with invalid data');
        return;
    }

    const user = await authService.getUserByUsername(username);
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");
    const token = authService.signToken({ userId: user.id, username: user.username });

    const cookieStore = await cookies();
    cookieStore.set("drawer-link-session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 24h
        path: "/",
    });

    redirect("/");
}
