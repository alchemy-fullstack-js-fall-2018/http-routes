const request = require('supertest');
const app = require('../lib/app');

describe('virtual zoo', () => {

    it('gets an animal by id', () => {
        return request(app).post('/animals')
            .send({ name: 'Ramone', species: 'Penguin' })
            .then(createRes => {
                const { id } = JSON.parse(createRes.text);
                return request(app).get(`/animals/${id}`);
            })
            .then(getRes => {
                const animal = JSON.parse(getRes.text);
                expect(animal.species).toEqual('Penguin');
                expect(animal.name).toEqual('Ramone');
                expect(animal.id).toEqual(expect.any(String));
            });
    });

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

    it('returns 404 when there is no method', () => {
        return request(app)
            .patch('/animals')
            .send({})
            .then(res => {
                expect(res.statusCode).toEqual(404);
            });
    });

    it('returns 404 when there is a bad route', () => {
        return request(app).post('/aminals')
            .send({ name: 'Ramone', species: 'Penguin' })
            .then(res => {
                expect(res.statusCode).toEqual(404);
            });
    });
});
