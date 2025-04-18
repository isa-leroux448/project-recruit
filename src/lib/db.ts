import mongoose from 'mongoose';
import { MONGODB_URI } from "./set-env";


if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(String(MONGODB_URI));
    isConnected = true;
    console.log("Successfully connected to MongoDB using Mongoose");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

export default connectDB;
