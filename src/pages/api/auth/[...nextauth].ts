import NextAuth, { InitOptions } from "next-auth";
import Providers from "next-auth/providers";
import { NowRequest, NowResponse } from "@vercel/node";
import { GenericObject } from "next-auth/_utils";

import { connectToDatabase } from '@lib/mongodb';

import { ObjectId } from "mongodb";

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  MONGODB_URI,
  SECRET,
} = process.env;

let username: string;

const options: InitOptions = {
  providers: [
    Providers.GitHub({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      scope: 'public_repo',
    }),
  ],

  database: MONGODB_URI,
  secret: SECRET,

  jwt: {
    secret: SECRET,
    encryption: true,
  },

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  events: {
    createUser: async (message) => {
      const { db } = await connectToDatabase();

      const usersCollection = db.collection('users');

      usersCollection.updateOne(
        { _id: new ObjectId(message.id) },
        {
          $set: {
            username,
          }
        }
      )
    }
  },

  debug: true,
  callbacks: {
    async signIn(user: GenericObject, account: GenericObject, profile: GenericObject) {
      username = profile.login

      return true;
    },
    async redirect(url: string, _: string) {
      return Promise.resolve("/");
    },
    async session(session: any, user: any) {
      session.user = user;

      return Promise.resolve(session);
    },
    async jwt(token: GenericObject, user: GenericObject, account: GenericObject, profile: GenericObject) {
      if (user) {
        token = {
          id: user.id,
          ...user
        }
        token.github_profile = {
          id: profile.id,
          name: user.name,
          image: user.image,
          username: profile.login,
          followers: profile.followers,
          following: profile.following,
        }
      }

      return Promise.resolve(token);
    },
  },
};

export default (req: NowRequest, res: NowResponse) =>
  NextAuth(req, res, options);