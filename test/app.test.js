const request = require('supertest');
const app = require('../lib/app');

describe('twitter clone', () => {
    it('create a tweet', () => {
        return request(app).post('/tweets')
            .send({ username: 'me', text: 'my tweet' })
            .then(res => {
                const json = JSON.parse(res.text);
                expect(json.text).toEqual('my tweet');
                expect(json.username).toEqual('me');
                expect(json.id).toEqual(expect.any(String));
            });
    });
    it('get a tweet by id', () => {
        return request(app).post('/tweets')
            .send({ username: 'me', text: 'my tweet' })
            .then(createRes => {
                const { id } = JSON.parse(createRes.text);
                return request(app).get(`/tweets/${id}`);
            })
            .then(getRes => {
                const tweet = JSON.parse(getRes.text);
                expect(tweet.id).toEqual(expect.any(String));
                expect(tweet.username).toEqual(expect.any(String));
                expect(tweet.text).toEqual(expect.any(String));
            });
    });
});


