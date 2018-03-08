var cheerio = require('cheerio');
var fs = require('fs');
var mongojs = require('mongojs');
var db = mongojs("cho:woshinaochou4@ds235768.mlab.com:35768/truthbook", ['yahoo']);
var express = require('express');
//
// var htmlString = fs.readFileSync('index.html').toString();
// var parsedHTML = $.load(htmlString);
//
// //query for all elements with class 'foo' and loop over them
// parsedHTML('.foo').map(function(i,foo){
// //the foo html elements into a cheerio object (same pattern as jQuery)
//   foo = $(foo);
//   console.log(foo.text());
// })


// var request = require('request');
//
// function gotHTML(err, resp, html) {
//   if (err) return console.error(err);
//   var parsedHTML = $.load(html);
//   // get all img tags and loop over them
//   var imageURLs = [];
//   parsedHTML('a').map(function(i, link) {
//     var href = $(link).attr('href');
//     if (!href.match('.png')) return;
//     imageURLs.push(domain + href);
//
//   });
//   console.log(imageURLs);
// }
//
// var domain = 'http://substack.net/images/';
// request(domain, gotHTML);


var request = require('request');

function gotHTML(err, resp, html) {
  if (err) return console.error(err);
  var $ = cheerio.load(html);
  // get all img tags and loop over them
  var answerURLs = [];

  var answers = $('.ya-q-full-text');
  var split_answer;

  answers.map(function(i, answer) {
    var $answer = $(answer);
    split_answer = $answer.text().split("\n");
    for (i = 0; i <= split_answer.length; i++) {
      if (split_answer[i]) {
        db.yahoo.save({
          "truthAnswers": split_answer[i]
        });
        console.log("sentence " + i + " "+ split_answer[i]);
      }
    }
    // answerURLs.push(split_answr);
    answerURLs.push($answer.text());

    console.log("<br>");
  })

  // console.log(answerURLs[1]);
  // // answerURLs.push(split_answr);
  // for (i = 0; i++; i <= split_answer.length) {
  //   db.truth.save({
  //     "truthAnswers":split_answer[i]
  //   });

  //}

}

var domain = 'https://answers.yahoo.com/question/index;_ylt=AwrC0wxDZJxaKVsAthZPmolQ;_ylu=X3oDMTEyYmdmanA3BGNvbG8DYmYxBHBvcwMyBHZ0aWQDQjI1NTlfMQRzZWMDc3I-?qid=20071205083615AAnTUqB';
request(domain, gotHTML);
