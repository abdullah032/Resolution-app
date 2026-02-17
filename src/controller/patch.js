import urlParts from "../utils/urlParts.js";
import sendResponse from "../utils/sendResponse.js";
import httpErrors from "../utils/httpErrors.js";
import updateGoal from "../service/updateGoal.js";
import updateUser from "../service/updateUser.js";
import completeTask from "../service/completeTask.js";
export default async function handlePatchReq(req, res) {
  const { parameter: id, resource } = urlParts(req.url);

  try {
    //If url contains /user
    if (resource === "users") {
      const data = await updateUser(id, req.data);
      sendResponse(res, httpErrors.ok(data));
    }

    //If URL contains /goals and /complete
    else if (resource === "goals" && id === "complete") {
      const data = await completeTask(req.data);
      sendResponse(res, httpErrors.ok(data));
    }
    //If URL contains /goals
    else if (resource === "goals") {
      const data = await updateGoal(id, req.data);

      sendResponse(res, httpErrors.ok(data));
    }
  } catch (error) {
    console.log(error);
    sendResponse(res, error);
  }
}
