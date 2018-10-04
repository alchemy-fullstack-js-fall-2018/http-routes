const Rodents = require('../models/Rodents');
const notFound = require('./not-found');

const get = (req, res) => {
    const { id } = req;
    if(id) {
        const rodent = Rodents.get(id);
        res.send(rodent);
    }
};

const post = (req, res) => {
    const { name, size } = req.body;
    const rodent = Rodents.create(name, size);
    res.send(rodent);
};

const put = (req, res) => {
    const { id } = req.body;
    console.log(req.body);
    const rodent = Rodents.update(id, req.body);
    res.send(rodent);
};

const methods = {
    get,
    post,
    put
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
