const jwt = require('jsonwebtoken');

const getCurrentUserId = (req) => {
  return new Promise((resolve, reject) => {
    const token = req.cookies.jwt;
    if (!token) {
      reject(new Error('unauthorized'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        reject(new Error('unauthorized'));
      } else {
        resolve(decodedToken.id);
      }
    });
  });
};

module.exports = {
  getCurrentUserId,
};