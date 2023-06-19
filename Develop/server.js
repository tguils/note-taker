//asking app to listen on port 3306 -in the terminal it should say now listening on port... if it worked correctly 
//https://www.npmjs.com/package/dotenv dotenv is a great way to keep important items like passwords or api keys safe for
const PORT = process.env.PORT || 3306;
// https: //expressjs.com/en/starter/hello-world.html
//make sure you have express installed npm install express --save
const express = require('express');
const app = express();

//https: //www.npmjs.com/package/nodemon
const fs = require('fs');
const path = require('path');

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));
app.use(express.json());


app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

