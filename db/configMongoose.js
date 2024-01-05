import mongoose from 'mongoose';
// import dotenv from "dotenv";
// dotenv.config({ path: "./.env" });

const dbConnection = async () => {
  try {

    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('BD online')

  } catch (error) {
    console.log("🔴🔴", error);
    throw new Error("error en DB ");
  }
};

export { dbConnection };
