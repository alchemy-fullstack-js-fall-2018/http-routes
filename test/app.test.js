const request = require('supertest');
const app = require('../lib/app');
const Tweets = require('../lib/models/Tweets');

const myTweets = [
    { username: 'me', text: 'hello this is my tweet' },
    { username: 'you', text: 'howdy this is your tweet' }
];

let createdTweets;

const creator = tweet => {
    return request(app).post('/tweets')
        .send(tweet);
};

beforeEach(() => {
    return Tweets.drop();
});

beforeEach(() => {
    return Promise.all(myTweets.map(creator))
        .then(myTweets => {
            createdTweets = myTweets.map(tweet => {
                return JSON.parse(tweet.text);
            });
        });
});

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

    it('updates to include new tweet', () => {
        return request(app).put(`/tweets/${createdTweets[1].id}`)
            .send({ username: 'me', text: 'hey! this is my new tweet' })
            .then(res => {
                expect(res.body).toEqual({ username: 'me', text: 'hey! this is my new tweet' });
            });

    });

    
    it('returns 404 when there is no method', () => {
        return request(app)
            .patch('/tweets')
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
    
    it('deletes a tweet by id', () => {
        return request(app).delete(`/tweets/${createdTweets[1].id}`)
            .then(() => request(app).get('/tweets'))
            .then(res => {
                expect(res.body).toEqual([createdTweets[0]]);
            });
    });  
});
