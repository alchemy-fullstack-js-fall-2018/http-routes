const request = require('supertest');
const app = require('../lib/app');

describe('pets that live on a farm', () => {

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
                expect(pet.name).toEqual(expect.any('porky'));
                expect(pet.petType).toEqual(expect.any('little piglet'));
            });
    });

    it('gets all pets', () => {
        return request(app).post('/petsRoute')
            .send({ name: 'porky', petType: 'little piglet' })
            .then(() => {
                return request(app).post('/petsRoute')
                    .send(
                        { 
                            name: 'ralph', 
                            petType: 'lion' 
                        }, 
                        { 
                            name: 'herb', 
                            petType: 'hamster' 
                        },
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
