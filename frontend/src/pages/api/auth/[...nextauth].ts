import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials:any) => {
        const user = { id: 1, name: 'Admin' }; // Replace with your own authentication logic

        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin'
  }
});
