
const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt');
const Joi = require("joi");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const { json } = require("express");
var nodemailer = require('nodemailer');
const Port = 4000;
const mongo = "mongodb://127.0.0.1:27017/navigate";
app.listen(Port, () => console.log(`connect to port ${Port}`));


app.use(cors());

mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connect to mongoo"))
  .catch(() => console.log("error connect mongoo"))

// Definícia typu Type_Addrress
const Type_Addrress = {
  label: String,
  country: String,
  country_code: String,
  county: String,
  postcode: String,
  region: String,
  state: String,
  town: String,
};

// Definícia typu Type_ALLCoordinateObjekt
const Type_ALLCoordinateObjekt = {
  identObject: { type: mongoose.Schema.Types.Mixed }, // môže byť string alebo number, ak je identObject prítomný
  address: Type_Addrress,
  latLng: [Number],
};

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  data: [
    {
      routeName: String,
      startCoord: {
        address: Type_Addrress,
        latLng: [Number]
      },
      endCoord: {
        address: Type_Addrress,
        latLng: [Number]
      },
      allCoord: [Type_ALLCoordinateObjekt],
      timeCreate: String
    }
  ]
});

const User = mongoose.model("user", userSchema)

/* ---------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------- */

/* register POST method -------------------------------------*/
app.post('/register/newUser', async (req, res) => {
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
        res.status(400).json({ message: "The password must have minimum four signs" });
      } else {
        // Vytvorte nového používateľa
        const newUser = {
          username,
          password: hashedPassword,
          data: [],
        };
        User.create(newUser)
          .then(() => res.json({ message: "Registration sucesfull" }))
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Registration error.' });
          });
      };
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration error.' });
  };
});

/* Login GET method -------------------------------------*/
app.post('/login/user', async (req, res) => {
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

// Middleware na overenie JWT pri každom ulozani dat
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json('Access denied');
  jwt.verify(token, 'secret', (err, user) => {
    if (err) return res.status(403).json('Invalid token');
    req.user = user;
    next();
  });
};

/* save GET method -------------------------------------*/
app.post('/save/data', authenticateToken, async (req, res) => {
  const { username, startCoord, endCoord, routeName, allCoord, timeCreate } = req.body;
  try {
    /* hladanie uzivatela*/
    const user = await User.findOne({ username });
    // Pridanie správy do poľa správ používateľa
    user.data.push({
      routeName: routeName,
      startCoord: startCoord,
      endCoord: endCoord,
      allCoord: allCoord,
      timeCreate: timeCreate
    });
    // Uloženie aktualizovaného používateľa do databázy
    await user.save();
    res.status(201).json({ message: "Route saved" });
  } catch
  (error) {
    res.status(500).send('Internal Server Error');
  };
});


/* get read method -------------------------------------*/
app.get('/load/data',authenticateToken ,async (req, res) => {
  const { useName } = req.query;

  try {
    const user = await User.findOne({ useName });
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

/* send mail ---------------------------------------------*/
app.post('/send/mail', authenticateToken, async (req, res) => {

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
})

