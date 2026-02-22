import urlParts from "../utils/urlParts.js";
import db from "../model/db.js";
import sendResponse from "../utils/sendResponse.js";
import httpResponse from "../utils/httpErrors.js";
import logout from "../service/logout.js";
import { createJWToken } from "../utils/Jwt.js";
export default async function handleGetReq(req, res) {
  const { parameter, resource } = urlParts(req.url);
  const user = {
    name: req.user.name,
    _id: req.user._id,
    email: req.user.email,
  };
  const token = createJWToken(user);

  try {
    const url = req.url;
    // If url equal to "/"
    if (url === "/") {
      sendResponse(res, httpResponse.ok({ user, token }));
    }

    // Check is URL contains /goals and parameter
    if (resource === "goals" && parameter) {
      const goal = await db.findById("goals", parameter);
      if (!goal) throw httpResponse.notFound({ msg: "Not found!" });
      sendResponse(res, httpResponse.ok({ goal, token }));
    }

    // Check is URL contains /goals
    if (resource === "goals") {
      const { _id: id } = req.user;
      const goals = await db.find("goals", { uId: id });
      sendResponse(res, httpResponse.ok({ goals, token }));
    }

    // If url contains logout
    if (resource === "logout") {
      const logoutRes = await logout(req);
      sendResponse(res, logoutRes);
    }
  } catch (error) {
    error.response.token = token;
    sendResponse(res, error);
  }
}
