const express = require('express');
const router = express.Router();
const User = require('../auth/models/user');
const auth = require('../auth');

router.get('/', auth.isAuthenticated, function(req, res, next) {
  User.find({}).select({ "local.email": 1, "_id": 1, "roles": 1}).exec(function(err, users) {
      res.json(users);
  });
});

router.put('/:id', auth.isAuthenticated, function(req, res, next) {
  const { roles } = req.body;

  User.findOneAndUpdate({'_id': req.params.id }, { roles }, {}, function(err, user){
      if (err)
        return res.send(500, { error: err });
      return res.json(user);
  });
});

router.delete('/:id', auth.isAuthenticated, function(req, res, next) {
  User.findOneAndRemove({'_id': req.params.id }, function(err, user){
      if (err)
        return res.send(500, { error: err });
      return res.json(user);
  });
});

module.exports = router;
