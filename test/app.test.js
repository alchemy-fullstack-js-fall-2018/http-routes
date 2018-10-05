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
                expect(res.body).toEqual(createdToDos);
            })
    });

    it('gets toDo by id', () => {
        return request(app).get(`/toDoList/${createdToDos[0].id}`)
            .then(res => {
                expect(res.body).toEqual(createdToDos[0]);
            })
    });

    it('deletes toDo by id', () => {
        return request(app).delete(`/toDoList/${createdToDos[0].id}`)
            .then(() => request(app).get('/toDoList'))
            .then(res => {
                expect(res.body).toEqual([createdToDos[1]]);
            })
    });

    it('updates a toDo', () => {
        return request(app).put(`/toDoList/${createdToDos[0].id}`)
            .send({ item: 'finish pair lab', due: '10/8' })
            .then(res => {
                expect(res.body).toEqual({ item: 'finish pair lab', due: '10/8', id: createdToDos[0].id});
            });
    })

    it('returns 404 when there is no method', () => {
        return request(app).patch('/toDoList')
            .send({})
            .then(res => {
                expect(res.statusCode).toEqual(404);
            });
    });

    it('returns 404 when there is no route', () => {
        return request(app).get('/toEat').then(res => {
            expect(res.statusCode).toEqual(404);
        });
    });

});