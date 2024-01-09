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
  const password = null;

  try {
    const response = await sendEmail(username, password, type, routeInfo);
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Funkcia pre odoslanie emailu
async function sendEmail(username, password, type, routeInfo) {
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

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return "Email sent successfully";
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email");
  }
}

module.exports = router;
module.exports.sendEmail = sendEmail;
