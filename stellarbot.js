var jf = require('jsonfile');
var Twit = require('twit');
var FeedParser = require('feedparser');
var request = require('request');
var url = require('url');

var T = new Twit(require(__dirname + '/twitter.js'));
var C = require(__dirname + '/config.js');
var stellarFeed = 'http://stellar.io/' + C.stellarUsername + '/flow/feed';
var cachedFeed = __dirname+'/feed.json';

var stellarItems = [];
var cachedItems = [];

setInterval(function() {
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
              T.post('statuses/retweet/' + tweet_id, function(RTerr, reply) {
                console.log("error: " + RTerr);
                console.log("reply: " + reply);
              });
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
}, 1800000 + Math.floor(Math.random() * 1800000));
