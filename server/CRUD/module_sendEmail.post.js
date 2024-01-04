var nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const authenticateToken = require("../authenticateToken/authenticateToken")


router.post('/email', authenticateToken, async (req, res) => {

    let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports; in this case, 587
    auth: {
      user: 'mfoxx.services@gmail.com',
      pass: 'ikan vkgs uzcp hnph'
    }
  });
  
  let mailOptions = {
    from: 'mfoxx.services@gmail.com',
    to: 'suchovsky.michal@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'Hi..!'
  };
  
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  });

module.exports = router;

  
  