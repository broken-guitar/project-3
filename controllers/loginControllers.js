const db = require("../models");
const mailer = require("../services/mailer.js");
require("dotenv").config({ silent: true }); // to get email credentials

module.exports = {
  // creating new user
  createUser: function (req, res) {
    db.User.create(req.body)
      // only want to sent back id, not the rest of the info, even with PW hashed
      .then(dbModel => {
        // // using express' res.cookie() to send a browser cookie containing the NEW user _id

        sendNewUserEmail(dbModel);
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
            // res.send("User log in attempted");
            res.json(user);

            console.log("\tUser authenticated!");
          } else if (!isMatch) {
            res.send({ error: "PASSWORD INCORRECT" });
          }
        });
      } else {
        res.send({ error: "Username not found!" });
        console.log("\tThat username doesn't exist");
      }
    });
  },

  checkUser: function (req, res) {
    console.log(
      "\nChecking user against cookie: \n\treq.cookies.id: ",
      req.cookies.id,
      "\n\treq.body.id: ",
      req.body.id
    );
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
      .then(user => {
        let username = user.username;
        res.json(username);
      })
      .catch(err => res.status(422).json(err));
  }

};

// -- functions, etc. --

function sendNewUserEmail(user) {
    mailer.mailOptions.to = user.email;
    mailer.mailOptions.subject =    [   "Welcome, " + user.username + "!",
                                        "\n\nCheckout the Resource Center app!"
                                    ].join("");
    let html = emailHTML.replace("${username}", user.username);
    mailer.mailOptions.html = html;
    mailer.transporter.sendMail(mailer.mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

};


const emailHTML = '<html><head><meta content="text/html; charset=UTF-8" http-equiv="content-type"><style type="text/css">ol{margin:0;padding:0}table td,table th{padding:0}.c2{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left;height:11pt}.c0{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:18pt;font-family:"Arial";font-style:normal}.c3{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left}.c1{text-decoration-skip-ink:none;font-size:18pt;-webkit-text-decoration-skip:none;color:#1155cc;text-decoration:underline}.c4{background-color:#ffffff;max-width:468pt;padding:72pt 72pt 72pt 72pt}.c5{color:inherit;text-decoration:inherit}.c6{font-size:18pt}.title{padding-top:0pt;color:#000000;font-size:26pt;padding-bottom:3pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}.subtitle{padding-top:0pt;color:#666666;font-size:15pt;padding-bottom:16pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}li{color:#000000;font-size:11pt;font-family:"Arial"}p{margin:0;color:#000000;font-size:11pt;font-family:"Arial"}h1{padding-top:20pt;color:#000000;font-size:20pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h2{padding-top:18pt;color:#000000;font-size:16pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h3{padding-top:16pt;color:#434343;font-size:14pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h4{padding-top:14pt;color:#666666;font-size:12pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h5{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h6{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;font-style:italic;orphans:2;widows:2;text-align:left}</style></head><body class="c4"><p class="c3"><span class="c0">Welcome, ${username}</span></p><p class="c2"><span class="c0"></span></p><p class="c3"><span class="c6">To help you get started, please checkout the </span><span class="c1"><a class="c5" href="https://www.google.com/url?q=https://serene-kobuk-valley-06720.herokuapp.com/&amp;sa=D&amp;ust=1594165446565000&amp;usg=AOvVaw2sZY591ng5DFfunmmRWmcg">Resource Center</a></span><span class="c0">&nbsp;app!</span></p></body></html>'