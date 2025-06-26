const { verifyToken } = require("../util/jwt");

const authenticate = async (req, res, next) => {
  try {
    console.log('checking toutes 5', req.headers)
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log("token:::", token);
    if (!token) {
      return res.status(500).send({
        message: "Invalid Token",
      });
    }
    const decoded = verifyToken(token);
    console.log("decoded", decoded);
    req.userId = decoded.id
    req.role = decoded.role
    next();
  } catch (error) {
    console.log('error',error)
    return res.status(500).send({
      message: "Something went wrong",
    });
  }
};

module.exports = authenticate;
