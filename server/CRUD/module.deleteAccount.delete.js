
const express = require('express');
const router = express.Router();
const User = require("../mongooseDB/mongooseDB");
const authenticateToken = require("../authenticateToken/authenticateToken");

router.delete('/user', authenticateToken, async (req, res) => {
  const { emailName } = req.query;

  try {
    /*  Nájdenie používateľa */
    const user = await User.findOne({ username: emailName });

    if (!user) {
      return res.status(404).json({ message: 'Hoops, log to server error' });
    };

    /* Odstránenie používateľa */
    await User.deleteOne({ username: emailName });
    res.status(200).json({ message: 'The account is deleted. to five second you will automatic logout' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  };
});

module.exports = router;