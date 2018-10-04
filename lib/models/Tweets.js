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
    get(id) {
        return this.tweets.get(id);
    }
}

module.exports = new Tweets();
