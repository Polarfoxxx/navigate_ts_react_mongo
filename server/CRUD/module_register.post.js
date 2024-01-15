const express = require('express');
const router = express.Router();
const User = require("../mongooseDB/mongooseDB");
const bcrypt = require('bcrypt');
const Joi = require("joi");
const { sendEmail } = require("./module_sendEmail.post")

router.post('/newUser', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Skontrolujte, či používateľ už neexistuje
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User existing' });
    } else {
      // Hashovanie hesla
      const hashedPassword = await bcrypt.hash(password, 10);
      // Validácia dát pomocou Joi
      const validateUser = Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(4).required(),
      });

      const validation = validateUser.validate({ username, password });
      if (validation.error) {
        res.status(400).json({ message: "Registration error" });
      } else {
        // Vytvorte nového používateľa
        const newUser = {
          username,
          password: hashedPassword,
          data: [],
        };
        User.create(newUser)
          .then(() => {
            res.status(201).json({ message: "Registration sucesfull" });
            /* send registration email */
            const routeInfo = null
            sendEmail(username, password, "newRegister", routeInfo);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Registration error" });
          });
      };
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration error" });
  };
});

module.exports = router;