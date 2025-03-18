import express from 'express'
import router from './routes/user-routes.js'

// create server
const app = express();
app.use('/', router);
app.set('view engine', 'pug');
app.set('views', './views');

// define port and start proyect
const port = 3000;
app.listen(port, ()=> {
    console.log(`the server is running on the port ${port}`)
});