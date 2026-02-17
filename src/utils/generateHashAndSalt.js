import crypto from "crypto";

export default async function generateHashAndSalt(password) {
  try {
    const salt = crypto.randomBytes(16).toString("hex");

    const hash = crypto.scryptSync(password, salt, 64).toString("hex");

    return { hash, salt };
  } catch (error) {
    console.log(error);
  }
}
