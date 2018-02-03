var express = require('express');
var app = express();

//Every time the app receives a request, it prints the message “LOGGED” to the terminal.
var myLogger = function(req,res,next){
  console.log("LOGGED");
  next();
}
//create a cuntion that displays the timestamp of your request in the browser
var requestTime = function(req,res,next){
  req.requestTime=Date.now();
  next();
}
//load the request time function
app.use(requestTime);
//load the middleware function
app.use(myLogger);
//middleware functions that are loaded first are also executed first.

//set Static path
app.use(express.static(path.join(__dirname,'public')));

app.get('/', function (req, res) {
  var responseText = "Hello World!<br>";
  responseText+='<small>Requested at:'+req.requestTime+'</small>';
  res.send(responseText);
})

app.get('/somethingelse', function (req, res) {
//this is middleware
  res.send('somethingelse!');
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
