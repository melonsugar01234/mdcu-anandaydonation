import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const CORRECT_PASSPHRASE = process.env.PASSPHRASE;

export const config: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Passphrase",
            credentials: {
                passphrase: { label: "Passphrase", type: "password" }
            },
            async authorize(credentials) {
                if (credentials?.passphrase === CORRECT_PASSPHRASE) {
                    return {
                        id: "1",
                        name: "Authenticated User"
                    };
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id as string,
                    name: token.name as string
                };
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
            }
            return token;
        }
    },
    secret: process.env.NEXTAUTH_SECRET, 
    debug: process.env.NODE_ENV === "development" 
};
