import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const handler = NextAuth({

    providers: [

        CredentialsProvider({

            name: "credentials",

            credentials: {

                email: {
                    label: "Email",
                    type: "text",
                },

                password: {
                    label: "Password",
                    type: "password",
                },

            },

            async authorize(credentials) {

                if (
                    !credentials?.email ||
                    !credentials?.password
                ) {
                    return null;
                }

                const admin =
                    await prisma.admin.findFirst({

                        where: {

                            email:
                                credentials.email,

                        },

                    });

                if (!admin) {

                    return null;

                }

                const validPassword =
                    await bcrypt.compare(

                        credentials.password,

                        admin.password

                    );

                if (!validPassword) {

                    return null;

                }

                await prisma.admin.update({

                    where: {

                        id: admin.id,

                    },

                    data: {

                        lastLogin: new Date(),

                    },

                });

                return {

                    id: admin.id.toString(),

                    name: admin.name,

                    email: admin.email,

                    role: "admin",

                };

            },

        }),

    ],

    session: {

        strategy: "jwt",

    },

    callbacks: {

        async jwt({ token, user }) {

            if (user) {

                token.role = (user as any).role;

            }

            return token;

        },

        async session({ session, token }) {

            if (session.user) {

                (session.user as any).role =
                    token.role;

            }

            return session;

        },

    },

    pages: {

        signIn: "/admin/login",

    },

    secret: process.env.NEXTAUTH_SECRET,

});

export { handler as GET, handler as POST };