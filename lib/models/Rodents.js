const Rodent = require('./Rodent');

class Rodents {
    constructor() {
        this.rodents = new Map();
    }

    create(name, size) {
        const rodent = new Rodent(name, size);
        this.rodents.set(rodent.id, rodent);
        return rodent;
    }

    drop() {
        this.rodents = new Map();
    }

    get(id) {
        return this.rodents.get(id);
    }

    getAll() {
        return [...this.rodents.values()];
    }
    
    update(id, body) {
        this.rodents.set(id, body);
        return body;
    }
    
    delete(id) {
        return this.rodents.delete(id);
    }

}

module.exports = new Rodents();
