const Jobs = require('../models/Jobs');
const notFound = require('./not-found');

const get = (req, res) => {
    const { id } = req;
    if(id) {
        const job = Jobs.read(id);
        res.send(job);
        //res.end(JSON.stringify(job));
    } 
    else {
        const jobs = Jobs.readAll();
        res.send(jobs);
        //res.end(JSON.stringify(jobs));
    }
};

const post = (req, res) => {
    const data = req.body;
    const job = Jobs.write(data);
    res.send(job);
    // res.end(JSON.stringify(job));
};

const put = (req, res) => {
    const { id } = req;
    const data = req.body;
    const job = Jobs.modify(id, data);
    res.send(job);
    // res.end(JSON.stringify(job));
};

const remove = (req, res) => {
    const { id } = req;
    const job = Jobs.delete(id);
    res.send(job);
};



const methods = {
    get,
    post,
    put
};



module.exports = (req, res) => {
    console.log(req.method);
    if(req.method === 'DELETE') remove(req, res);
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
