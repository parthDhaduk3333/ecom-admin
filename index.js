import express from 'express';
import http from 'http';
import { APP_PORT, SESSION_SECRET } from './config';
import './config/db';
import errorHandler from './middleware/errorHandler';
import router from './routes';
import './middleware/passport';
import session from 'express-session';
import passport from 'passport';

const app = express();
const server = http.createServer(app);

app.use(session({
    name: "User",
    secret: SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie : {
        maxAge : 1000 * 60 * 60 * 24 * 365
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.use(express.static('./assets'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(router);

app.use(errorHandler);
server.listen(APP_PORT, () => {
    console.log(`Your Admin server is running on port ${APP_PORT}`);
});