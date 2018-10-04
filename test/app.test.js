const request = require('supertest');
const app = require('../lib/app');


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
