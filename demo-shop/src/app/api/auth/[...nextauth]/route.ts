import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth/next";

// https://stackoverflow.com/questions/76388994/next-js-13-4-and-nextauth-type-error-authoptions-is-not-assignable-to-type-n
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
