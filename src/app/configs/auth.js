import GoogleProfile from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { authLogin } from "@/app/services/authConfig";


class RequestUser {
  constructor(email, password, type, name, phoneNumber, dateOfBirth, country) {
    this.email = email;
    this.password = password;
    this.type = type;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.dateOfBirth = dateOfBirth;
    this.country = country;
  }
}

export const authConfig = {
  providers: [
    GoogleProfile({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      credentials: {
        token : { label: "Token", type: "text" },
        refreshToken: { label: "Refresh Token", type: "text" },
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password" },
        type: { label: "Type" },
        name: { label: "Name", type: "text" },
        phoneNumber: { label: "Phone Number", type: "text" },
        dateOfBirth: { label: "Date of Birth", type: "date" },
        country: { label: "Country", type: "text" },
      },
      async authorize(credentials) {
        if (credentials?.token && credentials?.refreshToken) {
          const sessionUser = {
            name: credentials.token,
            email: credentials.refreshToken,
            image: "not google",
          };
          return sessionUser;
        }
        if (!credentials?.email || !credentials?.password) return null;

        const user = {
          email: credentials?.email.toString(),
          password: credentials?.password,
          type: credentials?.type,
          name: credentials?.name,
          phoneNumber: credentials?.phoneNumber,
          dateOfBirth: credentials?.dateOfBirth,
          country: credentials?.country
        };

        const requestUser = new RequestUser(
          user.email,
          user.password,
          user.type,
          user.name,
          user.phoneNumber,
          user.dateOfBirth,
          user.country
        );
        const res = await authLogin(requestUser);
        if (res.headers.get('content-type') && res.headers.get('content-type').includes('application/json')) {
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
            if (res.status === 200 && Array.isArray(response)) {
              const countries = response.map((country) => {
                return {
                  name: country.name,
                  countryCode: country.countryCode
                };
              });

              const newRes = { ...res, countries };

              return { data: newRes };
            }

            if (res.status === 200 && response.token && response.refreshToken) {
              const sessionUser = {
                name: response.token,
                email: response.refreshToken,
                image: "not google",
              };
              return sessionUser;
            }
            return null;

          } catch (err) {
            console.error("Error parsing JSON response:", err);
            return null;
          }
        } else {
          if (res.status === 200) {
            const textResponse = await res.text();
            const error = new Error(textResponse);
            error.status = 400;
            throw error;
          } else if (res.status === 400) {
            console.log("Error 0000", res.status);
            const textResponse = await res.text();
            const error = new Error(textResponse);
            error.status = 400;
            throw error;
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
        token.refreshToken = account.refreshToken;
      }
      return token;
    },
    async session({ session, user, token }) {
      if (token.accessToken && token.refreshToken) {
        session.user.name = token.accessToken;
        session.user.email = token.refreshToken;
      }
      if (session.user.image !== "not google") {
        const requestUser = new RequestUser(
          session.user.email,
          "password",
          "google",
          session.user.name
        );
       console.log(requestUser);
        const res = await authLogin(requestUser);
        console.log(res.status);
        if (res.ok) {
          const response = await res.json();
          const { token, refreshToken } = response;
          console.log("response", response);
          const sessionUser = {
            name: token,
            email: refreshToken,
            image: "not google",
          };
          session.user = sessionUser;
          console.log("session.user", session.user);
        }
      }
      return session;
    },
  },
 };