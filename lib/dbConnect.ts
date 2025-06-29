import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your .env.local");
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: { conn: any, promise: Promise<any> | null } | undefined;
}

let cached = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;