const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
const session = require("express-session");
const env = require('dotenv');
var flash = require('express-flash');

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

app.use(flash());

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

app.use(function(req, res, next){
    res.status(404);
  
    // respond with html page
    if (req.accepts('html')) {
      res.render('pages/404', {pageName: "404", url: req.url });
      return;
    }
  
    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }
  
    // default to plain-text. send()
    res.type('txt').send('Not found');
});

app.listen(8080);