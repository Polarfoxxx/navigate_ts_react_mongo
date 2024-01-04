const express = require('express');
const router = express.Router();
const User = require("../mongooseDB/mongooseDB");
const authenticateToken = require("../authenticateToken/authenticateToken")

router.get('/data',authenticateToken ,async (req, res) => {
    const { username } = req.query;
    try {
      const user = await User.findOne({ username });
      if (user) {
        res.status(200).json({
          data: user.data,
          message: "load"
        });
      } else {
        res.status(500).send('Internal Server Error');
      }
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;
