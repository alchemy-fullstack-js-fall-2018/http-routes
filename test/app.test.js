const request = require('supertest');
const app = require('../lib/app');

describe('rodent manager', () => {
    it('creates a rodent', () => {
        return request(app).post('/rodents')
            .send({ name: 'Mouse', size: 'Small' })
            .then(res => {
                const json = JSON.parse(res.text);
                expect(json.size).toEqual('Small');
                expect(json.name).toEqual('Mouse');
                expect(json.id).toEqual(expect.any(String));
            });
    });
});
