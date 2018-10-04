const uuid = require('uuid/v4');

module.exports = class Animal {
    constructor(name, species) {
        this.id = uuid();
        this.name = name;
        this.species = species;
    }
};
