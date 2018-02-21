

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require("path"); 

var PORT = process.env.PORT || 8080;
 
// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));


// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));
 
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
 
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));

// html parser string format for Body
require("./app/routing/htmlRoutes.js")(app);
require("./app/routing/apiRoutes.js")(app);

app.use(function(req, res){
        res.sendFile(path.join(__dirname + '/app/public/home.html'));
    }); 

app.listen(PORT, function(){
	console.log("app listening on PORT: " + PORT);
});