import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log("Data base is not connect, for some reasons!");
    console.log(error);
  }
}
