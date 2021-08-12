const express = require('express');
var workers = require('../models/workerSchema');
var authRouter = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken')

var seed = require('../config/seed');

require('dotenv').config({ path: `${__dirname}../config/.env` });

authRouter.post('/register', (req, res, next) => {
  var newWorker = new workers({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    department: req.body.department,
    title: req.body.title,
    salary: req.body.salary,
  });

  workers.create(newWorker)
    .then(worker => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(worker);
    }, err => next(err))
    .catch(err => next(err))
});

authRouter.post('/login', (req, res, next) => {
/* custom callback . gives us access to req res and next coz of js closure */
  passport.authenticate('login', (err, user, info) => {
      if (err) {
        const error = new Error(info.message);
        return next(error);
      }
      else if (!user) {
        const error = new Error(info.message);
        return next(error);
      }

      req.logIn(user, { session: false }, (error) => {
        if (error) return next(error);
        // seed();
        else if (user && !error) {
          const body = { _id: user._id, email: user.email };
          const token = jwt.sign({ user: body }, process.env.secret_key);
          res.json({ token });
        }
      })
  })(req, res, next);
});

authRouter.post('/admin/login',  (req, res, next) => {
  /*custom callback */
  passport.authenticate('manager', (err, user, info) => {

    if (err) {
      const error = new Error(info.message);
      return next(error);
    }
    else if (!user) {
      const error = new Error(info.message);
      return next(error);
    }
    
      req.logIn(user, { session: false }, (error) => {
        if (error) return next(error);
        // seed();
        else if (user && !error) {
          const body = { _id: user._id, email: user.email };
          const token = jwt.sign({ user: body }, process.env.secret_key);
          res.json({ token });
        }
      })
 
  })(req, res, next);
});


authRouter.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/auth/login');
  }
  else {
    err = new Error('You aren\'t logged in');
    err.status = 403;
    next(err);
  }
});

module.exports = authRouter;