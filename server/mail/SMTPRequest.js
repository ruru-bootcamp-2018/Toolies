const nodemailer = require("nodemailer");
const mailercreds = require('../../.mailercreds') || {user:'user', pass:'pass'};
const xoauth2 = require('xoauth2');
const smtpBuilder = require('nodemailer-smtp-transport');

nodemailer.createTestAccount((err, account) => {
  console.log('test account created')
  const smtpTransport = nodemailer.createTransport({
    name: 'toolerinoServer',
    host: 'smtp.ethereal.email',
    port: 465,
    secure: true,

    auth: {
      user: account.user,

      pass: account.pass
    }
    // service: 'gmail',
    // auth: {
    //   xoauth2: xoauth2.createXOAuth2Generator(mailercreds)
    // }
    // auth: {
    //   user: 'toolerino1@gmail.com',
    //   pass: 'ToolTool1!'
    // }
  })

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: "Toolerino Admin ✔ <toolerino1@gmail.com>", // sender address
    to: "stan.roache@gmail.com", // list of receivers
    subject: "New Gear Request", // Subject line
    text: "Kia ora! ", // plaintext body
    html: "<b>Hello world ✔</b>" // html body
  }
console.log('sending mail')
  // send mail with defined transport object
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
    }else{
      console.log("Message sent: ", response);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    smtpTransport.close(); // shut down the connection pool, no more messages
  })
})
