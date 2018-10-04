const request = require('supertest');
const app = require('../lib/app');

describe('Mocking a CRUD Blog Post API', () => {

    it('creates a post', () => {
        return request(app).post('/posts')
            .send({ username: 'Ryan', text: 'Blog City' })
            .then(res => {
                const json = JSON.parse(res.text);
                expect(json.text).toEqual('Blog City');
                expect(json.username).toEqual('Ryan');
                expect(json.id).toEqual(expect.any(String));
            });
    });

    it('returns 404 when there is no method', () => {
        return request(app)
            .patch('/posts')
            .send({})
            .then(res => {
                expect(res.statusCode).toEqual(404);
            });
    });

    it('returns 404 when there is no route', () => {
        return request(app).get('/fakeroute').then(res => {
            expect(res.statusCode).toEqual(404);
        });
    });

});
