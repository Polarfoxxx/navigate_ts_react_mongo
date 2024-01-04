
const jwt = require('jsonwebtoken');

// Middleware na overenie JWT pri každom ulozani dat
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json('Access denied');
  jwt.verify(token, 'secret', (err, user) => {
    if (err) return res.status(403).json('Invalid token');
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;