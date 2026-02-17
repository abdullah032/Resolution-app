import db from "../model/db.js";
import mongErrors from "../model/mongErrors.js";

export default async function completeTask(data) {
  try {
    // This creates a new date object representing right now (the exact second the code runs).
    //Example: February 11, 2026, at 3:45 PM.
    const startOfToday = new Date();

    //This "resets" the clock on that date object to the very first millisecond of the day in UTC time. It changes the hours, minutes, seconds, and milliseconds to zero.
    // Result: February 11, 2026, at 00:00:00.000.
    startOfToday.setUTCHours(0, 0, 0, 0);

    const { dailyTarget, id } = data;
    const query = {
      _id: id,
      $or: [
        { lastProgressUpdate: { $lt: startOfToday } },
        { lastProgressUpdate: { $exists: false } },
      ],
    };

    const updateData = {
      $inc: { progress: dailyTarget },
      $set: { lastProgressUpdate: new Date() },
    };
    const result = await db.findOneAndUpdate("goals", query, updateData);
    console.log(result);
    if (result === null) {
      throw {
        name: "Already updated",
      };
    }
    return { msg: "Congratulation, You achieved one more mile stone!" };
  } catch (error) {
    if (error.name === "ValidationError")
      throw mongErrors.validationError(error);

    if (error.name === "castError") throw mongErrors.castError(error);

    if (error.name === "Already updated") throw mongErrors.modifiedCount();
    throw error;
  }
}

/*
    In your MongoDB query, you compare lastProgressUpdate to this startOfToday value.

    If the user updated yesterday: Their lastProgressUpdate might be Feb 10th. 
    Since Feb 10th is less than ($lt) Feb 11th at 00:00:00, the update is allowed.

    If the user already updated today: Their lastProgressUpdate might be 
    Feb 11th at 9:00 AM. Since 9:00 AM is not less than 00:00:00, the query fails, 
    and they can't update again.
*/
