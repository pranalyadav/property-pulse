import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks: {
    //invoked on successfull signin
    async signIn({ profile }) {
      // 1. connect to databse
      // 2. check if user exists
      // 3. if not, then add user to database
      // 4. return true to allow signin
    },
    // modifies session object
    async session({ session }) {
      // 1. get user from databse
      // 2. assign the user id to session
      // 3. return session
    }
  }
}