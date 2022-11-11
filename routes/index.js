var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/admin/login');
});

// router.get('/login', AdminController.viewLogin);
// router.post('/login', AdminController.actionLogin);

module.exports = router;
