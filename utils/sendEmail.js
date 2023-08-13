const nodemailer = require("nodemailer");

const sendEmail = (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.STMP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.to,
    subject: options.subject,
    html: `
    <html dir="rtl" lang="ar">
      <head>
        <style>
          body {
            direction: rtl;
            text-align: right;
          }
        </style>
      </head>
      <body>
          ${options.text}
      </body>
    </html>`,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
        console.log(err);
    } else {
      //add to logs
      //console.log("email sent sucessfully");
    }
  });
};

module.exports = sendEmail;

/*
const sendEmail = require("../utils/sendEmail");
//send email
    const message = "test message";

    try {
      await sendEmail({
        to: "marwen.hammami@esprit.tn",
        subject: "subject",
        text: message,
      });

      // res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log("catch1");
      console.log(err);

      return next(new ErrorResponse("Email could not be sent", 500));
    }

*/