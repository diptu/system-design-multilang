const nodemailer = require("nodemailer");
const {SMTP_USER, SMTP_PASS} = require('../secret')
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass:SMTP_PASS
  },
});

const EmailWithNodeMailer = async(mailData)=>{

   try {
    const info = await transporter.sendMail({
        from: `Shoyo Hinata 👻 ${SMTP_USER}`, // sender address
        to: mailData.email, // list of receivers
        subject: mailData.subject,
        html: mailData.html
      });
    
      console.log("Message sent: %s", info.messageId);
   } catch (error) {
    console.error('Failed to send email at this time ',error)
    throw error;
   }
}
module.exports = {EmailWithNodeMailer}