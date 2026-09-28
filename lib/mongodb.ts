// lib/dbConnect.ts
import mongoose from 'mongoose';


let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

const MONGODB_URI = "mongodb+srv://mhdieskndari_db_user:f0ksF68nuW7I1Ape@cluster1.lcozciy.mongodb.net/cybersecurity?retryWrites=true&w=majority"

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("🔄 Connecting to MongoDB...");
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
