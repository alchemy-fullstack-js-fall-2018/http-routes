const { parse } = require('url');
const bodyParser = require('./body-parser');
const creatureRoutes = require('./routes/creatures');
const notFound = require('./routes/not-found');

const routes = {
    creatures: creatureRoutes
};

module.exports = (req, res) => {
    const url = parse(req.url);
    const parts = url.pathname.split('/');

    res.setHeader('Content-Type', 'application/json');

    const resource = parts[1];

 
    const route = routes[resource] || notFound;
    req.id = parts[2];

    res.send = data => res.end(JSON.stringify(data));

    bodyParser(req).then(body => {
        req.body = body;
        route(req, res);
    });
};