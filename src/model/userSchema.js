import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, immutable: true },
  name: { type: String, required: true },
  hash: { type: String, required: true, select: false },
  salt: { type: String, required: true, select: false },
  role: { type: String },
  createdAt: { type: Date, default: Date.now, immutable: true },
});

export default userSchema;
