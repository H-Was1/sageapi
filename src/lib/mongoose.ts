require("dotenv").config();

import mongoose from "mongoose";
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI?: string;
    }
  }
}

let isConnected = false;
const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URI)
    return console.log("MongoDB URI is not defined");
  if (isConnected) return console.log("=> using existing database connection");
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};
export default connectToDB;
