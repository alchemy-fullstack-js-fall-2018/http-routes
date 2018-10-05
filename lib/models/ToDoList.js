const ToDo = require('./ToDo');

class ToDoList {
    constructor() {
        this.toDoList = new Map();
    }

    create(item, due) {
        const toDo = new ToDo(item, due);
        this.toDoList.set(toDo.id, toDo);
        return toDo;
    }

    getAll() {
        return [...this.toDoList.values()];
    }

    drop() {
        this.toDoList = new Map();
    }

    get(id) {
        return this.toDoList.get(id);
    }

    delete(id) {
        this.toDoList.delete(id);
    }

    put(id, newContent) {
        const toDo = this.get(id);
        toDo.item = newContent.item;
        toDo.due = newContent.due;
        return toDo;
    }

}

module.exports = new ToDoList();