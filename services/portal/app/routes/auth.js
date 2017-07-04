var express = require('express');
var router = express.Router();

module.exports = function(passport) {

  var router = express.Router();

  router.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/',
      failureRedirect : '/signup',
      failureFlash : true
  }));

  router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
  }));

  router.get('/logout', function(req, res){
		req.logout();
		res.redirect('/login');
	});

	// route to test if the user is logged in or not
	router.get('/loggedin', function(req, res) {
		res.json(req.isAuthenticated() ? req.user : null);
	});

  return router;

}
