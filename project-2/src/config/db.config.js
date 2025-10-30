import mongoose from "mongoose"

const connectDB = async () => {
    try {
        console.log('[DATABASE] Mongodb connecting....');
        const con = await mongoose.connect("mongodb://localhost:27017/project-2")
        console.log("[HOSTNAME]", con.connection.host);
        console.log("[NAME]", con.connection.name);
        console.log('[DATABASE] Mongodb connected....');

    } catch (error) {
        console.log('[DATABASE] Mongodb connection failed....');

    }
}

export default connectDB;