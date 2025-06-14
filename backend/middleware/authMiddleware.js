const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "your-secret-key";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Akses ditolak. Token tidak ditemukan." });
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token tidak valid." });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
