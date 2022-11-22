const express = require ('express')
const colors = require ('colors')
const app = express()

require('dotenv').config()

const dbConfig = require ('./config/dbConfig');

app.use(express.json()) ;

const userRoute = require("./routes/userRoute");
app.use('/api/user', userRoute);

const lecturerRoute = require("./routes/lecturerRoute");
app.use('/api/lecturer', lecturerRoute);

const port = process.env.PORT || 5000


app.listen(port, () => console.log (`Node server has started listening on ${port}`))