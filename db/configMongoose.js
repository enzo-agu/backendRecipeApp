import mongoose from 'mongoose';

const dbConnection = async () => {
  try {

    await mongoose.connect('mongodb+srv://userNode:bgYn4ra35M9wJo5P@cluster0.v0gbygu.mongodb.net/recipeDB', {

    })

    console.log('BD online')

  } catch (error) {
    console.log("🔴🔴", error);
    throw new Error("error en DB ");
  }
};

export { dbConnection };
