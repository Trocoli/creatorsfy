import NextAuth, { NextAuthConfig } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const res = await fetch("http://localhost:8443/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        let errorMessage =
          "Login falhou, verifique suas credenciais e tente novamente"; // Default message

        if (!res.ok) {
          try {
            const errorData = await res.json();
            console.error("Login error response from NestJS =>", errorData);

            if (errorData?.message) {
              errorMessage = errorData.message;
            }
          } catch (error) {
            console.error("Error reading JSON body:", error);
          }

          throw new Error(errorMessage);
        }

        const data = await res.json();

        // Se não receber o token ou não receber userInfo retorar erro
        if (!data.token || !data.userInfo) {
          return null;
        }

        return {
          token: data.token,
          ...data.userInfo,
        };
      },
    }),
  ],

  debug: true,

  callbacks: {
    // coloca userInfo e token em JWT
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.userInfo = { ...user };
      }
      return token;
    },

    // disponibliza usuario em `useSession()`
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = token.userInfo as AdapterUser;
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
