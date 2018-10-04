const Zoo = require('../models/Zoo');
const notFound = require('./not-found');

const post = (req, res) => {
    const { name, species } = req.body;
    const animal = Zoo.create(name, species);
    res.send(animal);
};

const get = (req, res) => {
    const { id } = req;
    if(id) {
        const animal = Zoo.get(id);
        res.send(animal);
    }
};

const methods = {
    post,
    get
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
