import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const publicRoutes = ["/login"];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("drawer-link-session")?.value;

    if (publicRoutes.includes(pathname)) {
        if (token) {
            try {
                jwt.verify(token, process.env.JWT_SECRET!);
                return NextResponse.redirect(new URL("/", request.url));
            } catch (e) {
                const response = NextResponse.next();
                response.cookies.delete("drawer-link-session");
                return response;
            }
        }
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET!);
        return NextResponse.next();
    } catch (e) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("drawer-link-session");
        return response;
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
