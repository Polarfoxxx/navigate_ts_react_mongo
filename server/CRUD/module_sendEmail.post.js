var nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const newUserEmail = require("./utils/newUserEmail")


router.post('/email', async (req, res) => {
  sendEmail(username, password, type);
});

// Funkcia pre odoslanie emailu
function sendEmail(username, password, type) {
  // Tu môžete pristupovať k req a res, aj keď v súčasnosti nie sú využívané
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'mfoxx.services@gmail.com',
      pass: 'ikan vkgs uzcp hnph'
    }
  });

  let mailOptions = {
    from: 'mfoxx.services@gmail.com',
    to: username,
    subject: 'new registration',
    text: type === "newRegister" ? newUserEmail(username, password) : ""
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
};



module.exports = router;
module.exports = sendEmail;
