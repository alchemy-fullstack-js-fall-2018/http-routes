const Rodents = require('../models/Rodents');
const notFound = require('./not-found');

const get = (req, res) => {

    const { id } = req;
    if(id) {
        const rodent = Rodents.get(id);
        if(rodent) res.send(rodent);
        else notFound(req, res);        
    }
};

const post = (req, res) => {
    const { name, size } = req.body;
    const rodent = Rodents.create(name, size);
    res.send(rodent);
};

const put = (req, res) => {
    const { id } = req.body;
    const rodent = Rodents.update(id, req.body);
    res.send(rodent);
};

const remove = (req, res) => {
    const { id } = req.body
};

const methods = {
    get,
    post,
    put,
    delete: remove
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
