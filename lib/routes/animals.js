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
    } else {
        const animals = Zoo.getAll();
        res.send(animals);
    }
};

const put = (req, res) => {
    const { id } = req;
    const animalUpdate = req.body;
    const updatedAnimal = Zoo.update(id, animalUpdate);
    res.send(updatedAnimal);
};

const remove = (req, res) => {
    const { id } = req;
    const success = Zoo.delete(id);
    res.send(success);
};

const methods = {
    post,
    get,
    put, 
    delete: remove
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
