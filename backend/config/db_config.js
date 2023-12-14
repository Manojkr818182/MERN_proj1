require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`, {}
).then((conn) => {
    // console.log("conn", conn);
    console.log("Connected to DB")
}).catch((err) => {
    // console.log(err.toString());
    console.log('Failed to connect');
})