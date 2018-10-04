const shortid = require('shortid');

module.exports = class Cartoon {
    constructor(name, text) {
        this.id = shortid.generate();
        this.name = name;
        this.text = text;
    }
};
