const bookValidations = (req, res, next) => {

    const {
        title,
        publisher,
        publishingDate,
        author,
        description,
        price } = req.body;

    if (!title ||
        !publisher ||
        !publishingDate ||
        !author ||
        !description ||
        !price)
        return res.status(400).json({ success: false, statusCode: 400, message: "Bad Request", errMessage: "Invalid input" })

    if (!req.file.filename) {

    }


    return next()

}

module.exports = { bookValidations }