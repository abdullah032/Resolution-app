import urlParts from "../utils/urlParts.js";
import db from "../model/db.js";
import sendResponse from "../utils/sendResponse.js";
import httpResponse from "../utils/httpErrors.js";
import logout from "../service/logout.js";

export default async function handleGetReq(req, res) {
  const { parameter, resource } = urlParts(req.url);

  try {
    const url = req.url;
    // If url equal to "/"
    if (url === "/") {
      if (req.user) {
        const { name, _id, email } = req.user;
        sendResponse(res, httpResponse.ok({ name, id: _id, email }));
      } else {
        sendResponse(res, httpResponse.unauthorized({ error: "Unauthorized" }));
      }
    }

    // Check is URL contains /goals and parameter
    if (resource === "goals" && parameter) {
      const goal = await db.findById("goals", parameter);
      if (!goal) throw httpResponse.notFound({ msg: "Not found!" });
      sendResponse(res, httpResponse.ok(goal));
    }

    // Check is URL contains /goals
    if (resource === "goals") {
      const { _id: id } = req.user;
      const goals = await db.find("goals", { uId: id });
      sendResponse(res, httpResponse.ok(goals));
    }

    // If url contains logout
    if (resource === "logout") {
      const logoutRes = await logout(req);
      sendResponse(res, logoutRes);
    }
  } catch (error) {
    console.log(error);
    sendResponse(res, error);
  }
}
