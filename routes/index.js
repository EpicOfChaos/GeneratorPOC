const Promise = require('bluebird')
const generator = require('./generator-service').instance
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/testGenerator/:val1/:val2', (req, res) => {
  Promise.coroutine(generator.generatorMethod)(req.params.val1, req.params.val2).then((result) => {
    console.log('result ' + result)
    res.send(result)
  }).catch((err) =>{
    console.log('Unexpected Error! ' + err)
    res.status(500)
    res.send(err)
  })
})

module.exports = router;
