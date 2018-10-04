const request = require('supertest');
const app = require('../lib/app');

describe('ocean dwelling mammals', () => {
    it('creates an ocean dwelling mammal', () => {
        return request(app).post('/odms')
            .send({ type: 'whale', size: 'large' })
            .then(res => {
                const json = JSON.parse(res.size);
                expect(json.size).toEqual('large');
                expect(json.type).toEqual('whale');
                expect(json.id).toEqual(expect.any(String));
            });
    });
});