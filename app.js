const express = require("express");
const bodyParser = require("body-parser");

// Routers
var indexRouter = require('./routes/index');

// Express App :
const app = express();

// Setup ejs as templating engine :
app.set('view engine', 'ejs');

// Set static directory :
app.use(express.static('public'));

// Routes :
app.use('/', indexRouter);

app.listen(8080);