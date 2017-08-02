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
  request.url = request.url.replace(/%2c/gi, ',');
  console.log('Routing Edamam request for ' + request.url);
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

app.post('/users', function(request, response) {
  client.query(
    'INSERT INTO users(user_name) VALUES($1) ON CONFLICT DO NOTHING',
    [request.body.user_name],
    function(err) {
      if (err) console.error(err);
    }
  );
});

app.post('/saved_recipes', function(request, response) {
  client.query(
    'INSERT INTO saved_recipes(user_id,body,) VALUES($1,$2) ON CONFLICT DO NOTHING',
    [request.body.user_id,request.body.body],
    function(err) {
      if (err) console.error(err);
    }
  );
});

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
