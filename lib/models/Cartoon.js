const uuid = require('uuid/v4');

module.exports = class Cartoon {
    constructor(name, text) {
        this.id = uuid();
        this.name = name;
        this.text = text;
    }
};
