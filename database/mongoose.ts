import mongoose, {mongo} from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI;

declare global {
    var mongooseCache:{
        conn: typeof mongoose | null;
        promise:Promise<typeof mongoose> | null;
    }
}

// we are using this global cache so that hot reload in development doesn't create a new connection whenever we make a new request. Rather it'll take the same old connection from cache.
// We are doing this because we'll be using server actions. And nextjs server actions retrigger or restart for every new action that we will make.
let cached=global.mongooseCache

if(! cached){
    cached=global.mongooseCache = {conn:null,promise:null};


}

export const connectToDatabase= async ()=>{
    if(!MONGODB_URI) throw new Error("MongoDB URI is missing");
    if(cached.conn) return cached.conn;
    if(!cached.promise) {
        cached.promise=mongoose.connect(MONGODB_URI,{bufferCommands:false});
    }

    try {
        cached.conn=await  cached.promise;
    }catch (err){
        cached.promise=null;
        throw err
    }
    console.log(`Connected to database ${process.env.NODE_ENV} - ${MONGODB_URI}`)
}