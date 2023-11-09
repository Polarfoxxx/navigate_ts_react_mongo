
const express = require("express");
const app = express();
    app.use(express.json());
const Joi = require("joi");
const mongoose = require("mongoose");
const cors = require("cors");
const { json } = require("express");
const Port = 4000;
const mongo = "mongodb+srv://polar_foxx:micho99999@conproduct.tytielo.mongodb.net/?retryWrites=true&w=majority";
app.listen(Port, () => console.log(`connect to port ${ Port }`));
const corsOption = {
    origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));
app.use(cors())

mongoose
.connect(mongo, { useNewUrlParser: true })
    .then(() => console.log("connect to mongoo"))
    .catch(() => console.log("error connect mongoo"))


const productSchema = new mongoose.Schema({
    productName : String,
    price : Number,
})

const Product = mongoose.model("Product" , productSchema)

/* ---------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------- */

/* cretate product POST method -------------------------------------*/
app.post("/api/create/product", (req, res) => {
    const { err } = validadeProduct.validate(req.body);
        if(err) {
            res.send(err)
        } else {
    Product.create(req.body)   
        .then((data) => { res.json(data)})
        .catch((err) => { res.send(err)})
    }
})
/* validation */
const validadeProduct = Joi.object({
    productName: Joi.string().min(2).required(),
    price: Joi.number().min(2).required(),
})

/* Display all product GET method -------------------------------------*/
app.get("/api/listen/product", (req, res) => {
    Product.find()
        .then(prod => {res.json(prod)})
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
        Product.find({productName : name})
            .then((data) => { res.json(data) })
            .catch((err) => {console.log(err)})
})


