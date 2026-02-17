import httpResponse from "../utils/httpErrors.js";

function formattedErrors(error) {
  const errorEntries = Object.values(error.errors);

  return errorEntries.map((err) => {
    return {
      field: err.properties.path, // e.g., 'schema field'
      message: err.properties.message, // e.g., 'Path `dailyTarget` is required.'
      errorType: err.properties.type, // e.g., 'required'
    };
  })[0];
}
const mongErrors = (() => {
  const validationError = (error) => {
    const { field, message, errorType } = formattedErrors(error);
    return httpResponse.unprocessableEntity({
      error: `${field} is ${errorType}`,
    });
  };

  const castError = (error) => {
    return httpResponse.unprocessableEntity({
      error: `${error.path} should be a ${error.kind}`,
    });
  };

  const noFound = (collName) => {
    return httpResponse.notFound({ error: `No ${collName} found!` });
  };

  const modifiedCount = () => {
    return httpResponse.forbidden({ error: "Already updated" });
  };
  return { validationError, castError, noFound, modifiedCount };
})();

export default mongErrors;
