const request = require('supertest');
const app = require('../lib/app');

describe('job board', () => {

    it('get all jobs', () => {

        return request(app).get('/jobs').then(res => {
            expect(res.text).toEqual('[]');
        });
    });


});
