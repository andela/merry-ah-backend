import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import dotenv from 'dotenv';
import session from 'express-session';
import morgan from 'morgan';
import requestId from 'express-request-id';
import routes from './routes/index';
import Response from './helpers/response';

dotenv.config();
const app = express();
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
const port = process.env.PORT || 9000;

let response;

app.use(cors());

app.use(requestId());

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
