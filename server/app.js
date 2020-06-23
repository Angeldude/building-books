const express = require('express');
const next = require('next');
const mongoose = require('mongoose');

const dev = process.env.NODE_ENV !== 'production';
const MONGO_URL = process.env.MONGO_URL_TEST;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGO_URL, options);

const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 8000;
const ROOT_URL = `http://localhost:${port}`;

app.prepare().then(() => {
  const server = express();

  server.get('/', (req, res) => {
    const user = {email: 'angel@example.com'}
    app.render(req, res, '/', { user })
  });

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${ROOT_URL}`); // eslint-disable-line no-console
  });
});
