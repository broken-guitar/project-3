const db = require("../models");

module.exports = {
  // creating new user
  createUser: function (req, res) {
    db.User.create(req.body)
      // only want to sent back id, not the rest of the info, even with PW hashed
      .then(dbModel => {
        // // using express' res.cookie() to send a browser cookie containing the NEW user _id
        res.cookie("id", dbModel._id);
        // res.json(dbModel._id);
        res.send("new user created successfully, logging you in...");
      })
      .catch(err => {
        console.log("\nUser creation error: ", err.message);
        res.json(err);
      });
  },

  // user log in to authenticate user
  userLogin: function (req, res) {
    console.log("\nUser login request received: ", req.body);
    // find user by username and verify submitted password
    db.User.findOne({ username: req.body.username }, function (err, user) {
        if (err) {
            res.status(422).json(err); // <-- some other error!
        } else if (user) {
            // We found the user! let's check their password...

            //  NOTE: comparePassword method uses bcrypt.compare; it takes the
            //      submitted password (req.body.password) and compares it
            //      against saved encrypted password (hash);
            //      See User model for additional notes.
            user.comparePassword(req.body.password, function (err, isMatch) {
                console.log("\tDoes the password match? ", isMatch);
                if (err) {
                    throw err;
                } else if (isMatch) {
                    // using express' res.cookie() to send a browser cookie containing user _id
                    res.cookie("id", user._id);
                    res.send("User log in attempted");

                    console.log("\tUser authenticated!");

                } else if (!isMatch) {
                    res.send({ error: "PASSWORD INCORRECT" });
                }
            });
      } else {
        res.send({error: "Username not found!"});
        console.log("\tThat username doesn't exist");
      }
    });
  },

  checkUser: function (req, res) {
    console.log("\nChecking user against cookie: \n\treq.cookies.id: ", req.cookies.id, "\n\treq.body.id: ", req.body.id);
    if (req.cookies.id === req.body.id) {
      res.json({ loggedin: true });
    } else {
      res.json({ loggedin: false });
    }
  },

  // get username
  getUsername: function (req, res) {
    console.log("\ngetUser request: ", req.params.userId);
    db.User.findById(req.params.userId)
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err));
  }
};
