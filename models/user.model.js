const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },

  email: { type: String, required: true, index: { unique: true } },

  password: { type: String, required: true },

  role: { type: String, required: true, default: "User" },

  // 'resources' is an array of Resource ids of Resources that we want to associate with the User
  resources: [{ type: Schema.Types.ObjectId, ref: "Resources" }],
  // 'favorites' is an array of Resource ids for Resrouces the user favorited
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Resource",
    },
  ],
});

// this is the PRE HOOK hashes the password before saving it to the database
//  NOTE:   PRE hooks run before the defined method, in this case the defined method
//          is "save", which is mongoose middleware that runs automatically on model.create() or
//          can be called on model instances.
userSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt (randomizes the encrypted password string each time)
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // bcrypt.hash will encrypt the password using our new "salt",
    // then returns the encrypted password as "hash" in the callback.
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next(); // because were in a hook, next() is used to move on to the next proper mongoose method
    });
  });
});

// adds a compare password method for logging back in to check against hashed password
userSchema.methods.comparePassword = function (candidatePassword, cb) {
  // bcrypt.compare( paswordToCheck, hashedPassword, callback());
  //

  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// email validator to make sure it is a valid email address syntax using Regex
userSchema.path("email").validate(function (email) {
  var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}, "Please enter in a valid email address.");

// validator that prevents username or email duplicates
userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

module.exports = User;
