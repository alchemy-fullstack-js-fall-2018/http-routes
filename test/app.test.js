const request = require('supertest');
const app = require('../lib/app');

describe('ocean dwelling mammals', () => {
    let smallWhale = { type: 'whale', size: 'small' };
    let largeWhale = { type: 'whale', size: 'large' };
    
    beforeAll(() => {
        return request(app).post('/odms')
            .send(smallWhale)
            .then(res => {
                smallWhale = JSON.parse(res.text);
            });
    });
    
    it('creates an ocean dwelling mammal', () => {
        return request(app).post('/odms')
            .send(largeWhale)
            .then(res => {
                console.log('res', res.text);
                const json = JSON.parse(res.text);
                expect(json.size).toEqual('large');
                expect(json.type).toEqual('whale');
                expect(json.id).toEqual(expect.any(String));
                largeWhale = json;
            });
    });
    
    it('gets all odms', () => {
        return request(app).get('/odms').then(res => {
            const json = JSON.parse(res.text);
            expect(json).toEqual([smallWhale, largeWhale]);
        });
    });
});