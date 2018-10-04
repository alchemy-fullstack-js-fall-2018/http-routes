const request = require('supertest');
const app = require('../lib/app');
const Menagerie = require('../lib/models/Menagerie');

const createCreature = (creature) => {
    return request(app).post('/creatures')
        .send(creature);
};

let savedCreatures = [];

beforeEach(() => {
    Menagerie.drop();
});

beforeEach(() => {
    const creatureObjects = [
        { 'type':'unicorn', 'isMagical': true },
        { 'type':'hippogriff', 'isMagical': true },
        { 'type':'sphynx', 'isMagical': true }
    ];

    const creaturePromises = creatureObjects.map(createCreature);

    return Promise.all(creaturePromises).then(resultsOfAllCreaturePosts => {
        savedCreatures = resultsOfAllCreaturePosts
            .map(creatureResponse => JSON.parse(creatureResponse.text));
    });
});

describe('CRUD functions', () => {

    // it('gets a record by id', () => {
    //     return request(app).get(`/creatures/:${savedCreatures[0].id}`)
    //         .then(result => {
    //             const creature = JSON.parse(result.text);
    //             expect(creature).toEqual(savedCreatures[0]);
    //         });
    // });

    it('gets all records', () => {
        return request(app).get('/creatures')
            .then(results => {
                const array = JSON.parse(results.text);
                expect(array).toEqual(savedCreatures);
            });
    });

});



