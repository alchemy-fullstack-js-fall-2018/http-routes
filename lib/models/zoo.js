const Animal = require('./animal');

class Zoo {
    constructor() {
        this.zoo = new Map();
    }

    create(name, species) {
        const animal = new Animal(name, species);
        this.animals.set(animal.id, animal);
        return animal;
    }
}

module.exports = new Zoo();
