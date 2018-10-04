const uuid = require('uuid/v4');

module.exports = class Creature {
    constructor(type, isMagical) {
        this.id = uuid();
        this.type = type;
        this.isMagical = isMagical;
    }
};