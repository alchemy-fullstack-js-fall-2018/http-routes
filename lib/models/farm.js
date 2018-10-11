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

    update(id, petUpdate) {
        // const pet = this.farm.get(id);
        // const { name, petType } = petUpdate;
        // if(name) {
        //     pet.name = name;
        // }
        // if(petType) {
        //     pet.petType = petType;
        // }
        // this.farm.set(id, pet);
        // return pet;
        this.farm.set(id, petUpdate);
        return petUpdate;
    }

    delete(id) {
        const removed = this.farm.delete(id);
        return { removed }; 
        
    }
}

module.exports = new Farm();



