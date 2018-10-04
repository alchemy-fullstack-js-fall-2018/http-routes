const Odm = require('./Odm');

class Odms {
    constructor() {
        this.odms = new Map();
    }

    create(type, size) {
        const odm = new Odm(type, size);
        this.odms.set(odm.id, odm);
        return odm;
    }
}

module.exports = new Odms();