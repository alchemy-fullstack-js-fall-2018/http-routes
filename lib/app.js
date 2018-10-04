
module.exports = (req, res) => {

    if(req.method === 'GET') {
        res.end('hello world');
    }

    res.end();
};
