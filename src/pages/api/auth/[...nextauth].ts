import { ObjectId } from "mongodb";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../_lib/mongodb";

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

//@ts-ignore
export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],

  database: MONGODB_URI,
  secret: SECRET,

  debug: true,

  callbacks: {
    async signIn(user: any, account: IAccount, profile: any) {
      return true;
    },
    async redirect(url: string, baseUrl: string) {
      return baseUrl;
    },
    async session(session: any, user: any) {
      return session;
    },
    async jwt(
      token: any,
      user: any,
      account: any,
      profile: any,
      isNewUser: boolean
    ) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }

      return token;
    },
  },
});
