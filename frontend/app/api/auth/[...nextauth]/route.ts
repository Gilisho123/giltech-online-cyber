import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",

            credentials: {
                username: {},
                password: {},
            },

            async authorize(credentials) {
                if (
                    credentials?.username === process.env.ADMIN_USERNAME &&
                    credentials?.password === process.env.ADMIN_PASSWORD
                ) {
                    return {
                        id: "1",
                        name: "Administrator",
                    };
                }

                return null;
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/admin/login",
    },

    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };