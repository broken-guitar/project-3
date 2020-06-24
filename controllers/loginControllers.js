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
        console.log("error from create: ", err.message);
        res.json(err.message);
      });
  },

  // user log in to authenticate user
  userLogin: function (req, res) {
    console.log("request to database", req.body);
    // fetch user and test password verification
    db.User.findOne({ username: req.body.username }, function (err, user) {
      if (err) {
        res.status(422).json(err);
      } else if (user) {
        //  NOTE: comparePassword method uses bcrypt.compare; it takes the 
        //  submitted password (req.body.password) and compares it
        //  against saved encrypted password (hash);
        //  See User model for additional notes.
        user.comparePassword(req.body.password, function (err, isMatch) {
          console.log("is it a match?", isMatch);
          if (err) {
            throw err;
          } else if (isMatch) {
            // sending back MongoDB id of that logged in user to get custom things or make custom calls HERE WE CAN DO ANYTHING LIKE MAKE A CALL TO ANOTHER COLLECTION USING THIS ID AS A REFERENCE, OR WHATEVER

            // using express' res.cookie() to send a browser cookie containing user _id
            res.cookie("id", user._id);
            // res.json(user._id);
            res.send("user log in attempted");
          } else if (!isMatch) {
            res.send({
              message: "PASSWORD INCORRECT"
            });
          }
        });
      } else {
        res.send({
          message: "USERNAME DOES NOT EXIST"
        });
        console.log("That username doesn't exist");
      }
    });
  },

  // Check if user authenticated, returns loggedIn: true OR false in JSON object
  //    HOW?: every time the user/client loads the website, the cookie (that was 
  //    initially sent with res.cookie() ) is sent back to the server
  //    in the request object (located at req.cookies).
  checkUser: function (req, res) {
    console.log("cookie", req.cookies.id, "body", req.body.id);
    if (req.cookies.id === req.body.id) {
      res.json({ loggedin: true });
    } else {
      res.json({ loggedin: false });
    }
  },

  // get username
  getUsername: function (req, res) {
    console.log("getUser request: ", req.params.userId);
    db.User.findById(req.params.userId).then(user => res.json(user)).catch(err => res.status(422).json(err));
  }
}