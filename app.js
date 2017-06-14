var express     = require('express');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var app         = express();


var routes = require('./routes');


var port = process.env.PORT || 3000;
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
//app.use(morgan('dev'));


// API ROUTES -------------------
// apply the routes to our application with the prefix /api
app.use('/api', routes);

// =======================
// start the server ======
// =======================
app.listen(port);

console.log('Magic happens at http://localhost:' + port, process.env.DATABASE_HOST );
