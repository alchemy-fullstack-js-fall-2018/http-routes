const Posts = require('../models/posts');
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

const put = (req, res) => {
    const { id } = req;
    const { text } = req.body;
    const update = Posts.update(id, text);
    res.send(update);
};

const del = (req, res) => {
    const { id } = req;
    Posts.delete(id);
    res.send({ deleted: true });
};

const methods = {
    get,
    post,
    put,
    delete: del
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
