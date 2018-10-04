module.exports = req => {
    return new Promise((resolve, reject) => {
        if(req.method === 'GET') return resolve();

        const headers = req.headers || req.getHeaders();
        if(headers['content-type'] !== 'application/json') {
            return reject('Sorry brah, body parser only supports JSON');
        }
    });
};
