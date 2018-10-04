const Odms = require('../models/Odms');
const notFound = require('./not-found');

const post = (req, res) => {
    const { type, size } = req.body;
    const odm = Odms.create(type, size);
    res.send(odm);
};

const get = (req, res) => {
    const { id } = req;
    if(id) {
        const odm = Odms.get(id);
        res.send(odm);
    } else {
        const odms = Odms.getAll();
        res.send(odms);
    }
};

const methods = {
    get,
    post
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};

