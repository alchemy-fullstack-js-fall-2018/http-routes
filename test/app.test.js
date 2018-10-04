const request = require('supertest');
const app = require('../lib/app');



describe('rodent manager', () => {
    
    beforeEach(()=> {
        return request(app).post('/rodents')
            .send({ name: 'Rat', size: 'Small' });
    });
    
    it('creates a rodent', () => {
        return request(app).post('/rodents')
            .send({ name: 'Mouse', size: 'Small' })
            .then(res => {
                const json = JSON.parse(res.text);
                expect(json.id).toEqual(expect.any(String));
            });
    });

    it('gets a rodent by its id', () => {
        return request(app).post('/rodents')
            .send({ name: 'Chinchilla', size: 'Medium' })
            .then(createRes => {
                const { id } = JSON.parse(createRes.text);
                return request(app).get(`/rodents/${id}`);
            })
            .then(getRes => {
                const rodent = JSON.parse(getRes.text);
                expect(rodent.id).toEqual(expect.any(String));
                expect(rodent.name).toEqual(expect.any(String));
                expect(rodent.size).toEqual(expect.any(String));
            });

    });
});
