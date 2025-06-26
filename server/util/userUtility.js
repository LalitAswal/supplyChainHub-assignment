const User = require("../models/user.model");

const getUserById = async (userName) => {
  const user = await User.findOne({ userName });
  console.log("user==========>", user);
  if (!user) {
    return null;
  }
  return user;
};

const validateUserPassword = async (userName, password) => {
  const user = await getUserById(userName);
  return user?.comparePassword(password);
};

const generateAuthToken = async (userName) => {
  const user = await getUserById(userName);
  return user.generateAuthToken();
};

module.exports = {
  getUserById,
  validateUserPassword,
  generateAuthToken,
};
