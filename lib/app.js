const { parse } = require('url');
// const bodyParser = require('./body-parser');
// const odms = require('./routes/odms');
// const notFound = require('./routes/not-found');

module.exports = (req, res) => {
    const url = parse(req.url);
    const parts = url.pathname.split('/').slice(1);

    res.setHeader('Content-Type', 'application/json');
};