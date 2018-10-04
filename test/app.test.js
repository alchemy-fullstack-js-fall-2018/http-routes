const request = require('supertest');
const app = require('../lib/app');



describe('rodent manager', () => {
    
    let rat = { name: 'Rat', size: 'Small' };

    beforeEach(()=> {
        return request(app).post('/rodents')
            .send(rat)
            .then(res => {
                rat = JSON.parse(res.text);
            });
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
            .send({ name: 'Chinchilla', size: 'Small' })
            .then(createRes => {
                const { id } = JSON.parse(createRes.text);
                return request(app).get(`/rodents/${id}`);
            })
            .then(getRes => {
                const rodent = JSON.parse(getRes.text);
                expect(rodent.id).toEqual(expect.any(String));
                expect(rodent.name).toEqual('Chinchilla');
                expect(rodent.size).toEqual('Small');
            });
    });

    it('updates a prop on a saved rodent', () => {
        rat.size = 'Large';
        return request(app).put(`/rodents/${rat.id}`)
            .send(rat)
            .then(res => {
                const rodent = JSON.parse(res.text);
                expect(rodent).toEqual(rat);                
            });
    });
});
