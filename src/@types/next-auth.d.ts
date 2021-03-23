import * as client from 'next-auth/client';

declare module "next-auth/client" {
  interface User {
    id?: string | null;
    isNewUser?: boolean | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    github_profile: {
      id: number | null;
      image: string | null;
      name: string | null;
      username: string | null;
    }
  }

  interface ISessionBase {
    user: User;
    accessToken?: string;
    expires: string;
    test: string;
  }

  interface GenericObject {
    [key: string]: any;
  }

  export type ISession = ISessionBase & GenericObject;

  declare function session(
    context?: NextContext & {
      triggerEvent?: boolean;
    }
  ): Promise<ISession | null>;
  declare const getSession: typeof session;
}
