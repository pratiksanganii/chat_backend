import mongoose from "mongoose";

export async function connectDB() {
  try {
    const URI = process.env.MONGO_URI;
    if (typeof URI !== "string") return;
    const conn = await mongoose.connect(URI, { dbName: "LiveChat" });
    console.log(`Database connected to ${conn.connection.host}`);
    return conn;
  } catch (e) {
    console.log(`Database connection error...`);
    process.exit(1);
  }
}
