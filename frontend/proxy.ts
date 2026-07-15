import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function proxy(req) {
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {

                // Allow login page without authentication
                if (req.nextUrl.pathname === "/admin/login") {
                    return true;
                }

                // Protect all other admin pages
                return !!token;
            },
        },
    }
);

export const config = {
    matcher: [
        "/admin/:path*",
    ],
};