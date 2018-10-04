module.exports = req => {
    return new Promise((resolve, reject) => {

        const headers = req.headers || req.getHeaders();
        if(headers['content-type'] !== 'application/json') {
            return reject('Only supports JSON');
        }

        return resolve();

    });
};
