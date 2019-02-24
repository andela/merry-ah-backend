import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import dotenv from 'dotenv';
import session from 'express-session';
import morgan from 'morgan';
import requestId from 'express-request-id';
import expressValidator from 'express-validator';
import http from 'http';
import SocketIO from 'socket.io';
import routes from './routes/index';
import Response from './helpers/response';
import imageValidator from './middlewares/imageValidator';

dotenv.config();
const app = express();

const server = http.createServer(app);
const io = new SocketIO(server);
const port = process.env.PORT || 9000;

io.on('connection', (socket) => {
  socket.on('ping socket', (msg) => {
    io.emit('ping socket', msg);
  });
});

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

app.use(cors());

app.use(requestId());

app.use(expressValidator(imageValidator));

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
/**
 * @swagger
 * /:
 *  get:
 *    summary: Author's Haven root endpoint
 *    description: Returns a welcome message
 *    responses:
 *      200:
 *        description: Welcome to Authors Haven
 *        schema:
 *          type: string
 *          default: "Test Successful"
 */
app.all('/', ((req, res) => {
  const response = new Response(
    'Ok',
    200,
    'Welcome to Authors Haven',
    {}
  );
  return res.status(response.code).json(response);
}));

app.all('/*', ((req, res) => {
  const response = new Response(
    'Not Found',
    404,
    `Specified route does not exist ${req.originalUrl}`,
    {}
  );
  return res.status(response.code).json(response);
}));

server.listen(port, () => {
  console.log(`Authors Haven App is listening on port ${port}! `);
});

export { app, io };
