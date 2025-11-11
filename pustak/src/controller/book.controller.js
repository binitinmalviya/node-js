const { BookModel } = require("../model/book.model");

const insertBook = async (req, res) => {
    try {
        const { title,
            publisher,
            publishingDate,
            author,
            description,
            price } = req.body;
        const imageUrl = 'http://localhost:8000/uploads/' + req.file.filename

        const book = await BookModel.create({ title, publisher, publishingDate, author, price, description, imageUrl });

        if (book)
            return res.status(201).json({ success: true, statusCode: 201, message: "Book Inserted Successfully", data: book });

        return res.status(500).json({ success: false, statusCode: 500, message: "Failed to insert book" });

    } catch (error) {
        console.log('error ...', error)
        return res.status(500).json({ success: false, statusCode: 500, message: "Internal Server Error" });
    }
}

const updateBookById = async (req, res) => {
    try {
        const data = req.body;
        const { id } = req.params;
        const imageUrl = 'http://localhost:8000/uploads/' + req?.file?.filename
        const updateObject = { ...data, imageUrl };
        const book = await BookModel.findByIdAndUpdate(id, { $set: updateObject }, { new: true });

        if (book)
            return res.status(201).json({ success: true, statusCode: 201, message: "Book Updated Successfully", data: book });

    } catch (error) {
        console.log('error ...', error)
        return res.status(500).json({ success: false, statusCode: 500, message: "Internal Server Error" });
    }
}

const getBooks = async (req, res) => {
    try {
        const books = await BookModel.find({});
        return res.status(200).json({ success: true, statusCode: 200, message: "Books fetched successfully.", data: books });
    } catch (error) {
        console.log(error)
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
        const { id } = req.params;
        const book = await BookModel.deleteOne({ _id: id });
        if (book) {
            return res.status(200).json({ success: true, statusCode: 200, message: "Book deleted successfully.", date: book });
        }
    } catch (error) {
        console.log("ERROR", error)
    }
}

const getTrendingBooks = async (req, res) => {
    try {
        const books = await BookModel.find({ isTrending: true });

    } catch (error) {

    }
}


// coupon --- >
//  10 total ---- virtual -- total - 20100/-

module.exports = { insertBook, deleteBookById, getBookById, getBooks, updateBookById, getTrendingBooks };