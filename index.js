import express from 'express';
import userRoutes from './routes/userRoutes.js';
import db from './config/db.js';

// create server
const app = express();

// enable data forms reading
app.use(express.urlencoded({extended: true}));

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

// define port and start proyect
const port = 3000;
app.listen(port, ()=> {
    console.log(`the server is running on the port ${port}`)
});