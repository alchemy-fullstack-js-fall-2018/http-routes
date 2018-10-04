const shortid = require('shortid');

module.exports = class Rodent{
    constructor(name, size) {
        this.id = shortid.generate();
        this.name = name;
        this.size = size;
    }
};
