//const pg = require('pg');
const express = require('express');
//const bodyParser = require('body-parser');
//const requestProxy = require('express-request-proxy');
const PORT = process.env.PORT || 3000;
const app = express();

const conString = process.env.DATABASE_URL;

app.use(express.static('./public'));

app.get('*', (request, response) => response.sendFile('index.html', {root: './public'}));
app.listen(PORT, ()=> console.log('express is listening on ' + PORT));
