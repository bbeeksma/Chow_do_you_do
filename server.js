const pg = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy');
const PORT = process.env.PORT || 3000;
const app = express();
const conString = process.env.DATABASE_URL;
const recipeApiId =  process.env.RECIPE_API_ID;
const recipeApiKey = process.env.RECIPE_API_KEY;

const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

function proxyEdamam(request, response){
  request.url = request.url.replace(/%2c/gi, ','); //HACK: This replaces the url encoded comma %2C with an unencoded comma because the API we are using doesn't recognise the %2C
  console.log('Routing Edamam request for ' + request.url);
  (requestProxy({
    url: 'https://api.edamam.com/search'
    ,query: {
      app_id: recipeApiId
      ,app_key: recipeApiKey
      ,from: 0
      ,to: 30
    }
  }))(request, response);
}

app.get('/saved_recipes/:user_name', function(request,response){
  client.query(
    `SELECT body
    FROM saved_recipes s
    JOIN users u
    ON s.user_id = u.user_id
    WHERE u.user_name = $1`,
    [request.params.user_name]
  ).then(result => {
    response.send(result.rows);
  });
});

app.get('/users/:user_name', function(request,response){
  console.log(request.params);
  client.query(
    `SELECT user_id
    FROM users
    WHERE user_name = $1;`,
    [request.params.user_name]
  ).then(result => {
    response.send(result.rows);
  });
});

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
    `INSERT INTO saved_recipes
      (user_id, body)
    SELECT
      $1
      ,$2
    WHERE $2 NOT IN (SELECT body FROM saved_recipes WHERE user_id = $1)
    ON CONFLICT DO NOTHING`,
    [request.body.user_id,request.body.body],
    function(err) {
      if (err) console.error(err);
    }
  );
});

app.delete('/delete_saved_recipes/', (request, response) => {
  console.log(request.body);
  client.query(
    `DELETE FROM saved_recipes WHERE user_id = $1 AND body = $2;`,
    [request.body.user_id, request.body.body]
  )
    .then(() => response.send('Delete complete'))
    .catch(console.error);
});

app.delete('/saved_recipes_by_user/:user_id', (request, response) => {
  client.query(
    `DELETE FROM saved_recipes WHERE user_id=$1;`,
    [request.params.user_id]
  )
    .then(() => response.send('Delete complete'))
    .catch(console.error);
});

app.delete('/users/:user_id', (request, response) => {
  client.query(
      `DELETE FROM saved_recipes WHERE user_id=$1;`,
      [request.params.user_id]
    )
      .then(() => response.send('Delete complete'))
      .catch(console.error);
  client.query(
    `DELETE FROM users WHERE user_id=$1;`,
    [request.params.user_id]
  )
    .then(() => response.send('Delete complete'))
    .catch(console.error);
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
      ,created DATE DEFAULT NOW()
    );`
  );
}

createTables();
