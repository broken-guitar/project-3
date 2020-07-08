require("dotenv").config({ silent: true });
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host:   "smtp.gmail.com",
    port:   465, //...
    secure: true, //...
    requireTLS: true, //...use TLS encryption
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
const mailOptions = {
    from: '"Resource Center App" <rcmailer.ucb.fsf.pt.1.2020.lol.p3.7@gmail.com>',
    to: "",
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};
  

module.exports = { transporter, mailOptions };
