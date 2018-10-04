const Animal = require('./animal');

class Zoo {
    constructor() {
        this.zoo = new Map();
    }

    create(name, species) {
        const animal = new Animal(name, species);
        this.zoo.set(animal.id, animal);
        return animal;
    }

    get(id) {
        return this.zoo.get(id);
    }

    getAll() {
        return [...this.zoo.values()];
    }

    update(id, animalUpdate) {
        const animal = this.zoo.get(id);
        const { name, species } = animalUpdate;
        if(name) {
            animal.name = name;
        }
        if(species) {
            animal.species = species;
        }
        this.zoo.set(id, animal);
        return animal;
    }

    delete(id) {
        const removed = this.zoo.delete(id);
        return { removed };
    }

    drop() {
        this.zoo = new Map();
    }
}

module.exports = { Zoo: new Zoo() };
