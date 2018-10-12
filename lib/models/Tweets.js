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

    getAll() {
        return [...this.tweets.values()];
    }

    update(id, body) {
        this.tweets.set(id, body);
        return body;
    }

    drop(){
        this.tweets = new Map();
    }
}

module.exports = new Tweets();
