const Animal = require('./Animal');

class Zoo {
    constructor() {
        this.zoo = new Map();
    }

    create(name, species) {
        const animal = new Animal(name, species);
        this.zoo.set(animal.id, animal);
        return animal;
    }
}

module.exports = new Zoo();
