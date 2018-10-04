const Jobs = require('../models/Jobs');

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



const methods = {
    get,
    post
};



module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()];
    method(req, res);
};
