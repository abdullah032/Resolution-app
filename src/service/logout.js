import db from "../model/db.js";
import httpResponse from "../utils/httpErrors.js";
import sessionToken from "../utils/sessionToken.js";
export default async function logout(req) {
  try {
    const { token } = await sessionToken();
    await db.updateById("sessionExpiry", { uId: req._id }, { isExpire: true });
    return httpResponse.ok(
      { msg: "Logged out successfully!" },
      { "Set-Cookie": "sessionID=; HttpOnly; Max-Age=0; Path=/" },
    );
  } catch (error) {
    console.log(error);
  }
}
