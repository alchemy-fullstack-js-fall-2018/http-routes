module.exports = req => {
    return new Promise((resolve, reject) => {
        if(req.method === 'GET') return resolve();
        
        const headers = req.headers || req.getHeaders();
        if(headers['content-type'] !== 'application/json') {
            return resolve(null);
        }

        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
            resolve(JSON.parse(data));
        });
        req.on('error', (err) => {
            reject(err);
        });
    });
};
