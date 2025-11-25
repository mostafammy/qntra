import type { Account, Session, User } from "next-auth";
import type { NextAuthConfig } from "next-auth/lib/index.js";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { env } from "@/lib/env";

export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const response = await fetch(`${env.AUTH_BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          cache: "no-store",
        });

        const payload = await response.json().catch(() => null);

        if (!response.ok || !payload?.user) {
          const message = payload?.message ?? "Invalid credentials";
          throw new Error(message);
        }

        return payload.user;
      },
    }),
    Google({
      clientId: env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
    }),
    Discord({
      clientId: env.AUTH_DISCORD_CLIENT_ID,
      clientSecret: env.AUTH_DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // CRITICAL: Sync Social Login users to your Backend DB
    async signIn({ user, account }: { user: User; account: Account | null }) {
      if (account?.provider === "credentials") return true; // Already handled by authorize()

      try {
        const response = await fetch(
          `${env.AUTH_BACKEND_URL}/auth/social-sync`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              image: user.image,
              provider: account?.provider,
            }),
          }
        );

        return response.ok; // If false, NextAuth denies the login
      } catch (error) {
        console.error("Social Sync Error:", error);
        return false;
      }
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },
    async jwt({ token, account }: { token: JWT; account: Account | null }) {
      if (account?.provider) {
        token.provider = account.provider;
      }

      return token;
    },
  },
};
