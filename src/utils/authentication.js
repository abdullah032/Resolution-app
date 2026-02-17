import db from "../model/db.js";
import httpErrors from "./httpErrors.js";
export default async function authentication(req) {
  try {
    //Check does cookie exits in headers
    const headers = req.headers.cookie;

    if (headers === undefined) {
      throw httpErrors.unauthorized({ error: "Unauthorized" });
    }

    //if request.header.cookies contains a sessionID (token)
    const cookie = headers.split(";").map((x) => x.trim());
    const sessionID = cookie.find((x) => x.startsWith("sessionID="));

    //If the token does not exist:
    if (!sessionID) {
      //Send response 401 (Unauthorized)
      throw httpErrors.unauthorized({ error: "Unauthorized" });
    }

    //If the token exists:
    const token = sessionID.substring(10);

    const sessionEx = await db.find(
      "sessionExpiry",
      { token: token },
      { tokenExpiresAt: 1, token: 1, isExpire: 1, uId: 1 },
    );

    //If token is invalid:
    if (sessionEx.length === 0) {
      //Send response 401 (Unauthorized)
      throw httpErrors.unauthorized({ error: "Unauthorized" });
    }

    if (sessionEx[0].isExpire) {
      throw httpErrors.unauthorized({ error: "Unauthorized" });
    }
    if (sessionEx[0].token !== token) {
      //If Token does not matches
      throw httpErrors.unauthorized({ error: "Unauthorized" });
    }

    //If current date matches expiry date
    if (new Date() >= new Date(sessionEx[0].tokenExpiresAt)) {
      await db.findOneAndUpdate("sessionExpiry", { token }, { isExpire: true });
      throw httpErrors.unauthorized({ error: "Session expired!" });
    }

    //If token is valid: Allow request to continue
    const authUser = await db.find("users", { _id: sessionEx[0].uId });
    return authUser[0];
  } catch (error) {
    // console.log(error);
    throw error;
  }
}
