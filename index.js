const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const connection = require('./database/database');

const Ask = require('./database/models/Ask');
const Reply = require('./database/models/Reply');

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
  const asks = await Ask.findAll({raw: true, order: [['id', 'desc']]});

  response.render('index', {
    asks,
  });
});

app.get('/ask', (request, response) => {
  return response.render('ask');
});

app.post('/create', async (request, response) => {
  const {title, ask} = request.body;

  await Ask.create({
    title,
    ask,
  });

  return response.redirect('/');
});

app.get('/ask/:id', async (request, response) => {
  const {id} = request.params;

  if (!id) return response.redirect('/');

  const ask = await Ask.findOne({
    where: {id},
    raw: true,
  });

  if (!ask) return response.redirect('/');

  const replies = await Reply.findAll({
    where: {ask_id: id},
    order: [['id', 'desc']],
    raw: true,
  });

  return response.render('askOne', {
    ask,
    replies,
  });
});

app.post('/reply/create', async (request, response) => {
  const {message, askId} = request.body;

  await Reply.create({
    message,
    ask_id: askId,
  });

  return response.redirect('/ask/' + askId);
});

app.listen(3000, error => {
  if (error) {
    console.log(error.message);
  } else {
    console.log('Server running on port 3000');
  }
});
