const Rodents = require('../models/Rodents');
const notFound = require('./not-found');

const get = (req, res) => {

    const { id } = req;
    if(id) {
        const rodent = Rodents.get(id);
        if(rodent) res.send(rodent);
        else notFound(req, res);        
    }
    else {
        const rodents = Rodents.getAll();
        res.send(rodents);
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
    const { id } = req;
    Rodents.delete(id);
    res.send('deleted');
};

const drop = (req, res) => {
    Rodents.drop();
    res.send('rodents removed!');
};


const methods = {
    get,
    post,
    put,
    drop,
    delete: remove
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
