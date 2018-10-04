const request = require('supertest');
const app = require('../lib/app');

// describe('hello world', () => {
//     it('returns hello world', () => {
//         return request(app).get('/').then(res => {
//             expect(res.text).toEqual('hello world');
//         });
//     });
// });

describe('save', () => {
    it('saves a record', () => {
        return request(app).post('/creatures')
            .send({ type: 'unicorn', isMagical: true })
            .then(resultOfPost => {
                const { id } = JSON.parse(resultOfPost.text);
                expect(id).toContain(expect.any(String));
            });
    });
});


