var express = require('express');
var app = express();

//Every time the app receives a request, it prints the message “LOGGED” to the terminal.
var myLogger = function(req,res,next){
  console.log("LOGGED");
  next();
}

//load the middleware function
app.use(myLogger);
//middleware functions that are loaded first are also executed first.
app.get('/', function (req, res) {
  res.send('Hello World!');
})

app.get('/somethingelse', function (req, res) {
//this is middleware
  res.send('somethingelse!');
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
