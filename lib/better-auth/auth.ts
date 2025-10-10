import { betterAuth } from "better-auth";
import {mongodbAdapter} from "better-auth/adapters/mongodb";
import {connectToDatabase} from "@/database/mongoose";
import {nextCookies} from "better-auth/next-js";

// This is called singleton instance and it ensures that we create one instance which prevents multiple connections and improve performance.
let authInstance: ReturnType<typeof betterAuth> | null=null;


export const getAuth = async () => {
    // if auth instance already exists,return it.
    if(authInstance) return authInstance;
//     If it doesn't exist,establish a connection to mongoDB database.
    const mongoose= await connectToDatabase();
    const db= mongoose.connection.db

    if(!db) throw new Error("MongoDB connection is not found");
    authInstance = betterAuth({
        database:mongodbAdapter(db as any),

        secret:process.env.BETTER_AUTH_SECRET,
        baseURL:process.env.BETTER_AUTH_URL,
        emailAndPassword:{
            enabled:true,
            disableSignUp:false,
            requireEmailVerification:false,
            minPasswordLength:8,
            maxPasswordLength:128,
            autoSignIn:true,
        },
        plugins:[nextCookies()]
    //     Plugins
    })
    return authInstance;


}

export const auth=await getAuth();