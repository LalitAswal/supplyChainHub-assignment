const authorizeRoles =  (...allowedRoles) => {
  return (req, res, next) => {
    console.log('role',req.role)
    console.log('allowedRoles',allowedRoles)
    if (!req.userId || !allowedRoles.includes(req.role)) {
      return res.status(403).json({ message: "Access Denied: Unauthorized role" });
    }
    next();
  };
};

module.exports = authorizeRoles;
