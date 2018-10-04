const ToDoList = require('../models/ToDoList');

const post = (req, res) => {
    const { item, due } = req.body;
    const toDo = ToDoList.create(item, due);
    res.send(toDo)
};

const get = (req, res) => {
    const toDos = ToDoList.getAll();
    res.send(toDos);
}

const methods = {
    post,
    get
}

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
}