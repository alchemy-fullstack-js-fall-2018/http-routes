const  { parse } = require('url');
const bodyParser = require('./body-parser');



module.exports = (req, res) => {
    const url = parse(req.url);
    const parts = url.pathname.split('/').slice(1);
    const resource = parts[0];

    res.end(JSON.stringify(url));

    bodyParser(req)
        .then(body => {
            req.body = body;
            route(req, res);
        })

};

