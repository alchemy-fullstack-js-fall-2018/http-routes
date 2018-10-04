const uuid = require('uuid/v4');

module.exports = class Pets {
    constructor(name, petType) {
        this.id = uuid();
        this.name = name;        
        this.petType = petType;
    }
};








