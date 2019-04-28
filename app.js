const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
const session = require("express-session");
const env = require('dotenv');

// Routers
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var dashboardRouter = require('./routes//dashboard');

// Express App :
const app = express();

// Setup ejs as templating engine :
app.set('view engine', 'ejs');

// Set static directory :
app.use(express.static('public'));

// Middlewares :
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ 
    secret: 'dazonhuodncazbfkhcbcfnzz', 
    resave: true, 
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes :
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/dashboard', dashboardRouter);

//Models
var models = require("./models");
 
// PassportJS strategy loading :
require('./config/passport/passport')(passport, models.user);

//Sync Database :
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});

app.listen(8080);