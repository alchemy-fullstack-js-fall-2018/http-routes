const ToDoList = require('../models/ToDoList');

const post = (req, res) => {
    const { item, due } = req.body;
    const toDo = ToDoList.create(item, due);
    res.send(toDo)
};

const get = (req, res) => {
    const{ id } = req;

    if(id) {
        const toDo = ToDoList.get(id);
        res.send(toDo);
    }
    else {
        const toDos = ToDoList.getAll();
        res.send(toDos);
    }
};

const drop = (req, res) => {
    ToDoList.drop();
    res.send('removed');
};

const del = (req, res) => {
    const{ id } = req;
    ToDoList.delete(id);
    res.send('removed');
};

const put = (req, res) => {
    const id = req.id;
    const newContent = req.body;
    const toDo = ToDoList.put(id, newContent);
    res.send(toDo);
}

const methods = {
    post,
    drop,
    get,
    delete: del,
    put
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};