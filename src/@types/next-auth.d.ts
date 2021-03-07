declare module "next-auth/client" {
  interface User {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
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

  type ISession = ISessionBase & GenericObject;

  declare function session(
    context?: NextContext & {
      triggerEvent?: boolean;
    }
  ): Promise<ISession | null>;
  declare const getSession: typeof session;
}