import type { AuthOptions, User } from "next-auth";
import GoogleProfile from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { authLogin } from "@/app/services/authConfig";
export const authConfig: AuthOptions = {
  providers: [
    GoogleProfile({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // const res = await authLogin(credentials?.email, credentials?.password);

        // if (!res) return null;

        // try {
        // const user = await res.json();
        // if (user && user.error) {
        //   return null;
        // }

        // if (res.ok && user) {
        //   const sessionUser = {
        //     id: user.user.id,
        //     name: user.user.name,
        //     email: user.token,
        //   };
        const sessionUser = {
          id: "wqfdwqfew",
          name: "Max",
          email: "dsgfg@eses",
        };

        return sessionUser as User;
        // } else {
        //   return null;
        // }
        // } catch (err) {
        //   console.error("Error parsing JSON response:", err);
        //   return null;
        // }
      },
    }),
  ],
};
