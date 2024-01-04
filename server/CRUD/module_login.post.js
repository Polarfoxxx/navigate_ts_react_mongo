const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../mongooseDB/mongooseDB")


router.post('/user', async (req, res) => {
    const { username, password } = req.body;
    try {
      /* hladanie uzivatela*/
      const user = await User.findOne({ username });
      if (user && await bcrypt.compare(password, user.password)) {
        // Generovanie JWT s časovou expiráciou
        const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });
        res.json({ token, username });
      } else {
        res.status(401).send( "Unauthorized" );
      };
    } catch
    (error) {
      res.status(500).send('Internal Server Error');
    };
  });

module.exports = router;



