const Cartoons = require('../models/Cartoons');
const notFound = require('./not-found');

const get = (req, res) => {
    const { id } = req;
    if(id) {
        const cartoon = Cartoons.get(id);
        res.send(cartoon);
        //res.end(JSON.stringify(tweet));
    } else {
        const cartoons = Cartoons.getAll();
        res.send(cartoons);
        //res.end(JSON.stringify(tweets));
    }
};

const post = (req, res) => {
    const { name, text } = req.body;
    const cartoon = Cartoons.create(name, text);
    res.send(cartoon);
    //res.end(JSON.stringify(tweet));
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
