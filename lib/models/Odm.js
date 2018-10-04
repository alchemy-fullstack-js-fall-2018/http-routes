const uuid = require('uuid/v4');

module.exports = class Odm {
    constructor(type, size) {
        this.id = uuid();
        this.type = type;
        this.size = size;
    }
};