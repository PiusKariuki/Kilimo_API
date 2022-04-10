const workerModel = require("../models/workerSchema");

exports.getAllWorkers = (req, res, next) => {
  workerModel
		.find({})
		.select("-profilePicture")
		.sort("-_id")
		.then(
			(workers) => {
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json(workers);
			},
			(err) => next(err)
		)
		.catch((err) => next(err));
};

exports.getWorkerById = (req, res, next) => {
  workerModel
		.findById(req.params.workerId)
		.select("-profilePicture")
		.then(
			(worker) => {
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json(worker);
			},
			(err) => {
				res.statusCode = 422;
				res.setHeader("Content-Type", "application/json");
				res.json(err.errors);
			}
		)
		.catch((err) => {
			res.statusCode = 422;
			res.setHeader("Content-Type", "application/json");
			res.json(err.errors);
		});
};

exports.addWorker = (req, res, next) => {
  const newWorker = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    department: req.body.department,
    title: req.body.title,
    email: req.body.email,
    password: req.body.password,
    profilePicture: {
      data: req?.file?.buffer,
      contentType: req?.file?.mimetype,
    },
  };

  workerModel
    .create(newWorker)
    .then(
      (newWorker) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(newWorker);
      },
      (err) => {
        if (err.code === 11000) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.json(`${req.body.firstName} already exists`);
        } else {
          res.statusCode = 422;
          res.setHeader("Content-Type", "application/json");
          res.json(err.errors);
        }
      }
    )
    .catch((e) => {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      res.json(err.errors);
    });
};

exports.editWorkerById = (req, res, next) => {
  workerModel
    .findByIdAndUpdate(
      req.params.workerId,
      {
        $set: req.body && req.files,
      },
      { new: true, runValidators: true }
    )
    .then(
      (worker) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(worker);
      },
      (err) => {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.json(err.errors);
      }
    )
    .catch((err) => {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.json(err.errors);
    });
};

exports.deleteWorkerById = (req, res, next) => {
  workerModel.findByIdAndDelete(req.params.workerId).then((worker) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(worker);
  });
};
