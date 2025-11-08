const { BookModel } = require("../model/book.model");

const insertBook = async (req, res) => {
    try {
        const data = req.body;
        const book = await BookModel.create(data);

        if (book)
            return res.status(201).json({ success: true, statusCode: 201, message: "Book Inserted Successfully", data: book });

        return res.status(500).json({ success: false, statusCode: 500, message: "Failed to insert book" });

    } catch (error) {
        return res.status(500).json({ success: false, statusCode: 500, message: "Internal Server Error" });
    }
}

const updateBookById = async (req, res) => {
    try {

    } catch (error) {

    }
}

const getBooks = async (req, res) => {
    try {
        const books = await BookModel.find({});
        return res.status(200).json({ success: true, statusCode: 200, message: "Books fetched successfully.", data: books });
    } catch (error) {
        return res.status(500).json({ success: false, statusCode: 500, message: "Internal Server Error" });
    }
}

const getBookById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, statusCode: 400, message: "Bad Request", errMessage: "Invalid input" })
        }

        const book = await BookModel.findOne({ _id: id });

        return res.status(200).json({ success: true, statusCode: 200, message: "Book fetched successfully.", data: book });

    } catch (error) {
        return res.status(500).json({ success: false, statusCode: 500, message: "Internal Server Error" });
    }
}

const deleteBookById = async (req, res) => {
    try {

    } catch (error) {
        console.log("")
    }
}


module.exports = { insertBook, deleteBookById, getBookById, getBooks, updateBookById };