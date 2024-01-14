
const express = require('express');
const router = express.Router();
const User = require("../mongooseDB/mongooseDB");
const authenticateToken = require("../authenticateToken/authenticateToken");


router.delete('/data', authenticateToken, async (req, res) => {
    const { emailName, officialName } = req.query;

    try {
        // Nájdenie používateľa
        const user = await User.findOne({ username: emailName });

        if (!user) {
            return res.status(404).json({ message: 'Používateľ s daným emailName nebol nájdený.' });
        }

        // Nájdenie indexu objektu s daným officialName v poli data
        const indexToDelete = user.data.findIndex(obj => obj.officialName === officialName);

        if (indexToDelete === -1) {
            return res.status(404).json({ message: 'Objekt s daným officialName nebol nájdený v poli data.' });
        }

        // Odstránenie objektu z pola data
        user.data.splice(indexToDelete, 1);
        // Uloženie zmeneného používateľa
        await user.save();

        res.status(200).json({
            data: user.data,
            message: 'Objekt odstránený zo zoznamu.' 
        });
    } catch
    (error) {
        res.status(500).send('Internal Server Error');
    };
});

module.exports = router;
