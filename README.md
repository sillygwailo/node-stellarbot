# Stellarbot.js

### Credits: 

* Mike Davidson for originally writing Stellar-Tweetbot in PHP. https://github.com/mikeindustries/Stellar-Tweetbot
* Jason Kottke for building Stellar.io and tolerating Stellarbots in general. Please make the zombie accounts in the instructions below private so that people don't feel like they're being RT-spammed. And if you have a Stellar.io account, consider buying a Fun Pass to support Jason's work. https://stellar.io/x/manage/membership

### Setup Instructions:

The instructions assume familiarity with Node.js. You can run `npm install` to install all of the dependencies.

1. First, sign up for an account on Stellar.io if you don't have one already, follow some people, and see if you like the results. If you do, move on to the next step. If you don't, go outside and have a beer; you're done.
2. Create a zombie Twitter account for your new bot. You can call it whatever you want. I call mine @sillygwaibot.
3. In your zombie accounts settings, choose "Protect My Tweets" so that your bot doesn't fill up other people's Connect tabs.
4. While logged into your zombie account, go to https://dev.twitter.com/apps/new and set up a new app. You can put whatever you want into the fields as you're just trying to get your API keys. Do NOT click the blue "Create My Access Token" button yet.
5. Click the "Settings" tab and change your App's access to "Read and Write".
6. Click back to the "Details" tab and click the "Create My Access Token" button.
7. Copy your Consumer Key, Consumer Secret, Access Token, and Access Token Secret for use in Step 11.
8. Create a directory on your server for this, and any other Twitter bots you might want to run. You can call it "twitterbots".
9. Create a directory on your server for this Twitter bot inside the "twitterbots" folder. You can call it "stellarbot".
10. Place all the files within this "stellarbot" directory.
11. Edit the twitter.js file and paste in the Consumer Key, Consumer Secret, Access Token, and Access Token from step 7.
12. Edit the config.js file and punch in your Stellar.io username. Optional: add usernames you wish to not get retweeted in the following format: `excludeIDs: ['username2','username3']` Note that these are Twitter usernames, not Stellar.io usernames.
13. Test the script by running it on the command line: `node stellarbot.js`
14. The bot won't retweet anything for over 30 minutes but less than 45 minutes. If your zombie Twitter account retweeted some tweets within 45 minutes, it worked!
14. Install https://github.com/nodejitsu/forever or https://github.com/Unitech/pm2 and follow the instructions there to have your bot run in the background on your server.
15. Follow your zombie account from your real account.
16. You're done!
