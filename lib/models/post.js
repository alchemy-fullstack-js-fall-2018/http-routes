const uuid = require('uuid/v4');

module.exports = class Post {
    constructor(username, text) {
        this.id = uuid();
        this.username = username;
        this.text = text;
    }
};
