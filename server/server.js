var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3001 || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var server = require('http').Server(app);
var path = require('path');
var cors = require('cors');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var events = require('./models/eventSchema');

// var configDB = require('./config/database.js');
// configuration ===============================================================
mongoose.connect('mongodb://Xemylian:Sinavova123@ds243931.mlab.com:43931/calendar',{ useNewUrlParser: true }); // connect to our database
require('./config/passport.js')(passport);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

app.use(session({ secret: 'megacalendareventmazafaka' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// routes ======================================================================
require('./routes/routes.js')(app, events, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
console.log("Порт сервера: "+ port);
server.listen(port);