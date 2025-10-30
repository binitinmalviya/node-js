const { default: mongoose } = require("mongoose")

const connectDB = async () => {
    try {
        console.log('Mongodb Connecting');
        await mongoose.connect("mongodb://localhost:27017/project-1")
        console.log('Mongodb Connected');
    } catch (error) {
        console.log("Mongodb connection failed", error.message);
    }
}


module.exports = { connectDB }