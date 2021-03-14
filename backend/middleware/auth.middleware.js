const jwt = require("jsonwebtoken");
config = require("config");
module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; //Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: "Anmeldung nicht möglich" });
    }
    const decoded = jwt.verify(token, config.get("jwtSecter"));

    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "Anmeldung fehlgeschlagen" });
  }
};
