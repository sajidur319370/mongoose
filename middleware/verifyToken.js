const jwt = require("jsonwebtoken");
const { promisify } = require("util");

/*
 *Check if token exist
 *if not token send res
 *Decode the token
 *if valid next()
 */
module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];
    if (!token) {
      return res.status(401).json({
        status: "Failed",
        message: "You are not logged in",
      });
    }
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      status: "Failed",
      message: "Token invalid!!",
    });
  }
};
