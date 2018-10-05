const ToDoList = require('../models/ToDoList');

const post = (req, res) => {
    const { item, due } = req.body;
    const toDo = ToDoList.create(item, due);
    res.send(toDo)
};

const get = (req, res) => {
    const toDos = ToDoList.getAll();
    res.send(toDos);
};

const drop = (req, res) => {
    ToDoList.drop();
    res.send('removed');
};

const methods = {
    post,
    drop,
    get
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};