const request = require('supertest');
const app = require('../lib/app');

describe('to do', () => {

    it('posts a to do', () => {
        return request(app).post('/toDoList')
            .send({ item: 'finish lab', due: '10/4' })
            .then(res => {
                const json = JSON.parse(res.text);
                expect(json.item).toEqual('finish lab');
                expect(json.due).toEqual('10/4');
                expect(json.id).toEqual(expect.any(String));
            });
    });

    it('gets all of the to dos', () => {
        return request(app).get('/toDoList')
            .send({ item: 'finish lab', due: '10/4' })
            .send({ item: 'mongo db reading', due: '10/4' })
            .then(res => {
                expect(res.text).toEqual([{ item: 'finish lab', due: '10/4' }, { item: 'mongo db reading', due: '10/4' }]);
            })
    });

    it('drop deletes all items in ToDoList', () => {
        return request(app).drop('/toDoList', (res) => {
            expect(res.text).toEqual([]);
        });
    });
});