import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDatabase() {
  const dbStr = process.env.DATABASE as string;
  const debugDb = (process.env.DEBUG_DB) ? process.env.DEBUG_DB : false
  console.log(`Connecting: ${dbStr}`);
  mongoose.set('strictQuery', true)
  mongoose.set('debug', debugDb === 'true');
  await mongoose.connect(dbStr);
}