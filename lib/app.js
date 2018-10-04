const { parse } = require('url');
const bodyParser = require('./body-parser');
const errorRoute = require('./error');
const petsRoute = require('./pets-route');

const routes = {
    petsRoute
    //this posts it//
};

module.exports = (req, res) => {
    const url = parse(req.url);
    const parts = url.pathname.split('/').slice(1);

    res.setHeader('Content-Type', 'application/json');

    const resource = parts[0];

    const route = routes[resource] || errorRoute;

    res.send = data => res.end(JSON.stringify(data));
    
    bodyParser(req)
        .then(body => {
            req.body = body;
            route(req, res);
        });
};

