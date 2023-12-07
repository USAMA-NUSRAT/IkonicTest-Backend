const checkPermission = (moduleName, permission) => {
  return (req, res, next) => {
    if (
      req.userData.permissions_.some(
        (ele) => ele.title == permission && ele.module == moduleName
      )
    ) {
      next();
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
  };
};

module.exports = checkPermission;
