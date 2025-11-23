const { BookModel } = require("../model/book.model");

const insertBook = async (req, res) => {
    try {
        const { title, publisher, publishingDate, author, description, price } = req.body;
        const imageUrl = 'http://localhost:8000/uploads/' + req.file.filename;

        const book = await BookModel.create({ title, publisher, publishingDate, author, price, description, imageUrl });
        if (book) return res.status(201).json({ success: true, statusCode: 201, message: "Book Inserted Successfully", data: book });

        return res.status(500).json({ success: false, statusCode: 500, message: "Failed to insert book" });

    } catch (error) {
        return res.status(500).json({ success: false, statusCode: 500, message: "Internal Server Error" });
    }
};

const updateBookById = async (req, res) => {
    try {

        const data = req.body;
        const { id } = req.params;
        const imageUrl = req?.file?.filename ? 'http://localhost:8000/uploads/' + req.file.filename : undefined;

        const updateObject = imageUrl ? { ...data, imageUrl } : data;

        const book = await BookModel.findByIdAndUpdate(id, { $set: updateObject }, { new: true });
        if (book) return res.status(201).json({ success: true, statusCode: 201, message: "Book Updated Successfully", data: book });

        return res.status(404).json({ success: false, statusCode: 404, message: "Book not found" });

    } catch (error) {
        console.log("error", error)
        return res.status(500).json({ success: false, statusCode: 500, message: "Internal Server Error" });
    }
};

const getBooks = async (req, res) => {
    try {

        const books = await BookModel.find({});
        return res.status(200).json({ success: true, statusCode: 200, message: "Books fetched successfully.", data: books });
    } catch (error) {
        console.log("error", error)
        return res.status(500).json({ success: false, statusCode: 500, message: "Internal Server Error" });
    }
};

const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await BookModel.findById(id);
        return res.status(200).json({ success: true, statusCode: 200, message: "Book fetched successfully.", data: book });
    } catch (error) {
        console.log("error", error)
        return res.status(500).json({ success: false, statusCode: 500, message: "Internal Server Error" });
    }
};

const deleteBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await BookModel.deleteOne({ _id: id });

        if (book) return res.status(200).json({ success: true, statusCode: 200, message: "Book deleted successfully.", data: book });

        return res.status(404).json({ success: false, statusCode: 404, message: "Book not found" });

    } catch (error) {
        console.log("error", error)
        return res.status(500).json({ success: false, statusCode: 500, message: "Internal Server Error" });
    }
};

const getTrendingBooks = async (req, res) => {
    try {
        const books = await BookModel.find({ isTrending: true });
        return res.status(200).json({ success: true, statusCode: 200, message: "Trending books fetched successfully.", data: books });
    } catch (error) {
        console.log("error", error)
        return res.status(500).json({ success: false, statusCode: 500, message: "Internal Server Error" });
    }
};

const searchBook = async (req, res) => {
    try {
        // search?price=200
        // { price, title, category, isTranding }
        // res --- 
        // /api/product/search?abc=moto60fusion&ram=12gb&rom=256gb
        // 8gb , 12, 250 , 128 
        // regex pattern
        const { searchTerm } = req.query;
        const regex = new RegExp(searchTerm, "i");
        const books = await BookModel.find({
            $or: [
                { title: { $regex: regex } },
                { author: { $regex: regex } },
                { category: { $regex: regex } },
                { description: { $regex: regex } }
            ]
        });




        // search -- book 
        // search author -- book author

        // search 
        // author --

        console.log("searchTerm", searchTerm)
        return res.status(200).json({ success: true, statusCode: 200, message: "Trending books fetched successfully.", data: books });


    } catch (error) {
        console.log("error", error)
        return res.status(500).json({ success: false, statusCode: 500, message: "Internal Server Error" });
    }
}

module.exports = { insertBook, deleteBookById, getBookById, getBooks, updateBookById, getTrendingBooks, searchBook };
