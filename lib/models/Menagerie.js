const Creature = require('./creature');

class Menagerie {
    constructor() {
        this.menagerie = new Map();
    }

    create(type, isMagical) {
        const creature = new Creature(type, isMagical);
        this.menagerie.set(creature.id, creature);
        return creature;
    }

    get(id) {
        return this.menagerie.get(id);
    }

    getAll() {
        return [...this.menagerie.values()];
    }

    update(id, newType, newIsMagical) {
        const creature = this.menagerie.get(id);
        creature.type = newType;
        creature.isMagical = newIsMagical;
        return creature;
    }

    delete(id) {
        this.menagerie.delete(id);
    }
}

module.exports = new Menagerie();