const request = require('supertest');
const app = require('../lib/app');

describe('pets that live on a farm', () => {

    it('gets a pet by id', () => {
        return request(app).post(/pets.route)
    });
});
