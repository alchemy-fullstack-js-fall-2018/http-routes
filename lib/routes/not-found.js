module.exports = (req, res) => {
    res.statusCode = 404;
    res.end('{"error":"The Magical Menagerie does not have what you seek."}');
};
