function requestSource(req, res, next) {
    if (process.env.ALLOWED_ORIGINS.includes(req.get("origin"))) {
      next();
    } else {
      res.status(401).send("Not authorized.");
    }
  }

  module.exports = requestSource;
