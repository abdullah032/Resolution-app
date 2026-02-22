import db from "../model/db.js";
import httpErrors from "./httpErrors.js";
import { verifyToken } from "./Jwt.js";
export default async function authentication(req) {
  let token = "";
  if (req.headers.cookie) {
    const cookie = req.headers.cookie.split(";").map((x) => x.trim());
    const refreshToken = cookie.find((x) => x.startsWith("refreshToken="));
    token = refreshToken.substring(13);
  } else if (req.headers.authorization) {
    token = authHeader.split(" ")[1];
  } else {
    throw httpErrors.unauthorized({ error: "Unauthorized" });
  }
  try {
    const { _id } = verifyToken(token);

    const user = await db.findById("users", _id);
    return user;
  } catch (error) {
    throw error;
  }
}
