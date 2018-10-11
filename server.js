/* eslint no-console: off */

const app = require('./lib/app');
const http = require('http');

// curl 'http://localhost:2233/hi' -d '{ "name": "david" }'
const server = http.createServer(app);

const PORT = 2233;

server.listen(PORT, () => {
    console.log('server running on', server.address().port);
});
