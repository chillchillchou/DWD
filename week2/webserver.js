var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser);

//Every time the app receives a request, it prints the message “LOGGED” to the terminal.
// var myLogger = function(req,res,next){
//   console.log("LOGGED");
//   next();
// }
// //create a cuntion that displays the timestamp of your request in the browser
// var requestTime = function(req,res,next){
//   req.requestTime=Date.now();
//   next();
// }
//load the request time function
// app.use(requestTime);
// //load the middleware function
// app.use(myLogger);
//middleware functions that are loaded first are also executed first.

//set Static path
app.use(express.static('public'));

//set routhe for hello world and timestamp
app.get('/', function (req, res) {
  var responseText = "Hello World!<br>";
  responseText+='<small>Requested at:'+req.requestTime+'</small>';
  res.send(responseText);
})

var count=0;
var thesubmissions = [];


app.get('/somethingelse', function (req, res) {
//this is middleware
  count++;
  res.send('<html><body><h1>something else!'+count+'</h1></body></html>');
});

app.get(
  //route
  '/formpost',

  function(req,res){

  console.log("They submitted:"+req.query.textfield);
  res.send("You submitted:"+req.query.textfield);
  thesubmissions.push(req.query.textfield);
  res.redirect('/disply');[]
});

app.get('/display',
function(req,res){
var htmlout="<html><body>";
for (var i=0;i<thesubmissions.length;i++){
  htmlout=htmlout+thesubmissions[i]+"<br>";
}
htmlout=htmlout+"</body></html>";
res.send(htmlout);
});


app.get('/johan-deckmann', function (req, res) {
	var fileToSend = "johan-deckmann.txt";
	res.sendFile(fileToSend, {root: './public'}); // Files inside "public" folder
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
