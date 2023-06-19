const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader;
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json('Token is not valid!');
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json('You are not authenticated!');
  }
};

const verifyTokenAuth = (req, res, next) => {
  verify(req, res, () => {
    if (req.user.role === 'admin' || req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).json('You are not allowed!');
    }
  });
};

const verifyTokenAdmin = (req, res, next) => {
  verify(req, res, () => {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json('You are not allowed!');
    }
  });
};

module.exports = { verify, verifyTokenAuth, verifyTokenAdmin };
