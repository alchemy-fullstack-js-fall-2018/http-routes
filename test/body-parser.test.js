const bodyParser = require('../lib/body-parser');
const EventEmitter = require('events');

describe('body parser', () => {
    let request;
    beforeEach(() => {
        request = new EventEmitter;
        request.method = 'POST';
    });
    
    it('errors if content-type is not json', () => {
        request.headers = { 'content-type': 'text/html' };

        const promise = bodyParser(request).catch(err => {
            expect(err).toEqual('Only supports JSON');
        });
        
        request.emit('data', '<html></html>');
        request.emit('end');
        
        return promise;
    });
    
    it('parses a json request', () => {
        request.headers = { 'content-type': 'application/json' };

        const promise = bodyParser(request).then(body => {
            expect(body).toEqual({ name: 'ryan' });
        });

        request.emit('data', '{ "name": "ryan" }');
        request.emit('end');

        return promise;
    });
});
