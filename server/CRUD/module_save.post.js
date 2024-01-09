const express = require('express');
const router = express.Router();
const User = require("../mongooseDB/mongooseDB");
const authenticateToken = require("../authenticateToken/authenticateToken");


router.post('/data', authenticateToken, async (req, res) => {
  const {
    username,
    startCoord,
    endCoord,
    routeName,
    allCoord,
    timeCreate,
    officialName,
    timeRoute,
    distanceRoute
  } = req.body;

  try {
    /* hladanie uzivatela*/
    const user = await User.findOne({ username });
    // Pridanie správy do poľa správ používateľa 
    user.data.push({
      routeName: routeName,
      startCoord: startCoord,
      endCoord: endCoord,
      allCoord: allCoord,
      timeCreate: timeCreate,
      officialName: officialName,
      timeRoute: timeRoute,
      distanceRoute: distanceRoute
    });
    // Uloženie aktualizovaného používateľa do databázy
    await user.save();
    res.status(201).json({ message: "Route saved" });
  } catch
  (error) {
    res.status(500).send('Internal Server Error');
  };
});

module.exports = router;
