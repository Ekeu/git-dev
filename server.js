const express = require('express');
const http = require('http');
const next = require('next');
const dotenv = require('dotenv');
const colors = require('colors');
const dbConnect = require('./utils/db/db-connect');

dotenv.config();

dbConnect();

const app = express();
const server = http.createServer(app);

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const nextApp = next({ dev, hostname, port });
const handle = nextApp.getRequestHandler();

app.use(express.json());

nextApp.prepare().then(() => {
  app.all('*', (req, res) => handle(req, res));

  server.listen(port, (error) => {
    if (error) throw error;
    console.log(
      `> Custom server ready on http://${hostname}:${port}`.yellow.bold
    );
  });
});
