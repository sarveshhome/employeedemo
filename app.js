const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/database');
var port = process.env.PORT || 3400;

mongoose.connect(config.database);
let db = mongoose.connection;

//Check connection
db.open('open', function() {
    console.log('Connection to MongoDB');
});

//Check db error
db.on('error', function(err) {
    console.log(err);
});

//Init App
const app = express();

//Bring in Models
let Employee = require('./models/employee');

// Set Public Folder
app.use(express.static(__dirname + '/public'));
//app.use(morgan('something done in server'));
// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
//app.use(methodOverride());

app.get('*', function(req, res, next) {
    res.locals.employees = req.Employee || null;
    next();
});

//Home Route
app.get('/', function(req, res) {
    Employee.find({}, function(err, employees) {
        if (err) {
            console.log(err);
        } else {
            res.sendfile('./views/index.html');
        }
    });
});


//Routing Files
let employees = require('./routes/employees');
app.use('/employees', employees);


// Start Server
app.listen(port, function() {
    console.log('Server started on port ... ' + "http://localhost:" + port);
});