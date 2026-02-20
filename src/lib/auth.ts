import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";

type LoginResponse = {
  token?: string;
  email?: string;
  name?: string;
};

type ApiError = {
  message?: string;
};

const apiBaseUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
const authSecret = process.env.NEXTAUTH_SECRET || "dev-only-secret-change-me";

export const authOptions: NextAuthOptions = {
  secret: authSecret,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid email or password");
        }

        try {
          const response = await axios.post<LoginResponse>(`${apiBaseUrl}/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          const token = response.data?.token;
          if (!token) {
            throw new Error("Invalid email or password");
          }

          return {
            id: credentials.email,
            email: response.data.email || credentials.email,
            name: response.data.name || credentials.email,
            accessToken: token,
          };
        } catch (error: unknown) {
          const axiosError = error as AxiosError<ApiError>;
          const message = axiosError.response?.data?.message || "Invalid email or password";
          throw new Error(message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/en/login",
  },
};
