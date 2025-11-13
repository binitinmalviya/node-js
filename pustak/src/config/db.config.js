const { default: mongoose } = require("mongoose")

const connectDB = async () => {
    try {
        const url = process.env.MONGODB_URL;
        const name = process.env.DATABASE_NAME;
        console.log(`[MONGODB] Database connecting ...`);
        const con = await mongoose.connect(`${url}${name}`)
        console.log(`[MONGODB] ${con.connection.host} & ${con.connection.name}`);
        console.log(`[MONGODB] Database connected ...`);
    } catch (error) {
        console.log(`[MONGODB] Database failed to connect ... ${error.message}`);
    }
}


module.exports = connectDB;