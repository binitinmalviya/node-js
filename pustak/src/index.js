const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db.config');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { userRoutes } = require('./routes/user.routes');
dotenv.config()
const app = express();
const port = process.env.PORT | 8000;

// ------------------------------
app.use(express.json());
app.use(cookieParser());
app.use(cors());
// -------------------------------

// health 
app.get('/', (req, res) => {
    return res.send('Server is running')
})
// routes

app.use('/api/users', userRoutes)

const startServer = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`[Server] Server is Starting`);
        console.log(`Server running http://localhost:${port}`);
    })
}

startServer();

