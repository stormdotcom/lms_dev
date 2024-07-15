const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
};

const notFoundHandler = (req, res, next) => {
    res.status(404);
    res.json({ message: 'Requested Resource not found.' });
    next()
};




module.exports = { errorHandler, notFoundHandler };
