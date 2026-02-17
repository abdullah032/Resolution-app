import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  uId: { type: String, required: [true, "User ID is missing"] },
  token: { type: String, required: [true, "Token is missing"] },
  isExpire: { type: Boolean, default: false },
  loginAt: { type: Date, default: Date.now },
  tokenExpiresAt: {
    type: Date,
    default: () => {
      // Expire after 10 days
      const now = new Date();
      return now.setDate(now.getDate() + 9);
    },
  },
});

sessionSchema.index({ tokenExpiresAt: 1 }, { expireAfterSeconds: 0 });
export default sessionSchema;
