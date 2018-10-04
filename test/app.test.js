const request = require('supertest');
const app = require('../lib/app');

describe('hello world', () => {
    it('returns hello world', () => {
        return request(app).get('/').then(res => {
            expect(res.text).toEqual('hello world');
        });
    });
});
