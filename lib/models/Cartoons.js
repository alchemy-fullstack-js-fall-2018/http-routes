const Cartoon = require('./cartoon');

class Cartoons {
    constructor() {
        this.cartoons = new Map();
    }

    create(name, text) {
        const cartoon = new Cartoon(name, text);
        this.cartoons.set(cartoon.id, cartoon);
        return cartoon;
    }

    get(id) {
        return this.cartoons.get(id);
    }

    getAll() {
        return [...this.cartoons.values()];
    }

    update(id, newText) {
        const cartoon = this.cartoons.get(id);
        cartoon.text = newText;
        return cartoon;
    }

    delete(id) {
        const removed = this.cartoons.delete(id);
        return { removed };
    }
}

module.exports = new Cartoons();
