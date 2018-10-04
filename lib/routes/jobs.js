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

const methods = {
    get
};



module.exports = (req, res) => {
    // GET -> get
    const method = methods[req.method.toLowerCase()];
    method(req, res);
};
