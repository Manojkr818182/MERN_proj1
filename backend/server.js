require('dotenv').config();
require('./config/db_config');
const express = require('express');
const port = process.env.PORT || 7070;
const cors = require('cors');
const app = express();
const path = require('path');
const user_route = require('./src/routes/user_routes');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')),)

app.use('/api', user_route);
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})