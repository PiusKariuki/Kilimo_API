const express = require("express");
const path = require("path");
require("./src/services/authenticate");
const connect = require("./src/services/dbConnect");


/*****************
 *SERVER INITILIZATIONS
 *****************/
const app = express();

/*****************
 *VIEW ENGINE CONFIG
 *****************/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

/*****************
 *MIDDLEWARE
 *****************/
app.use(require("./src/services/middleware"));
app.use(require("./src/Routes/ROUTE_MOUNTER"));

/*****************
 *SERVER INSTANTIATION
 *****************/
const port = process.env.PORT || 5000;
connect();
app.listen(port);

module.exports = app;
