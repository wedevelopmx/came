var express = require('express');
var passport = require('passport');
var auth = require('../auth');

var router = express.Router();

/* GET home page. */
router.get('/', auth.isVolunteer, function(req, res, next) {
	res.render('index', {
  		title: 'CAME',
			side: { door: true }
		});
});

router.get('/support', auth.isAdmin, function(req, res, next) {
	res.render('support', {
  		title: 'CAME',
			side: { support: true }
		});
});

router.get('/reports', auth.isAdmin, function(req, res, next) {
	res.render('reports', {
  		title: 'CAME',
			side: { reports: true }
		});
});

router.get('/admin/users', auth.isAdmin, function(req, res, next) {
	res.render('users', {
  		title: 'CAME',
			side: { admin: true }
		});
});

router.get('/admin/catalog', auth.isAdmin, function(req, res, next) {
	res.render('catalog', {
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

module.exports = router;
