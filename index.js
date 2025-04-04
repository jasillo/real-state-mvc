import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import propertiesRoutes from './routes/propertiesRoutes.js';
import db from './config/db.js';

// create server
const app = express();

// enable data forms reading
app.use(express.urlencoded({extended: true}));

// enable cookie parser and CSRF
app.use(cookieParser());
app.use(csrf({cookie: true}));

// db connection
try {
    await db.authenticate();
    db.sync();
    console.log("successfull DB conection")
} catch (error) {
    console.log(error)
}

// enable pug
app.set('view engine', 'pug');
app.set('views', './views');

// public static
app.use(express.static('public'));
app.use(express.static('build'));

// routing
app.use('/auth', userRoutes);
app.use('/', propertiesRoutes);

// define port and start proyect
const port = process.env.PORT;
app.listen(port, ()=> {
    console.log(`the server is running on the port ${port}`)
});