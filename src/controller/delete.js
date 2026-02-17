import urlParts from "../utils/urlParts.js";
import httpErrors from "../utils/httpErrors.js";
import sendResponse from "../utils/sendResponse.js";
import deleteGoal from "../service/deleateGoal.js";
export default async function handleDeleteReq(req, res) {
  const { resource, parameter: id } = urlParts(req.url);

  try {
    // check is url contains /user
    if (resource === "users") {
    }
    // Check is URL contains /goals
    else if (resource === "goals") {
      const data = await deleteGoal(id);
      sendResponse(res, httpErrors.ok(data));
    }
  } catch (error) {
    sendResponse(res, error);
  }
}
