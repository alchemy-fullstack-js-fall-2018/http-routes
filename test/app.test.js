const request = require('supertest');
const app = require('../lib/app');
const Rodents = require('../lib/models/Rodents');



describe('rodent manager', () => {
    
    const rodents = [
        { name: 'Rat', size: 'Small' },
        { name: 'Eurasian Beaver', size: 'Large' }
    ];

    let createdRodents;

    const creator = rodent => {
        return request(app).post('/rodents')
            .send(rodent);
    };

    beforeEach(() => {
        return Rodents.drop();
    });

    beforeEach(() => {
        return Promise.all(rodents.map(creator))
            .then(rodents => {
                createdRodents = rodents.map(rodent => JSON.parse(rodent.text));
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

    it('gets ALL rodents', () => {
        return request(app).get('/rodents')
            .then(res => {
                expect(res.body).toEqual(createdRodents);
            });

    })

    it.skip('updates a prop on a saved rodent', () => {
        const id = rat.id;
        rat.id = 'badID';
        rat.size = 'Large';
        return request(app).put(`/rodents/${id}`)
            .send(rat)
            .then(res => {
                const rodent = JSON.parse(res.text);
                expect(rodent).toEqual(rat);                
            });
    });

    it.skip('deletes a rodent by id', () => {
        return request(app).delete(`/rodents/${rat.id}`)
            .then(() => request(app).get('/rodents'))
    })
});
