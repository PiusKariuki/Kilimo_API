const workers = require("../models/workerSchema");
const passport = require("passport");
const jwt = require("jsonwebtoken");
// const seed = require("../config/seed");

require("dotenv").config({ path: `${__dirname}/../../.env` });

exports.register = async (req, res, next) => {
	const newWorker = new workers({
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
	});

	try {
		await workers.create(newWorker);
		const email = req.body.email;
		const department = req.body.department;
		const token = jwt.sign({ email }, process.env.secret_key);
		res
			.status(200)
			.setHeader("Content-Type", "application/json")
			.json({ token, email, department });
	} catch (error) {
		res.status(422).setHeader("Content-Type", "application/json");
		if (error.code === 11000) res.json("This user already exists");
		else {
			const { errors } = error;
			res.json(errors);
		}
	}
};

exports.userLogin = (req, res, next) => {
	/* custom callback . gives us access to req res and next coz of js closure */
	passport.authenticate("login", (err, user, info) => {
		if (err || !user) {
			res.statusCode = 401;
			res.setHeader("Content-Type", "application/json");
			res.json(info);
		}

		req.login(user, { session: false }, (error) => {
			if (error) {
				return res
					.status(422)
					.setHeader("Content-Type", "application/json")
					.json(error.message);
			} else if (user && !error) {
				let department = info.department;
				const email = req.body.email;
				const token = jwt.sign({ email }, process.env.secret_key);
				res.json({ token, email, department });
			}
		});
	})(req, res, next);
};

exports.adminLogin = (req, res, next) => {
	// seed();
	/*custom callback */
	passport.authenticate("manager", (err, user, info) => {
		if (err || !user) {
			return res
				.status(401)
				.setHeader("Content-Type", "application/json")
				.json(info.message);
			// res.statusCode = 401;
			// res.setHeader("Content-Type", "application/json");
			// res.json(info.message);
		}

		req.logIn(user, { session: false }, (error) => {
			if (error) {
				return res
					.status(422)
					.setHeader("Content-Type", "application/json")
					.json(error.message);
			} else if (user && !error) {
				const email = req.body.email;
				const token = jwt.sign({ email }, process.env.secret_key);
				res.json({ token, email });
			}
		});
	})(req, res, next);
};

exports.logout = (req, res) => {
	if (req.session) {
		req.session.destroy();
		res.clearCookie("session-id");
		res.redirect("/auth/login");
	} else {
		err = new Error("You aren't logged in");
		err.status = 403;
		next(err);
	}
};
