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

const put = (req, res) => {
    const { type, isMagical } = req.body;
    const id = req.id;
    const creature = Menagerie.update (id, type, isMagical);
    res.send(creature);
};

const del = (req, res) => {
    const id = req.id;
    Menagerie.delete(id);
    res.send('');
};

const methods = {
    get,
    post,
    put,
    delete: del
};

module.exports = (req, res) => {
    // GET -> get
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};