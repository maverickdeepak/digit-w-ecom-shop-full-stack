import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = mongoose.connect(process.env.MONGODB_URL);
    console.log(`🚀 MONGO DB is connect successfully.`);
  } catch (error) {
    console.log(`💥 ERROR while connecting DB ${error}`);
    process.exit(1);
  }
};

export default connectDB;
