import mongoose from "mongoose";
import resolutionSchema from "./goalSchema.js";
const Goals = mongoose.model("goals", resolutionSchema);

export default Goals;
