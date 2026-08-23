const jwt = require("jsonwebtoken");

const authenticateMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ status: "fail", message: "Unauthorized: Missing token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ status: "fail", message: "Invalid or expired token" });
  }
};

module.exports = authenticateMiddleware;