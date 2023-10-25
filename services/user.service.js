const User = require("../models/user");

exports.signupService = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};

/*
 *Check if email and password are given
 *Load user with email
 *if not user send res
 *Compare password
 *if password not correct send res
 *Check user is active
 *if not active send res
 *Generate token
 *Send user and Token
 */
exports.findUserByEmail = async (email) => {
  const user = User.findOne({ email });
  return user;
};
exports.findUserByToken = async (token) => {
  const user = User.findOne({ confirmationToken: token });
  return user;
};
