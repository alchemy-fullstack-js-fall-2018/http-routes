const request = require('supertest');
const bodyParser = require('../lib/body-parser');
const http = require('http');

describe('body parser', () => {
    let request;
    it.only('errors if content-type is not json', () => {
        request = new http.ClientRequest();
        request.method = 'POST';        
        request.setHeader('Content-Type', 'text/html')
        const promise = bodyParser(request)
            .catch(err => {
                expect(err).toEqual('Sorry brah, body parser only supports JSON');
            });
        request.emit('data', '<html></html>');
        request.emit('end');
        return promise;

    });
});
