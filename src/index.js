import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import requestId from 'express-request-id';
import expressValidator from 'express-validator';
import routes from './routes/index';
import Response from './helpers/response';

const app = express();

const port = process.env.PORT || 9000;

let response;

app.use(cors());

app.use(requestId());

app.use(expressValidator());

morgan.token('id', req => req.id);

const loggerFormat = ':id [:date[web]] ":method :url" :status :response-time';

app.use(morgan(loggerFormat, {
  skip: (req, res) => res.statusCode < 400, stream: process.stderr
}));

app.use(morgan(loggerFormat, {
  skip: (req, res) => res.statusCode >= 400, stream: process.stdout
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/', routes);

app.all('/', ((req, res) => {
  response = new Response(
    'ok',
    200,
    'Welcome to Authors Haven',
    {}
  );
  return res.status(response.code).json(response);
}));

app.all('/*', ((req, res) => {
  response = new Response(
    'ok',
    404,
    `Specified route does not exist ${req.originalUrl}`,
    {}
  );
  return res.status(response.code).json(response);
}));

app.listen(port, () => {
  console.log(`Authors Haven App is listening on port ${port}! `);
});

export default app;
