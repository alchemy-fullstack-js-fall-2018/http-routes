const Odms = require('../models/Odms');
const notFound = require('./not-found');

const post = (req, res) => {
    const { type, size } = req.body;
    const odm = Odms.create(type, size);
    res.send(odm);
};

// const get = (req)

const methods = {
    // get,
    post
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};

