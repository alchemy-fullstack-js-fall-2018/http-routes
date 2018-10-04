const Posts = require('../models/Posts');
const notFound = require('./not-found');

const get = (req, res) => {
    const { id } = req;
    if(id) {
        const post = Posts.get(id);
        res.send(post);
    } else {
        const posts = Posts.getAll();
        res.send(posts);
    }
};

const post = (req, res) => {
    const { username, text } = req.body;
    const post = Posts.create(username, text);
    res.send(post);
};

const methods = {
    get,
    post
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
