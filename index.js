import express from 'express'
import userRoutes from './routes/userRoutes.js'

// create server
const app = express();

// enable pug
app.set('view engine', 'pug');
app.set('views', './views');

// public static
app.use(express.static('public'));

// routing
app.use('/auth', userRoutes);

// define port and start proyect
const port = 3000;
app.listen(port, ()=> {
    console.log(`the server is running on the port ${port}`)
});