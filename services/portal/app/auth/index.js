

function hasRole(roles, role) {
  return roles.some((currentRole) => currentRole == role );
}

function parseUser(user) {
  let parsedUser = { id: user._id, email: user.local.email, roles: {}};
  user.roles.forEach((role) => {
    parsedUser.roles[role.toLowerCase()] = true;
  });
  return parsedUser;
}

function hasVolunterACL(user) {
  return user.roles.volunteer || user.roles.admin;
}

function hasAdminACL(user) {
  return user.roles.admin;
}

module.exports =  {
  parseUser: parseUser,
  hasAdminACL: hasAdminACL,
  hasVolunterACL: hasVolunterACL,
  isAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      res.locals.user = req.user;
      return next();
    }
    // if they aren't redirect them to the home page
    res.status(401).json({ message: 'You are not authenticated'});
  },
  // route middleware to make sure a user is logged in
  isLoggedIn: function(req, res, next) {
      // if user is authenticated in the session, carry on
      if (req.isAuthenticated()) {
        res.locals.user = req.user;
        return next();
      }
      // if they aren't redirect them to the home page
      res.redirect('/login');
  },
  isVolunteer: function(req, res, next) {
    if(!req.isAuthenticated()) {
      res.redirect('/login');
    } else if(hasVolunterACL(req.user)) {
      res.locals.user = req.user;
      next();
    } else {
      res.redirect('/');
    }
  },
  isAdmin: function(req, res, next) {
    if(!req.isAuthenticated()) {
      res.redirect('/login');
    } else if(hasAdminACL(req.user)) {
      res.locals.user = req.user;
      next();
    } else {
      res.redirect('/');
    }
  }
};
