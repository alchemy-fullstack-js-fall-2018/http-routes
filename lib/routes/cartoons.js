const Cartoons = require('../models/Cartoons');
const notFound = require('./not-found');

const get = (req, res) => {
    const { id } = req;
    if(id) {
        const cartoon = Cartoons.get(id);
        res.send(cartoon);
    } else {
        const cartoons = Cartoons.getAll();
        res.send(cartoons);
    }
};

const post = (req, res) => {
    const { name, text } = req.body;
    const cartoon = Cartoons.create(name, text);
    res.send(cartoon);
};

const put = (req, res) => {
    const { id } = req;
    const { text } = req.body;
    const cartoon = Cartoons.update(id, text);
    res.send(cartoon);
};

const methods = {
    get,
    post,
    put
};

module.exports = (req, res) => {
    // GET -> get
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
