import GoogleProfile from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { authLogin } from "@/app/services/authConfig";

export const authConfig = {
  providers: [
    GoogleProfile({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password" },
        type: { label: "Type" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await authLogin(
          credentials?.email,
          credentials?.password,
          credentials?.type
        );

        if (!res) return null;

        try {
          if (res.status === 400) {
            console.log("Error 0000", res.status);
            const error = new Error("Помилка: неправильні дані");
            error.status = 400;
            throw error;
          }
          const response = await res.json();
          const { token, refreshToken } = response;
          if (response && response.error) {
            return null;
          }

          if (res.ok && response) {
            const sessionUser = {
              name: token,
              email: refreshToken,
              image: "not google",
            };

            return sessionUser;
          } else {
            return null;
          }
        } catch (err) {
          console.error("Error parsing JSON response:", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
    async session({ session, user, token }) {
      if (session.user.image !== "not google") {
        const res = await authLogin(session.user.email, "password", "google");
        if (res.ok) {
          const response = await res.json();
          const { token, refreshToken } = response;
          const sessionUser = {
            name: token,
            email: refreshToken,
            image: "google",
          };

          session.user = sessionUser;
        }
      }

      return session;
    },
  },
};
