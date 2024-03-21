const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if(token){
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if(err){
        res.status(401).json({ error: 'Unauthorized' });
      }
      else{
        next();
      }
    }); 
  }
  else{
    res.status(401).json({ error: 'Unauthorized' });
  }
}
module.exports = { requireAuth };