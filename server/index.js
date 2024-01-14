
const post_Register = require('./CRUD/module_register.post');
const post_Log = require('./CRUD/module_login.post');
const post_Save = require("./CRUD/module_save.post");
const get_Read = require("./CRUD/module_read.get");
const post_Send_Email = require("./CRUD/module_sendEmail.post");
const delete_Road = require("./CRUD/module_deleteRoute.delete");

const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const Port = 4000;
app.listen(Port, () => console.log(`connect to port ${Port}`));
app.use(cors());

/* ---------------------------------------------------------------------------- */
/* register POST method --------------------------------*/
app.use('/register', post_Register);
/* Login GET method ------------------------------------*/
app.use('/login', post_Log);
/* save GET method -------------------------------------*/
app.use('/save', post_Save);
/* get read method -------------------------------------*/
app.use('/load', get_Read);
/* send mail -------------------------------------------*/
app.use('/send', post_Send_Email);
/* delete route ----------------------------------------*/
app.use('/delete', delete_Road);


