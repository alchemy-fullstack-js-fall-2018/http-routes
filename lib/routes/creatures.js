const Menagerie = require('../models/Menagerie');
const notFound = require('./not-found');

const get = (req, res) => {
    const { id } = req;
    if(id) {
        const creature = Menagerie.get(id);
        res.send(creature);
    } else {
        const allCreatures = Menagerie.getAll();
        res.send(allCreatures);
    }
};

const post = (req, res) => {
    const { type, isMagical } = req.body;
    const creature = Menagerie.create(type, isMagical);
    res.send(creature);
};

const methods = {
    get,
    post
};

module.exports = (req, res) => {
    // GET -> get
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};