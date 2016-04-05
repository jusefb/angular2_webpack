var express = require('express');
var router = express.Router();
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/items', function(req, res, next) {
  var obj = JSON.parse(fs.readFileSync('public/ngRx/api/db.json', 'utf8'));
  res.json(obj.items);
});

// router.post('/items', function(req, res, next) {
//   var obj = JSON.parse(fs.readFileSync('public/ngRx/api/db.json', 'utf8'));
//   res.json(obj.items);
// });

module.exports = router;
