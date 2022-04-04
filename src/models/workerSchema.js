const mongoose = require("mongoose");
const { Schema, model } = mongoose;
require("mongoose-currency").loadType(mongoose);
const bcrypt = require("bcrypt");

const value = {
  type: String,
  required: [true, "This field is required"],
};

const validateEmail = (email) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const imageSchema = new mongoose.Schema({
  data: {
    type: Buffer,
    required: [true, "Profile photo is required"]
  },
  contentType: String,
});


const workerSchema = new Schema(
  {
    firstName: value,
    lastName: value,
    profilePicture: imageSchema,
    title: value,
    department: value,
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: value,

    date_employed: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
    autoCreate: true, // auto create collection
    autoIndex: true, // auto create indexes
  }
);

/* a prehook that is called before the user info is stored in the database 
this hook will hash the plain text password befor storing it*/
workerSchema.pre("save", async function (next) {
  const worker = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

workerSchema.methods.isValidPassword = async function (password) {
  const worker = this;
  const compare = await bcrypt.compare(password, worker.password);
  return compare;
};

const workers = model("worker", workerSchema);
module.exports = workers;
