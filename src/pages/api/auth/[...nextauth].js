// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        const user = await getUserByEmail(credentials.email);
        if (user && checkPassword(credentials.password, user.passwordHash)) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role, 
            roles: user.roles || [], 
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.roles = token.roles;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.roles = user.roles;
      }
      return token;
    },
  },
});
