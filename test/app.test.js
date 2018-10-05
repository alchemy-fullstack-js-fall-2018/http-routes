const request = require('supertest');
const app = require('../lib/app');
const ToDoList = require('../lib/models/ToDoList');

describe('to do', () => {
    const toDos = [
        { item: 'finish lab', due: '10/4' },
        { item: 'reading', due: '10/4' }
    ]
    
    let createdToDos;

    const creator = toDo => {
        return request(app).post('/toDoList')
            .send(toDo)
    }
 
    beforeEach(() => {
       return ToDoList.drop();
    });

    beforeEach(() => {
        return Promise.all(toDos.map(creator))
            .then(toDos => {
                createdToDos = toDos.map(toDo => JSON.parse(toDo.text));
                console.log('toDos', createdToDos);
            })
    });

    it('posts a to do', () => {
        expect(createdToDos[0].item).toEqual('finish lab');
        expect(createdToDos[0].due).toEqual('10/4');
        expect(createdToDos[0].id).toEqual(expect.any(String));
        expect(createdToDos[1].item).toEqual('reading');
        expect(createdToDos[1].due).toEqual('10/4');
        expect(createdToDos[1].id).toEqual(expect.any(String));
    });

    it('gets all of the to dos', () => {
        return request(app).get('/toDoList')
            .then(res => {
                expect(JSON.parse(res.text)).toEqual(createdToDos);
            })
    });

});