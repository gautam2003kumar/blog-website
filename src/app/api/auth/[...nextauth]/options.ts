import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"



export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "Credentials",
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "text", placeholder: "Enter your email" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials: any): Promise<any> {
                await dbConnect();

                try {
                    const user = await UserModel.findOne({
                        $or:[
                            {email: credentials.identifier.email},
                            {username: credentials.identifier.username}
                        ]
                    })

                    if(!user){
                        throw new Error("User not found with provided details")
                    }
                    
                    if(!user.isVerified){
                        throw new Error("Please verify your account before login");
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                    if(isPasswordCorrect){
                        return user;
                    }else{
                        throw new Error("Wrong password, Enter the correct password");
                    }
                } catch (err: any) {
                    throw new Error(err)
                }
            }
        })
    ],
    callbacks:{
        async session({ session,token }) {
            if(token){
                session.user._id = token._id
                session.user.isVerified = token.isVerified;
                session.user.isAdmin = token.isAdmin;
                session.user.username = token.username;
            }

          return session
        },
        async jwt({ token, user}) {
            if(user){
                token._id = user._id?.toString()
                token.isVerified = user.isVerified;
                token.isAdmin = user.isAdmin;
                token.username = user.username;
            }
           return token
        }
    },
    pages:{
        signIn: '/sign-in'
    },
    session:{
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET

}