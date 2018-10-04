const request = require('supertest');
const app = require('../lib/app');

describe('virtual zoo', () => {
    it('creates an animal', () => {

        return request(app).post('/animals')
            .send({ name: 'Ramone', species: 'Penguin' })
            .then(res => {
                const json = JSON.parse(res.text);
                expect(json.species).toEqual('Penguin');
                expect(json.name).toEqual('Ramone');
                expect(json.id).toEqual(expect.any(String));
            });
    });

    it('returns 404 when there is no route', () => {
        return request(app).post('/aminals')
            .send({ name: 'Ramone', species: 'Penguin' })
            .then(res => {
                expect(res.statusCode).toEqual(404);
            });
    });
});
