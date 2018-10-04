const request = require('supertest');
const app = require('../lib/app');
const { Zoo } = require('../lib/models/zoo');

describe('virtual zoo', () => {

    beforeEach(() => {
        Zoo.drop();
    });

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

    it('gets all animals', () => {
        return request(app).post('/animals')
            .send({ name: 'Ramone', species: 'Penguin' })
            .then(() => {
                return request(app).post('/animals')
                    .send({ name: 'Larry', species: 'Tiger' });
            })
            .then(() => {
                return request(app).get('/animals');
            })
            .then(res => {
                const arr = JSON.parse(res.text);
                expect(arr.length).toEqual(2);
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

    it('changes an animal', () => {
        return request(app).post('/animals')
            .send({ name: 'Ramone', species: 'Penguin' })
            .then(res => {
                const { id } = JSON.parse(res.text);
                return request(app).get(`/animals/${id}`);
            })
            .then(res => {
                const { id } = JSON.parse(res.text);
                return request(app).put(`/animals/${id}`)
                    .send({ id: id, name: 'Ralph' })
                    .then(res => {
                        const json = JSON.parse(res.text);
                        expect(json.name).toEqual('Ralph');
                        expect(json.species).toEqual('Penguin');
                    });
            });
    });

    it('deletes an animal', () => {
        return request(app).post('/animals')
            .send({ name: 'Ramone', species: 'Penguin' })
            .then(res => {
                const { id } = JSON.parse(res.text);
                return request(app).get(`/animals/${id}`);
            })
            .then(res => {
                const { id } = JSON.parse(res.text);
                return request(app).delete(`/animals/${id}`);
            })
            .then(res => {
                const { removed } = JSON.parse(res.text);
                expect(removed).toEqual(true);
            });
    });    
});
