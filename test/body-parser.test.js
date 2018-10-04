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

        const promise = bodyParser(request)
            .catch(err => {
                expect(err).toEqual('Sorry brah, body parser only supports JSON');
            });
        
        request.emit('data', '<html></html>');
        request.emit('end');
        
        return promise;
    });

    it('parses json request', () => {
        request.setHeader('Content-type', 'application/json');
        const promise = bodyParser(request)
            .then(body => {
                expect(body).toEqual({ name: 'Mike' });
            });
        request.emit('data', '{ "name": "Mike" }');
        request.emit('end');
        return promise;
    });


});
