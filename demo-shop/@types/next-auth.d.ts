import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            //TODO: can add role also???
        } & DefaultSession["user"]
    } 
}