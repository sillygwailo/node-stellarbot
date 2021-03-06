var jf = require('jsonfile');
var Twit = require('twit');
var FeedParser = require('feedparser');
var request = require('request');
var url = require('url');

var T = new Twit(require(__dirname + '/twitter.js'));
var C = require(__dirname + '/config.js');
var stellarFeed = 'http://stellar.io/' + C.stellarUsername + '/flow/feed';
var cachedFeed = __dirname+'/feed.json';

function excludeWords(searchString, haystack, callback) {
  var haystack = haystack || [];
  var matches = 0;
  haystack.forEach(function(searchValue) {
    if (searchString.toLowerCase().indexOf(searchValue) >= 0) {
      console.log('Excluded word: ' + searchValue);
      matches++;
    }
  });
  if (matches == 0) {
    callback();
  }
}

function Stellar() {
  var stellarItems = [];
  var cachedItems = [];
  jf.readFile(cachedFeed, function(readErr, cachedItems) {
    request(stellarFeed)
      .pipe(new FeedParser())
      .on('error', function(reqError) {
        console.log(reqError);
      })
      .on('readable', function () {
        var stream = this, item;
        while (stellarItem = stream.read()) {
          stellarItems.push(stellarItem.link);
          if (cachedItems.indexOf(stellarItem.link) === -1) {
            tweet_id = url.parse(stellarItem.link).pathname.split('/')[3];
            tweet_username = url.parse(stellarItem.link).pathname.split('/')[1];
            if (C.excludeIDs.indexOf(tweet_username) === -1) {
              var flip_result = Math.floor(Math.random() * (100 - 1)) + 1;
              if (flip_result <= 80) {
                excludeWords(stellarItem.description, C.excludedWords, function() {
                  T.post('statuses/retweet/' + tweet_id, function(RTerr, reply) {
                    console.log('Retweet attempted.');
                    console.log("error: " + RTerr);
                  });
                });
              }
              else {
                console.log('not RTed');
              }
            }
          }
        }
      })
      .on('end', function() {
        jf.writeFile(cachedFeed, stellarItems, function(writeErr) {
          if (writeErr) {
            console.log(writeErr);
          }
        });
      });
  });
}

setInterval(function() {
  try {
    Stellar()
  }
  catch (e) {
    console.log(e);
  }
}, 1800000 + Math.floor(Math.random() * 1800000));

Stellar();
