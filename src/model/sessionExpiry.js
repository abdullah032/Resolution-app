import mongoose from "mongoose";
import sessionSchema from "./sessionSchema.js";

const sessionExpiry = mongoose.model("sessions", sessionSchema);

export default sessionExpiry;
