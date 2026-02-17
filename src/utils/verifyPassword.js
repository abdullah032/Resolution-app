import crypto from "crypto";

export default function verifyPassword(password, hash, salt) {
  try {
    const hashedPassword = crypto
      .scryptSync(password, salt, 64)
      .toString("hex");

    return hashedPassword === hash;
  } catch (error) {
    console.log(error);
  }
}
