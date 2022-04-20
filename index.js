const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const connection = require('./database/database');

const Ask = require('./database/models/Ask');

connection
  .authenticate()
  .then(() => {
    console.log('Connection mysql success');
  })
  .catch(() => {
    console.log('Connection mysql failed');
  });

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', async (request, response) => {
  const asks = await Ask.findAll({raw: true});

  console.log(asks);

  response.render('index', {
    asks,
  });
});

app.get('/ask', (request, response) => {
  response.render('ask');
});

app.post('/create', (request, response) => {
  const {title, ask} = request.body;

  Ask.create({
    title,
    ask,
  }).then(() => {
    response.redirect('/');
  });
});

app.listen(3000, error => {
  if (error) {
    console.log(error.message);
  } else {
    console.log('Server running on port 3000');
  }
});
