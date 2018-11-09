const express  = require('express');
const app      = express();
const port     = process.env.PORT || 3001 || 8080;
const mongoose = require('mongoose');
const passport = require('passport');
const server = require('http').Server(app);
const path = require('path');
const cors = require('cors');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');
const events = require('./models/eventSchema');


// var configDB = require('./config/database.js');
// configuration ===============================================================
mongoose.connect('mongodb://Xemylian:Sinavova123@ds121461.mlab.com:21461/vue-calendar2',{ useNewUrlParser: true }); // connect to our database
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