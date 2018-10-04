const ToDoList = require('../models/ToDoList');

const post = (req, res) => {
    const { item, due } = req.body;
    const toDo = ToDoList.create(item, due);
    res.send(toDo)
};

const methods = {
    post
}

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
}