const request = require('supertest');
const app = require('../lib/app');

describe('to do', () => {
    it('returns hello world', () => {
        return request(app).get('/').then(res => {
            expect(res.text).toEqual('hello world');
        });
    });
});