const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../mongooseDB/mongooseDB")


router.post("/user", async (req, res) => {
  const { username, password } = req.body;

  try {
    /* hladanie uzivatela*/
    const user = await User.findOne({ username });
    /* kontrola existencie uzivatela*/
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        // Generovanie JWT s časovou expiráciou
        const token = jwt.sign({ username }, "secret", { expiresIn: "2h" });
        res.status(200).json({ token, username });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      };
    } else {
      res.status(401).json({ message: "The user does not exist" });
    };
  } catch
  (error) {
    res.status(500).json({ message: "Internal Server Error" });
  };
});

module.exports = router;



