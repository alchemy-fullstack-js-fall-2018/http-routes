const uuid = require('uuid/v4');

module.exports = class ToDo {
    constructor(item, due) {
        this.id = uuid();
        this.item = item;
        this.due = due;
    }
}