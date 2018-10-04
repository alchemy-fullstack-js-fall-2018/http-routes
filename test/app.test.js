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
                expect(post.username).toEqual('Sally');
                expect(post.text).toEqual('posting up a storm');
            });
    });

    it('updates a blog post by id', () => {
        return request(app).post('/posts')
            .send({ username: 'Bob', text: 'needs to update his post' })
            .then(createRes => {
                const { id } = JSON.parse(createRes.text);
                return request(app).get(`/posts/${id}`);
            })
            .then(toUpdate => {
                const { id } = JSON.parse(toUpdate.text);
                return request(app).put(`/posts/${id}`)
                    .send({ text: 'updated his post' })
                    .then(updated => {
                        const post = JSON.parse(updated.text);
                        expect(post.username).toEqual('Bob');
                        expect(post.text).toEqual('updated his post');
                    });
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
