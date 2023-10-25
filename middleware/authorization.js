module.exports = (...role) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!role.includes(userRole)) {
      res.status(403).json({
        staus: "Failed",
        error: "You are not authorized to access this",
      });
    }
    next();
  };
};
