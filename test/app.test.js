const request = require('supertest');
const app = require('../lib/app');

describe('cartoon network', () => {
    it('gets all cartoons', () => {
        return request(app).get('/cartoons').then(res => {
            expect(res.text).toEqual('[]');
        });
    });

    it('create a cartoon', () => {
        return request(app).post('/cartoons')
            .send({ name: 'Timmy Turner', text: 'Fairy Owner' })
            .then(res => {
                const json = JSON.parse(res.text);
                expect(json.text).toEqual('Fairy Owner');
                expect(json.name).toEqual('Timmy Turner');
                expect(json.id).toEqual(expect.any(String));
            });
    });

    it('get a cartoon by id', () => {
        return request(app).post('/cartoons')
            .send({ username: 'Timmy Turner', text: 'Fairy Owner' })
            .then(createRes => {
                const { id } = JSON.parse(createRes.text);
                return request(app).get(`/cartoons/${id}`);
            })
            .then(getRes => {
                const cartoon = JSON.parse(getRes.text);
                expect(cartoon.id).toEqual(expect.any(String));
                expect(cartoon.name).toEqual(expect.any(String));
                expect(cartoon.text).toEqual(expect.any(String));
            });
    });

    it('returns 404 when there is no method', () => {
        return request(app)
            .patch('/cartoons')
            .send({})
            .then(res => {
                expect(res.statusCode).toEqual(404);
            });
    });

    it('returns 404 when there is no route', () => {
        return request(app).get('/quarks').then(res => {
            expect(res.statusCode).toEqual(404);
        });
    });
});
