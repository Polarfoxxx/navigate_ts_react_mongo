var nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const newUserEmail = require("./utils/newUserEmail");
const sendMyRoute = require("./utils/sendMyRoute");
const authenticateToken = require("../authenticateToken/authenticateToken");

router.post("/email", authenticateToken, async (req, res) => {
  const { emailName, routeInfo } = req.body;
  const username = emailName;
  const type = "sendRoute";
  const password = "";

  try {
    sendEmail(username, password, type, routeInfo);
    res.status(200).json({ message: "email send" });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Funkcia pre odoslanie emailu
function sendEmail(username, password, type, routeInfo) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "mfoxx.services@gmail.com",
      pass: "ikan vkgs uzcp hnph",
    },
  });

  let mailOptions = {
    from: "mfoxx.services@gmail.com",
    to: username,
    subject: type === "newRegister" ? "new registration" : "your route",
    html:
      type === "newRegister"
        ? newUserEmail(username, password)
        : sendMyRoute(username, routeInfo),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
}

module.exports = router;
module.exports.sendEmail = sendEmail;
