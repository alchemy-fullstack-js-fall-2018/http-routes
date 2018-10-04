const request = require('supertest');
const app = require('../lib/app');

describe('Mocking a CRUD Blog Post API', () => {

    it('gets all posts, should return empty', () => {
        return request(app).get('/posts').then(res => {
            expect(res.text).toEqual('[]');
        });
    });
    
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
    
    it('get a post by id', () => {
        return request(app).post('/posts')
            .send({ username: 'Sally', text: 'posting up a storm' })
            .then(createRes => {
                const { id } = JSON.parse(createRes.text);
                return request(app).get(`/posts/${id}`);
            })
            .then(getRes => {
                const post = JSON.parse(getRes.text);
                expect(post.id).toEqual(expect.any(String));
                expect(post.username).toEqual(expect.any(String));
                expect(post.text).toEqual(expect.any(String));
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
