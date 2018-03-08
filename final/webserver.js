//var config = require('./config.js');
var mongojs = require('mongojs');
var db = mongojs("cho:woshinaochou4@ds235768.mlab.com:35768/truthbook", ['yahoo']);
var express = require('express');
var https = require('https');
var fs = require('fs'); // Using the filesystem module
var credentials = {
  key: fs.readFileSync('my-key.pem'),
  cert: fs.readFileSync('my-cert.pem')
};

var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
  extended: true
}); // for parsing form data


app.use(urlencodedParser);


//set Static path
app.use(express.static('public'));

//incoporate ejs, we are gonna use ejs as the view engine
app.set('view engine', 'ejs');

var count = 0;
var thesubmissions = [];


// app.get('/count', function(req, res) {
//   //this is middleware
//   count++;
//   res.send('<html><body><h1>You recieved' + count + '</h1></body></html>');
// });
app.get('/', function(req, res) {
  db.yahoo.find({}, function(err, saved) {
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
app.get('/new',function(req,res){
  res.render('new.ejs');
})

app.get('/formpost', function(req, res) {

  console.log("They submitted:" + req.query.textfield);
  console.log(typeof(req.query.textfield))
  // var htmltoSend = "<html><head><link rel=\"stylesheet\" href=\"css/submit.css\" ></head><body><div id=\"showAnswer\"><h1 style=\"margin:auto;width:50%\">You wrote: " + req.query.textfield + "</h1><form method=\"GET\" action=\"/\"><button class=\"button\">Back</button></form></div></body></html>";
  // res.send(htmltoSend);
  thesubmissions.push(req.query.textfield);
  db.yahoo.save({
    "truthAnswers": req.query.textfield
  }, function(err, saved) {
    if (err || !saved) console.log("Not saved");
    else console.log("Saved");
  });
  res.render('result.ejs',{submission:req.query.textfield})
  // res.redirect('/test');
  // });


});


app.get('/search', function(req, res) {
  var query = new RegExp(req.query.key, 'i');
  db.yahoo.find({
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
var httpsServer = https.createServer(credentials, app);

app.listen(8080, function() {
  console.log('Example app listening on port 3000!');
})
