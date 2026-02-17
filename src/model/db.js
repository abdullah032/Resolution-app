import users from "./users.js";
import goals from "./goals.js";
import connectDb from "./connectDB.js";
import sessionExpiry from "./sessionExpiry.js";
// Connect Database
connectDb();

const collection = { users, goals, sessionExpiry };

const db = (() => {
  // Find all items
  const find = (collName, data = {}, projection = null, options = {}) =>
    collection[collName].find(data, projection, options);

  //Find item by id in database
  const findById = (collName, id, projection = null, options = {}) =>
    collection[collName].findById(id, projection, options);

  //   Delete item by id in database
  const deleteById = async (collName, id, options = {}) =>
    collection[collName].deleteOne({ _id: id }, options);

  //   Update item by id in database
  const updateById = (collName, id, data, options = {}) =>
    collection[collName].findByIdAndUpdate(id, data, options);

  //   Add new item in database
  const create = (collName, data, options = {}) => {
    if (options.session) {
      return collection[collName].create([data], options);
    }
    return collection[collName].create(data);
  };

  // Find one and update
  const findOneAndUpdate = (
    collName,
    query,
    data = {},
    options = {},
    // Projection goes inside options, not as second argument
  ) => collection[collName].findOneAndUpdate(query, data, options);

  return { find, findById, deleteById, updateById, create, findOneAndUpdate };
})();

export default db;
