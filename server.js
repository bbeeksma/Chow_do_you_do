const pg = require('pg');
const express = require('express');
//const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy');
const PORT = process.env.PORT || 3000;
const app = express();
const conString = process.env.DATABASE_URL;
const recipeApiId =  process.env.RECIPE_API_ID;
const recipeApiKey = process.env.RECIPE_API_KEY;

const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.error(err));

app.use(express.static('./public'));

function proxyEdamam(request, response){
  console.log('Routing Edamam request');
  console.log(request.url);
  request.url = request.url.replace(/%2c/gi, ',');
  console.log(request.url);
  (requestProxy({
    url: 'https://api.edamam.com/search'
    ,query: {
      app_id: recipeApiId
      ,app_key: recipeApiKey
    }
  }))(request, response);
}

app.get('/edamam/*', proxyEdamam);
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
      ,user_id INTEGER NOT NULL REFERENCES users(user_id)
      ,body TEXT NOT NULL
      ,created DATETIME DEFAULT NOW()
    );`
  );
}
