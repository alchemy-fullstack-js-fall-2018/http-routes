const request = require('supertest');
const app = require('../lib/app');

describe('cartoon network', () => {
    let cartoon;
    beforeEach(() => {
        return request(app).post('/cartoons')
            .send({ name: 'Timmy Turner', text: 'Fairy Owner' })
            .then(res => {
                cartoon = JSON.parse(res.text);
            });
    });
    
    it('gets all cartoons', () => {
        return request(app).get('/cartoons').then(res => {
            expect(res.text).toEqual(JSON.stringify([cartoon]));
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
        return request(app).get(`/cartoons/${cartoon.id}`)
            .then(getRes => {
                const cartoon = JSON.parse(getRes.text);
                expect(cartoon.id).toEqual(expect.any(String));
                expect(cartoon.name).toEqual(expect.any(String));
                expect(cartoon.text).toEqual(expect.any(String));
            });
    });

    it('updates a cartoon', () => {
        return request(app).put(`/cartoons/${cartoon.id}`)
            .send({ text: 'Fairy Lover' })
            .then(res => {
                const expected = JSON.parse(res.text);
                expect(expected).toEqual({ id: cartoon.id, name: 'Timmy Turner', text: 'Fairy Lover' });
            });
    });

    it('deletes a cartoon', () => {
        return request(app).post('/cartoons')
            .send({ name: 'Timmy Turner', text: 'Fairy Owner' })
            .then(res => {
                const { id } = JSON.parse(res.text);
                return request(app).delete(`/cartoons/${id}`);
            })
            .then(res => {
                expect(JSON.parse(res.text)).toEqual({ removed: true });
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
