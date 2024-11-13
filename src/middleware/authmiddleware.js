
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  // console.log('Authorization Header:', req.headers['authorization']);

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing or invalid' });
  }

  console.log(token.split(" ")[1]);
  let authtoken=token.split(" ")[1]

  try {
    const decoded = jwt.verify(authtoken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message); // Debug log
    res.status(403).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = verifyToken;
