const request = require('supertest');
const app = require('../lib/app');

describe('job board', () => {

    it('get all jobs', () => {
        return request(app).get('/jobs').then(res => {
            expect(res.text).toEqual('[]');
        });
    });

    it('creates a job posting', () => {


        return request(app).post('/jobs')
            .send({ 
                title: 'Head of Research',
                desc: 'Top secret stuff',
                salary: 10
            })
            .then(res => {
                const json = JSON.parse(res.text);
                expect(json.title).toEqual('Head of Research');
                expect(json.desc).toEqual('Top secret stuff');
                expect(json.salary).toEqual(10);
                expect(json.id).toEqual(expect.any(String));
            });
    });


});
