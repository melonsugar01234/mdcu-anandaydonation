import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const CORRECT_PASSPHRASE = process.env.PASSPHRASE; // Change this to your desired passphrase

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
    }
};