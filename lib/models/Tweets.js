const Tweet = require('./Tweet');

class Tweets {
    constructor() {
        this.tweets = new Map();
    }

    create(username, text) {
        const tweet = new Tweet(username, text);
        this.tweets.set(tweet.id, tweet);
        return tweet;
    }
}

module.exports = new Tweets();
