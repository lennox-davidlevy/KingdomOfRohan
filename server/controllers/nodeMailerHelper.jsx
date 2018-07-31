const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const { EMAIL, PASS } = require('../../config.js');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASS
  }
});

var createMailer = (recipients, subject, contents) => {
  return {
    from: EMAIL,
    to: recipients,
    subject: subject,
    html: contents,
  };
};


module.exports = {
  transporter,
  createMailer
};
