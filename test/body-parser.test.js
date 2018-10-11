const bodyParser = require('../lib/body-parser');
const http = require('http');


describe('body parser', () => {
    let request;

    beforeEach(() => {
        request = new http.ClientRequest();
  
        request.method = 'POST';
        request.setHeader('Content-Type', 'text/html');
    });
     
    it('errors if content-type is not json', () => {
        request.setHeader('Content-Type', 'text/html');
        request.headers = { 'content-type': 'text/html' };
        const promise = bodyParser(request).catch(err => {
            expect(err).toEqual('Nu ugh NOT TODAY..Only JSON allowed');
        });
         
        request.emit('data', '<html></html>');
        request.emit('end');
         
        return promise;
    });
     
    it('parses a json request', () => {
        request.setHeader('Content-Type', 'application/json');
        request.headers = { 'content-type': 'application/json' };
        const promise = bodyParser(request).then(body => {
            expect(body).toEqual({ name: 'David' });
        });
        request.emit('data', '{ "name": "David" }');
        request.emit('end');
        return promise;
    });
});
