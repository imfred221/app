var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 3001;

// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var test = require('./routes/test.js')(app)
app.use('/api/test', test)

var server = app.listen(3001, function () {
    console.log("Express server has started on port " + port)
});
