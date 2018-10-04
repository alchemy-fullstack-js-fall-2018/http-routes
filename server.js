const app = require('app');
const http = require('http');

const server = http.createServer(app);

const PORT = 1234;

server.listen(PORT, () => {
    console.log('server humming along on', server.address().port);
});
