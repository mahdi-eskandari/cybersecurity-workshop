// lib/dbConnect.ts
import mongoose from 'mongoose';


let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

const MONGODB_URI = process.env.MONGODB_URI

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("🔄 Connecting to MongoDB...");
    console.log("URI starts with:", JSON.stringify(MONGODB_URI?.slice(0, 16)));
    cached.promise = mongoose.connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log("✅ MongoDB Connected Successfully");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
