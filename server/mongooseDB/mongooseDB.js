const mongoose = require("mongoose");
const mongo = "mongodb://127.0.0.1:27017/navigate";

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

const User = mongoose.model('User', userSchema);
module.exports = User;