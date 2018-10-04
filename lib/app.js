
const { parse } = require('url');
const bodyParser = require('./body-parser');
const jobs = require('./routes/jobs');

const routes = {
    jobs,
    // posts
};

module.exports = (req, res) => {
    const url = parse(req.url);
    const parts = url.pathname.split('/').slice(1);

    res.setHeader('Content-Type', 'application/json');

    // /jobs/:id -> jobs
    const resource = parts[0];

    // routes.jobs
    const route = routes[resource];
    req.id = parts[1];

    res.send = data => res.end(JSON.stringify(data));

    bodyParser(req).then(body => {
        req.body = body;
        route(req, res);
    });
};

