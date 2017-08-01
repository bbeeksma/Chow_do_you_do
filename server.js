const pg = require('pg');
const express = require('express');
//const bodyParser = require('body-parser');
//const requestProxy = require('express-request-proxy');
const PORT = process.env.PORT || 3000;
const app = express();

const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.error(err));

app.use(express.static('./public'));

app.get('*', (request, response) => response.sendFile('index.html', {root: './public'}));
app.listen(PORT, ()=> console.log('express is listening on ' + PORT));

function createTables() {
  client.query(`
    CREATE TABLE IF NOT EXISTS
    users (
      user_id SERIAL PRIMARY KEY
      ,user_name VARCHAR(255) UNIQUE NOT NULL
    );`
  );
  client.query(`
    CREATE TABLE IF NOT EXISTS
    saved_recipes (
      saved_recipes_id SERIAL PRIMARY KEY
      ,user_id INTEGER NOT NULL REFERENCES authors(author_id)
      ,body TEXT NOT NULL
      ,created DATETIME DEFAULT NOW()
    );`
  );
}
