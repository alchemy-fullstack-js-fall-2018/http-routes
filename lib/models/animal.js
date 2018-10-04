const shortid = require('shortid');

module.exports = class Animal {
    constructor(name, species) {
        this.id = shortid.generate();
        this.name = name;
        this.species = species;
    }
};
