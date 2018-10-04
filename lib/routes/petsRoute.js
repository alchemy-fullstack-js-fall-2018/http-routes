const Farm = require('../models/Farm');
const errorRoute = require('./error');

const get = (req, res) => {
    const { id } = req;
    if(id) {
        const message = Farm.get(id);
        res.send(message);
    } else {
        const messages = Farm.getAll();
        res.send(messages);
    }
};

const post = (req, res) => {
    const { name, petType } = req.body;
    const pet = Farm.createNewID(name, petType);
    res.send(pet);
};

// const delete = (req, res) => {

// }
const methods = {
    get,
    post
    // delete
};

module.exports = (req, res) => {
    // GET -> get
    const method = methods[req.method.toLowerCase()] || errorRoute;
    method(req, res);
};







// method | path
// ---|---
// `GET` |     `/<resources>`
// `GET` |     `/<resources>/:id`
// `POST` |    `/<resources>`
// `PUT` |     `/<resources>/:id`
// `DELETE` |  `/<resources>/:id`

// (NOTE: plural resource name)

// Export a single `(req, res) => { /*...*/ }` function.

// That function delegates to a dictionary or `Map` by method.
