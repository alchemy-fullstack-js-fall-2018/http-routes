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
});
