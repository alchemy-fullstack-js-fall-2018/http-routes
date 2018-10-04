const  { parse } = require('url');
const bodyParser = require('./body-parser');
const animals = require('./routes/animals');

const routes = {
    animals
};

module.exports = (req, res) => {
    const url = parse(req.url);
    const parts = url.pathname.split('/').slice(1);
    const resource = parts[0];

    const route = routes[resource];
    
    req.id = parts[1];

    res.send = data => (res.end(JSON.stringify(data)));
    bodyParser(req)
        .then(body => {
            req.body = body;
            route(req, res);
        });

};

