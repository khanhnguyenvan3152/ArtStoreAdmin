var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.loggedIn)
  {
    res.render('index', { title: 'Express' });
  }
  else
  {
    res.redirect('/auth');
  }
});

module.exports = router;
