import express from 'express';
import { join } from 'path';
import { router } from './router';

const server = express();

server.set('view engine', 'ejs');
server.set('views', join(__dirname, '..', 'templates'));

server.use('/build/public', express.static(join(__dirname, 'public')));
server.use('/static', express.static(join(__dirname, '..', 'static')));
server.use('/', router);

server.listen(3000, error => {
  if (error) console.log(err);
  else console.log('Listening at http://localhost:3000');
});
