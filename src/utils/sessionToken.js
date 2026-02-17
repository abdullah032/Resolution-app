import crypto from "crypto";
export default async function sessionToken() {
  try {
    const token = crypto.randomBytes(20).toString("hex");
    const cookieString = `sessionID=${token}; httpOnly; Max-Age=864000; path=/`;
    return { token, cookieString };
  } catch (error) {
    console.log(error);
  }
}
