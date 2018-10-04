const Zoo = require('../models/Zoo');

const post = (req, res) => {
    const { name, species } = req.body;
    const animal = Zoo.create(name, species);
    res.send(animal);
};

const methods = {
    post
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()];
    method(req, res);
};
