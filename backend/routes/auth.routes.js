const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");

const router = Router();

router.post(
  "/register",
  [
    check("firstName", "Mindestlänge ist 1 Zeichen").isLength({ min: 1 }),
    check("lastName", "Mindestlänge ist 1 Zeichen").isLength({ min: 1 }),
    check("email", "E-Mail erforderlich").isEmail(),
    check("password", "Mindestlänge ist 6 Zeichen").isLength({ min: 6 }),
    check("repeatedPassword", "Mindestlänge ist 6 Zeichen").isLength({
      min: 6,
    }),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Registrierung ist fehlgeschlagen",
        });
      }

      const {
        firstName,
        lastName,
        email,
        password,
        repeatedPassword,
      } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "User bereits registriert" });
      }

      if (password !== repeatedPassword) {
        return res
          .status(400)
          .json({ message: "Die Passwörter stimmen nicht überein" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });
      const token = jwt.sign({ userId: user.id }, config.get("jwtSecter"), {
        expiresIn: "1h",
      });

      await user.save();

      res.status(201).json({ message: "User wurde registriert", token });
    } catch (e) {
      res.status(500).json({ message: "Die Daten sind nicht korrekt" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "E-Mail ist nicht korrekt").normalizeEmail().isEmail(),
    check("password", "Passwort ist nicht korrekt").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Falsche E-Mail oder Passwort",
        });
      }
      const { email, password } = req.body;
      console.log(req.body);
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ message: "Falsche E-Mail oder Passwort" });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Falsche E-Mail oder Passwort" });
      }
      const token = jwt.sign({ userId: user.id }, config.get("jwtSecter"), {
        expiresIn: "1000d",
      });

      res.json({
        token,
      });
    } catch (e) {
      res.status(500).json({ message: "error" });
    }
  }
);

router.get("/user/loading", auth, async (req, res) => {
  try {
    const user = await User.find({ _id: req.user.userId });

    console.log(user);

    res.json({ firstName: user[0].firstName, lastName: user[0].lastName });
  } catch (e) {
    res.status(500).json({ message: "Ein Feler ist aufgetreten" });
  }
});

module.exports = router;
