import CredentialsProvider from "next-auth/providers/credentials";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../utils/fireStore";

const CryptoJS = require('crypto-js');

export const authOptions = {
  secret: "SECRET",
  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
    error: "/auth/error", 
    verifyRequest: "/auth/verify-request",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials, req) {
        const hashedPassword = CryptoJS.SHA256(credentials.password).toString(CryptoJS.enc.Hex);
        const userSnapShot = await getDocs(query(collection(db, "users"), 
        where('email', "==", credentials.email), where('password', '==', hashedPassword)));
        if (userSnapShot.docs.length > 0) {
          const data = userSnapShot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          const user = data[0];
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
};
export default authOptions;
