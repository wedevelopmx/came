

function hasRole(roles, role) {
  return roles.some((currentRole) => currentRole == role );
}

module.exports =  {
  // route middleware to make sure a user is logged in
  isLoggedIn: function(req, res, next) {
      // if user is authenticated in the session, carry on
      if (req.isAuthenticated())
          return next();
      // if they aren't redirect them to the home page
      res.redirect('/login');
  },
  isVolunteer: function(req, res, next) {
    if (req.isAuthenticated() && (hasRole(req.user.roles,'VOLUNTEER') || hasRole(req.user.roles,'ADMIN'))) {
        next();
    } else {
        res.redirect('/login');
    }
  },
  isAdmin: function(req, res, next) {
    if (req.isAuthenticated() && hasRole(req.user.roles,'ADMIN')) {
        next();
    } else {
        res.redirect('/login');
    }
  }
};
