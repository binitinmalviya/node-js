const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const userRoutes = require('./routes/user.routes');
const bookRoutes = require('./routes/book.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
dotenv.config()
const app = express();
const port = process.env.PORT || 8000;

// ------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
// serve uploaded files statically from /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// -------------------------------

// health 
app.get('/', (req, res) => {
    return res.send('Server is running')
})

// routes

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

const startServer = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`[Server] Server is Starting`);
        console.log(`Server running http://localhost:${port}`);
    })
}

startServer();



//  nitin.png ---- > http://localhost:8000/uploads/nitin.png  - Zero to one 