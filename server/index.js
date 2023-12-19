
const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt');
const Joi = require("joi");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const { json } = require("express");
const Port = 4000;
const mongo = "mongodb://127.0.0.1:27017/navigate";
app.listen(Port, () => console.log(`connect to port ${Port}`));

const corsOption = {
  origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));
app.use(cors())

mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connect to mongoo"))
  .catch(() => console.log("error connect mongoo"))


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  data: [{ text: String }]
})

const User = mongoose.model("user", userSchema)

/* ---------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------- */

/* register POST method -------------------------------------*/
app.post('/register/newUser', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hashovanie hesla
    const hashedPassword = await bcrypt.hash(password, 10);
    // Skontrolujte, či používateľ už neexistuje
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Používateľ už existuje.' });
    } else {
      // Validácia dát pomocou Joi
      const validateUser = Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(4).required(),
      });

      const validation = validateUser.validate({ username, password });
      if (validation.error) {
        res.status(400).json({ message: validation.error.details[0].message });
      } else {
        // Vytvorte nového používateľa
        const newUser = {
          username,
          password: hashedPassword,
          messages: [],
        };
        User.create(newUser)
          .then((data) => res.json(data))
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Chyba pri registrácii.' });
          });
      };
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Chyba pri registrácii.' });
  };
});
/* Login GET method -------------------------------------*/
app.post('/login/user', async (req, res) => {
  try {
    const { username, password } = req.body;
    /* hladanie uzivatela*/
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
      // Generovanie JWT s časovou expiráciou
      const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });
      res.json({ token }); 
      console.log(token);
    } else {
      res.status(401).send('Invalid username or password');
    };
  } catch
  (error) {
    res.status(500).send('Internal Server Error');
  };
});

// Middleware na overenie JWT pri každom requeste
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied');
  jwt.verify(token, 'secret', (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
};



/* Display all product GET method -------------------------------------*/
app.get("/api/listen/product", (req, res) => {
  Product.find()
    .then(prod => { res.json(prod) })
    .catch(() => console.log("chyba pri nacitani produktov"))
})
/* Delete product DELETE method -------------------------------------*/
app.delete("/api/listen/product/delete/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((data) => { res.json(data) })
    .catch((err) => console.log(err))
})
/* Find product GET method -------------------------------------*/
app.get("/api/listen/product/:name", (req, res) => {
  const name = req.params.name;
  Product.find({ productName: name })
    .then((data) => { res.json(data) })
    .catch((err) => { console.log(err) })
})


/* const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const secretKey = 'tajnyKluc'; // Zmeniť na bezpečný tajný kľúč

app.use(bodyParser.json());

// Pripojenie k MongoDB
mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model('User', {
  username: String,
  password: String,
});

// Registrácia používateľa
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Skontrolujte, či používateľ už neexistuje
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Používateľ už existuje.' });
    }

    // Vytvorte nového používateľa
    const newUser = new User({ username, password });
    await newUser.save();

    // Vytvorte a pošlite JWT token
    const token = jwt.sign({ username }, secretKey);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Chyba pri registrácii.' });
  }
});

// Prihlásenie používateľa
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Nájdite používateľa v databáze
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: 'Nesprávne prihlasovacie údaje.' });
    }

    // Vytvorte a pošlite JWT token
    const token = jwt.sign({ username }, secretKey);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Chyba pri prihlásení.' });
  }
});

// Chránená cesta, kde môžete ukladať objekty
app.post('/save-object', authenticateToken, (req, res) => {
  const { name, coord } = req.body;
  // Tu môžete uložiť objekt podľa prihláseného používateľa

  res.json({ message: 'Objekt uložený úspešne.' });
});

// Funkcia na overenie JWT tokenu
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Chýbajúci autorizačný token.' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Neplatný autorizačný token.' });
    }

    req.user = user;
    next();
  });
}

app.listen(port, () => {
  console.log(`Server beží na http://localhost:${port}`);
});
 */





/*  */