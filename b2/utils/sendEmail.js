const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  // console.log("e", process.env.sendEmail);
  console.log(process.env.SMPT_HOST);
  // console.log(process.env.SMPT_PORT);
  // console.log(process.env.SMPT_SERVICE);
  // console.log(process.env.SMPT_MAIL);
  // console.log(process.env.SMPT_PASSWORD);

  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });
  // console.log(options.email, options.subject, options.message);
  const mailOptions = {
    from: "targeter001@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
