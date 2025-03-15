import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      userId?: string;
      username?: string;
      store?: string;
    } & DefaultSession["user"];
  }

  interface User {
    userId: string;
    username: string;
    store: string;
    token: string;
  }

  interface AdapterUser {
    userId: string;
    username: string;
    store: string;
    token: string;
  }
}
