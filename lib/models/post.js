const shortid = require('shortid');

module.exports = class Post {
    constructor(username, text) {
        this.id = shortid.generate(this.id);
        this.username = username;
        this.text = text;
    }
};
