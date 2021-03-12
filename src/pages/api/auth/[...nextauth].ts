import NextAuth, { InitOptions } from "next-auth";
import Providers from "next-auth/providers";
import { NowRequest, NowResponse } from "@vercel/node";

interface IAccount {
  userId: string;
  expires: Date;
  sessionToken: string;
  accessToken: string;
  id: string;
}

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  MONGODB_URI,
  SECRET,
} = process.env;

const options: InitOptions = {
  providers: [
    Providers.GitHub({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],

  database: MONGODB_URI,
  secret: SECRET,

  debug: false,
  callbacks: {
    async signIn(user: any, account: IAccount, profile: any) {
      return true;
    },
    async redirect(url: string, _: string) {
      if (url === "/api/auth/signin") {
        return Promise.resolve("/");
      }

      return Promise.resolve("/api/auth/signin");
    },
    async session(session: any, user: any) {
      session.user = user;

      return Promise.resolve(session);
    },
    async jwt(token: any, profile: any) {
      return Promise.resolve(token);
    },
  },
};

export default (req: NowRequest, res: NowResponse) =>
  NextAuth(req, res, options);
