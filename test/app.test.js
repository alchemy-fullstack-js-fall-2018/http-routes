const request = require('supertest');
const app = require('../lib/app');

describe('to do', () => {
    it('empty get returns hello world', () => {
        return request(app).get('/').then(res => {
            expect(res.text).toEqual('hello world');
        });
    });

    it('posts a to do', () => {
        return request(app).post('/toDoList')
            .send({ item: 'finish lab', due: '10/4' })
            .then(res => {
                const json = JSON.parse(res.text);
                console.log(json);
                expect(json.item).toEqual('finish lab');
                expect(json.due).toEqual('10/4');
                expect(json.id).toEqual(expect.any(String));
            });
    });
});