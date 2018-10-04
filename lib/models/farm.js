const Pet = require('./pet');

class Farm {
    constructor() {
        this.farm = new Map();
    }

    createNewID(name, petType) {
        const pet = new Pet(name, petType);
        this.farm.set(pet.id, pet);
        return pet;
    }
    get(id) {
        return this.farm.get(id);
    } 
    getAll() {
        return [...this.farm.values()];
    }

    update(id, newText) {
        const pet = this.farm.get(id);
        pet.text = newText;
        return pet;
    }

    delete(id) {
        this.farm.delete(id);
    }
}

module.exports = new Farm();



