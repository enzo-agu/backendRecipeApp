import mongoose from 'mongoose';

const dbConnection = async () => {
  try {

    await mongoose.connect(process.env.MONGODBCNN, {

    })

    console.log('BD online')

  } catch (error) {
    console.log("🔴🔴", error);
    throw new Error("error en DB ");
  }
};

export { dbConnection };
