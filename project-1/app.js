const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const { userRoute } = require('./routes/users.router');
dotenv.config();
// create app instance 
const app = express();
app.use(express.json({ extended: true }));
app.use(cors())
app.use(cookieParser())
// end the config here 

// start routing of your application 

// http://localhost:8000/v1/api/


app.use('/', userRoute)


// listen a server on port
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`[Server] Server running on ${8000} port...`);
})