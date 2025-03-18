import express from "express"

const router = express.Router();

router.get('/', function (req, res){
    res.json({msg: 'hola mundo expres'})
});

router.get('/about_us', function(req, res){
    res.send('about us information')
});

export default router;