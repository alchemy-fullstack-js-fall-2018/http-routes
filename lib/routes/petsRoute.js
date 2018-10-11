const errorRoute = require('./error');
const Farm = require('../models/Farm');

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

const put = (req, res) => {
    const { id } = req;
    const petUpdate = req.body;
    const updatedPet = Farm.update(id, petUpdate);
    res.send(updatedPet);
    
};

const remove = (req, res) => {
    const { id } = req;
    const deleted = Farm.delete(id);
    res.send(deleted);
};


const methods = {
    get,
    post,
    put,
    delete: remove
};

module.exports = (req, res) => {
    // GET -> get
    const method = methods[req.method.toLowerCase()] || errorRoute;
    method(req, res);
};



