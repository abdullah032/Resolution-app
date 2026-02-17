import mongoose from "mongoose";
import userSchema from "./userSchema.js";

const Users = mongoose.model("users", userSchema);

export default Users;
