import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { query as q } from 'faunadb';

import { faunadbClient, CollectionIndexes } from '@/services/faunadb';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string;
const SECRET = process.env.SECRET;

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user'
        }
      },
    })
  ],
  // secret: SECRET,
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    jwt: async ({ token }) => {
      return token;
    },
    signIn: async ({ user, account }) => {
      const { provider, providerAccountId } = account as { provider: string; providerAccountId: string; };
      const { email } = user;

      try {
        await faunadbClient.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index(CollectionIndexes.USER_BY_PROVIDER_ACCOUNT_ID),
                  providerAccountId
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              {
                data: {
                  provider_account_id: providerAccountId,
                  provider_name: provider,
                  email,
                }
              }
            ),
            q.Get(
              q.Match(
                q.Index(CollectionIndexes.USER_BY_PROVIDER_ACCOUNT_ID),
                providerAccountId
              )
            )
          ),
        )
      } catch (error: any) {
        console.error(error);
        throw new Error('Failed to Sign In');
      }

      return true;
    }
  },
});