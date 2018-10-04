module.exports = req => {
    return new Promise((resolve, reject) => {

        const headers = req.headers || req.getHeaders();
        if(headers['content-type'] !== 'application/json') {
            return reject('Only supports JSON');
        }

        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
            resolve(JSON.parse(data));
        });
    });
};
