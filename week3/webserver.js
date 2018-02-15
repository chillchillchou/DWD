var config = require('./config.js');
var mongojs = require('mongojs');
var db = mongojs("cho:woshinaochou4@ds043350.mlab.com:43350/testdatabase", ['truth']);
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
  extended: true
}); // for parsing form data
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

//incoporate ejs, we are gonna use ejs as the view engine
app.set('view engine', 'ejs');

//set routhe for hello world and timestamp
// app.get('/', function (req, res) {
//   var responseText = "Hello World!<br>";
//   responseText+='<small>Requested at:'+req.requestTime+'</small>';
//   res.send(responseText);
// })

var count = 0;
var thesubmissions = [];


// app.get('/count', function(req, res) {
//   //this is middleware
//   count++;
//   res.send('<html><body><h1>You recieved' + count + '</h1></body></html>');
// });

app.get('/formpost', function(req, res) {

  console.log("They submitted:" + req.query.truth);
  var htmltoSend = "<html><head><link rel=\"stylesheet\" href=\"css/submit.css\" ></head><body><div id=\"showAnswer\"><h1 style=\"margin:auto;width:50%\">You wrote: " + req.query.truth + "</h1><form method=\"GET\" action=\"/\"><button class=\"button\">Back</button></form></div></body></html>";
  res.send(htmltoSend);
  thesubmissions.push(req.query.truth);
  // res.redirect('/test');
  // });

  db.truth.save({
    "truthAnswers": req.query.truth
  }, function(err, saved) {
    if (err || !saved) console.log("Not saved");
    else console.log("Saved");
  });
});

/* Alternatively you could loop through the records with a "for"
  	for (var i = 0; i < saved.length; i++) {
	  	console.log(saved[i]);
	}
	*/

//use ejs to return pages
app.get('/display', function(req, res) {
  db.truth.find({}, function(err, saved) {
    if (err || !saved) {
      console.log("No results");
    } else {
      console.log(saved);
      res.render('template.ejs', {
        truthAnswers: saved
      });
    }
  });
});

app.get('/search', function(req, res) {
  var query = new RegExp(req.query.key, 'i');
  db.truth.find({
      "truthAnswers": query
    },
    function(err, saved) {
      if (err || !saved) {
        console.log("No results");
      } else {
        res.render('template.ejs', {
          truthAnswers: saved
        });
      }
  });
});


// app.get('/search', function(req, res) {
//   db.mycollection.find({"attribute":"value_to_search_for"}, function(err, saved) {
//     if( err || !saved) console.log("No results");
//     else saved.forEach( function(record) {
//       console.log(record);
//     } );
//   });
// });

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
})
