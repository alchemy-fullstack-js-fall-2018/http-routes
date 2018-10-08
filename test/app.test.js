const request = require('supertest');
const app = require('../lib/app');
// const Farm = require('../models/Farm');


describe('pets that live on a farm', () => {

    it('create a pet', () => {
        return request(app).post('/petsRoute')
            .send({ name: 'porky', petType: 'little piglet' })
            .then(res => {
                const json = JSON.parse(res.text);
                expect(json.id).toEqual(expect.any(String));
                expect(json.name).toEqual('porky');
                expect(json.petType).toEqual('little piglet');
            });
    });

    it('gets a pet by id', () => {
        return request(app).post('/petsRoute')
            .send({ name: 'porky', petType: 'little piglet' })
            .then(createResponse => {   
                const { id } = JSON.parse(createResponse.text);
                return request(app).get(`/petsRoute/${id}`);
            })
            .then(getResponse => {
                const pet = JSON.parse(getResponse.text);
                expect(pet.id).toEqual(expect.any(String));
                expect(pet.name).toEqual('porky');
                expect(pet.petType).toEqual('little piglet');
            });
    });

    it('gets all pets', () => {
        return request(app).post('/petsRoute')
            .send({ name: 'porky', petType: 'little piglet' })
            .then(() => {
                return request(app).post('/petsRoute')
                    .send(
                        { 
                            name: 'monty', 
                            petType: 'python' 
                        });
            })
            .then(() => {
                return request(app).get('/petsRoute');
            })
            .then(res => {
                const array = JSON.parse(res.text);
                expect(array.length).toEqual(4);
            });
    });

    it('updates a pet name', () => {
        return request(app).post('/petsRoute')
            .send({ name: 'porky', petType: 'little piglet' })
            .then((res => {
                const { id } = res.body;
                return request(app).get(`/petsRoute'/${id}`);
            })
                .then(res => {
                    const { id } = res.body;
                    return request(app).put(`/petsRoute'/${id}`)
                        .send({ id: id, petType: 'tamone' })
                        .then(res => {
                            const json = res.body;
                            expect(json.name).toEqual('tamone');
                            expect(json.species).toEqual('little piglet');
                        });
                }));
    });       
    

    it('deletes an animal', () => {
        return request(app).post('/petsRoute')
            .send({ name: 'porky', petType: 'little piglet' })
            .then(res => {
                const { id } = JSON.parse(res.text);
                return request(app).get(`/petsRoute/${id}`);
            })
            .then(res => {
                const { id } = JSON.parse(res.text);
                return request(app).delete(`/petsRoute/${id}`);
            })
            .then(res => {
                const { removed } = JSON.parse(res.text);
                expect(removed).toEqual(true);
            });
    });    

    it('returns 404 when there is no method', () => {
        return request(app)
            .patch('/error')
            .send({})
            .then(res => {
                expect(res.statusCode).toEqual(404);
            });
    });

    it('returns 404 when there is no route or a bad route', () => {
        return request(app).post('/error').then(res => {
            expect(res.statusCode).toEqual(404);
        });
    });


});


