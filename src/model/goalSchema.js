import mongoose from "mongoose";

const goalsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  goal: { type: Number, required: true },
  dailyTarget: { type: Number, required: true },
  progress: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "In-progress" },
  type: { type: String },
  category: { type: String },
  uId: { type: String },
  activityLog: { type: Array },
  remindMe: { type: Boolean, default: false },
  lastProgressUpdate: { type: Date },
});

export default goalsSchema;
