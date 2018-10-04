const request = require('supertest');
const app = require('../lib/app');

// describe('virtual zoo', () => {
//     it('creates an animal', () => {

//         return request(app).post('/animals')
//             .send({ name: 'Ramone', species: 'Penguin' })
//             .then(res => {
//                 expect(res.id).toEqual(expect.any(String));
//             });
//     });
// });
