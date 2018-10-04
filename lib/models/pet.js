const uuid = require('uuid/v4');

module.exports = class Pet {
    constructor(name, petType) {
        this.id = uuid();
        this.name = name;        
        this.petType = petType;
    }
};








