import express from 'express'
import dotenv from 'dotenv';
import connectDB from './config/db.config.js';

dotenv.config();

const app = express();
const port = process.env.PORT;
console.log('[WELL-COME]', process.env.APPNAME);

app.use('/', (request, response, next) => {
    response.send('Well-come to book store server')
})


const startServer = () => {
    connectDB()
    app.listen(port, () => {
        console.log('Server running.....', port);
    })
}

startServer()
