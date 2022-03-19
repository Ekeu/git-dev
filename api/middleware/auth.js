const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userID = decoded.id;
      next();
    } catch (error) {
      next(error);
    }
  }

  if (!token) {
    res.status(401).send('Not authorized, no token!');
  }
};

module.exports = {
  protect,
};
