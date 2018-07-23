// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'hblummont@gmail.com',
  from: 'toolerino1@gmail.com',
  subject: 'Testing',
  text: 'PlEaSe WoRk!',
  html: '<strong>PlEaSe WoRk!</strong>',
};
sgMail.send(msg);
