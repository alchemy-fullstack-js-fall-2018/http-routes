const request = require('supertest');
const app = require('../lib/app');

describe('to do', () => {

    it('posts a to do', () => {
        return request(app).post('/toDoList')
            .send({ item: 'finish lab', due: '10/4' })
            .then(res => {
                console.log('res.text', res.text);
                const json = JSON.parse(res.text);
                console.log('json', json);
                expect(json.item).toEqual('finish lab');
                expect(json.due).toEqual('10/4');
                expect(json.id).toEqual(expect.any(String));
            });
    });
});