const express = require("express"); // importing express
const app = express(); // creating an instance of express in app variable
const cookieParser = require("cookie-parser"); // importing cookies parser
const cors = require("cors"); // To accept request from different port
const path = require('path');

// Using Middlewares
app.use(cors()); // Enable CORS for all routes
app.use(express.json({ limit: "50mb" })); // Converts the JSON payload to Javascript objects and hand it over to req.body object.
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Decode the url encoded data sent from client (like when a form is submitted), extended:true means nested objects can also be decoded and parsed.
app.use(cookieParser()); // To extract cookies sent my client in request and hand it over to req.cookies object.

// Importing Routes
const company = require("./routes/companyRoutes");
const phone = require("./routes/phoneRoutes");
const category = require("./routes/templateCategoryRoutes");
const template = require("./routes/templateRoutes");
const Case = require("./routes/caseRoutes");
const Sticker = require("./routes/stickerRoutes");

// Using Routes
app.use("/utils", express.static(path.join(__dirname, 'utils')));
app.use("/api/v1", company);
app.use("/api/v1", phone);
app.use("/api/v1", category);
app.use("/api/v1", template);
app.use("/api/v1", Case);    
app.use("/api/v1", Sticker);    

module.exports = app;
