const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-password",
  },
});

function sendVerificationEmail(newUser, verificationToken) {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: newUser.email,
    subject: "Vérifiez votre adresse email",
    html: `<p>Cliquez sur ce lien pour vérifier votre adresse email: <a href="http://localhost:3000/verify-email?token=${verificationToken}">Vérifier Email</a></p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = { sendVerificationEmail };
