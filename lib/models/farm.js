const Pets = require('./pets');

class Farm {
    constructor() {
        this.farm = new Map();
    }

    createNewID(name, petType) {
        const pets = new Pets(name, petType);
        this.farm.set(petType.id, petType);
        return pets;
    }
    get(id) {
        return this.farm.get(id);
    }
}

 module.exports = new Farm();



