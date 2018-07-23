// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const adminEmail = 'toolerino1@gmail.com'
const requestSubject = 'new request for gear use'

function sendRequest(item, requester) {
  const requestBody = `Hey ${item.user_name}, ${requester.user_name} wants to use your ${item.name}, contact them at ${requester.email_address}`
  
  return new Promise((resolve, reject) => {
    const msg = {
      to: item.email_address,
      from: adminEmail,
      subject: requestSubject,
      html: `<strong>${requestBody}</strong>`,
      generateTextFromHTML: true
    };
    sgMail.send(msg, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    });
  })  
}

module.exports = {
  sendRequest
}


