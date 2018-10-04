const request = require('supertest');
const app = require('../lib/app');

describe('job board', () => {

    it('get all jobs', () => {
        return request(app).get('/jobs').then(res => {
            expect(res.text).toEqual('[]');
        });
    });

    it('gets a job by id', () => {
        return request(app).post('/jobs')
            .send({
                title: 'Head of Research',
                desc: 'Top secret stuff',
                salary: 10
            })
            .then(createRes => {
                const { id } = JSON.parse(createRes.text);
                return request(app).get(`/jobs/${id}`);
            })
            .then(getRes => {
                const job = JSON.parse(getRes.text);
                expect(job.id).toEqual(expect.any(String));
                expect(job.title).toEqual(expect.any(String));
                expect(job.desc).toEqual(expect.any(String));
                expect(job.salary).toEqual(expect.any(Number));
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

    it('updates a job posting', () => {

        return request(app).post('/jobs')
            .send({
                title: 'Head of Research',
                desc: 'Top secret stuff',
                salary: 10
            })
            .then(createRes => {
                const { id } = JSON.parse(createRes.text);
                return request(app).put(`/jobs/${id}`)
                    .send({
                        title: 'Janitor',
                        desc: 'There is nothing really special about it',
                        salary: 1
                    });
            })
            .then(res => {
                const json = JSON.parse(res.text);
                expect(json.title).toEqual('Janitor');
                expect(json.desc).toEqual('There is nothing really special about it');
                expect(json.salary).toEqual(1);
                expect(json.id).toEqual(expect.any(String));
            });


    });

    it('returns 404 when there is no method', () => {
        return request(app)
            .patch('/jobs')
            .send({})
            .then(res => {
                expect(res.statusCode).toEqual(404);
            });
    });

    it('returns 404 when there is no route', () => {
        return request(app).get('/money').then(res => {
            expect(res.statusCode).toEqual(404);
        });
    });

});
