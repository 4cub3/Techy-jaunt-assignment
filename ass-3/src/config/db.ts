import mongoose from "mongoose";
import { CONFIGS } from "./config";
const connectDb = async () => {
  try {
    await mongoose.connect(CONFIGS.mongoUri);
  } catch (error) {
    throw error;
  }
};

export default connectDb