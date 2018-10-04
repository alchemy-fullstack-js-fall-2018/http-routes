



module.exports = (req, res) => {


    new Promise((resolve, reject) => {
        return resolve();
    })
        .then(() => {
            res.end('[]');

        });
};

