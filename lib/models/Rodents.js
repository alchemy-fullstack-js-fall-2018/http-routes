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

}

module.exports = new Rodents();
