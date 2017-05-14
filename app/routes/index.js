var express = require('express');
var passport = require('passport');

var router = express.Router();

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
	res.render('index', {
  		title: 'CAME'});
});

router.get('/login', function(req, res, next) {
	res.render('login', {
  		title: 'CAME'});
});

router.get('/signup', function(req, res, next) {
	res.render('signup', {
  		title: 'CAME'});
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}


module.exports = router;
