var express = require('express');
var passport = require('passport');

var router = express.Router();

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
	res.render('index', {
  		title: 'CAME',
			side: { door: true }
		});
});

router.get('/support', isLoggedIn, function(req, res, next) {
	res.render('support', {
  		title: 'CAME',
			side: { support: true }
		});
});

router.get('/reports', isLoggedIn, function(req, res, next) {
	res.render('reports', {
  		title: 'CAME',
			side: { reports: true }
		});
});

router.get('/admin', isLoggedIn, function(req, res, next) {
	res.render('admin', {
  		title: 'CAME',
			side: { admin: true }
		});
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
