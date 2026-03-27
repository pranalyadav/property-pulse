import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import connectDB from "@/config/database";


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
      await connectDB()
      // 2. check if user exists
      const userExists = await User.findOne({ email: profile.email })
      // 3. if not, then add user to database
      if (!userExists) {
        // truncate user name if too long
        const username = profile.name.slice(0, 20)
        await User.create({
          email: profile.email,
          username,
          image: profile.picture
        })
      }
      // 4. return true to allow signin
      return true;
    },
    // modifies session object
    async session({ session }) {
      // 1. get user from databse
      const user = await User.findOne({ email: session.user.email })
      // 2. assign the user id to session
      session.user.id = user._id.toString();
      // 3. return session
      return session;
    }
  }
}