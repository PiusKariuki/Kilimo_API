const express = require("express");
var cors = require("cors");
var taskRouter = express.Router();

var task = require("../models/taskSchema");

const app = express();
app.use(cors({ credentials: true, origin: true }));
taskRouter
  .route(`/:department`)
  .get((req, res, next) => {
    task
      .find({department: req.params.department})
      .then(
        (task) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(task);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    task
      .create(req.body)
      .then(
        (task) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(task);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

taskRouter
  .route("/:taskId")
  .put((req, res, next) => {
    let newTask = req.body;
    task
      .findByIdAndUpdate(
        req.params.taskId,
        {
          $set: newTask,
        },
        { new: true }
      )
      .then(
        (object) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(object);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .delete((req, res, next) => {
    task
      .findByIdAndDelete(req.params.taskId)
      .then(
        (task) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(task);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = taskRouter;
