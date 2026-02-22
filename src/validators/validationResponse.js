import httpErrors from "../utils/httpErrors.js";

const validationResponse = (result) => {
  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      field: err.path[0],
      error: err.message,
    }));

    throw httpErrors.unprocessableEntity({
      error: "Validation failed",
      details: errors,
    });
  }
  return result.data;
};

export default validationResponse;
