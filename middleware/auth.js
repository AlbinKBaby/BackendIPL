// middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token)
    return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = verifyToken;
