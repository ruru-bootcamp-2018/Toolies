const sendMail = require('sendmail')()

sendMail({
  from: 'toolerino1@gmail.com',
  to: 'stan.roache@gmail.com',
  subject: 'toolrequest',
  html: 'mail body'
}, (err, reply) => {
  console.log(err && err.stack);
  console.log(reply);
})
