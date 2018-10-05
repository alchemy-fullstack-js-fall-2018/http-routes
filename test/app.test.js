const request = require('supertest');
const app = require('../lib/app');
const ToDoList = require('../lib/models/ToDoList');

describe('to do', () => {
    
    
    let toDo1;
    let toDo2;

    const creator = toDo => {
        return request(app).post('/toDoList')
            .send(toDo)
    }
 
    beforeEach(() => {
       return ToDoList.drop();
    });

    beforeEach(() => {
        return Promise.all([
            { item: 'finish lab', due: '10/4' },
            { item: 'reading', due: '10/4' }
        ].map(creator))
            .then(toDos => {
                console.log('toDos', JSON.parse(toDos[0].text));
                toDo1 = JSON.parse(toDos[0].text);
                toDo2 = JSON.parse(toDos[1].text);
            })
    });

    it('posts a to do', () => {
        console.log('test', toDo1);
        expect(toDo1.item).toEqual('finish lab');
        expect(toDo1.due).toEqual('10/4');
        expect(toDo1.id).toEqual(expect.any(String));
        expect(toDo2.item).toEqual('reading');
        expect(toDo2.due).toEqual('10/4');
        expect(toDo2.id).toEqual(expect.any(String));
    });

    // it('gets all of the to dos', () => {
    //     return request(app).get('/toDoList')
    //         .send({ item: 'finish lab', due: '10/4' })
    //         .send({ item: 'mongo db reading', due: '10/4' })
    //         .then(res => {
    //             expect(res.text).toEqual([{ item: 'finish lab', due: '10/4' }, { item: 'mongo db reading', due: '10/4' }]);
    //         })
    // });

});