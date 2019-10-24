const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD
  }
});

const getPasswordResetURL = (user, token) =>
  `http://localhost:4200/update-password/${user._id}/${token}`;
//   `http://localhost:4200/password/reset/${user._id}/${token}`;

const resetPasswordTemplate = (user, url) => {
  const from = process.env.EMAIL_LOGIN;
  const to = user.username;
  //   const to = user.email;
  const subject = "Password Reset";
  const html = `
  <p>Hey ${user.username || user.email},</p>
  <p>If you really forgot your password, don’t worry!</p>
  <p>You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  <p>if it wasn’t you, just ignore this message </p>
  <p>–With best regards, support team</p>
  `;

  return { from, to, subject, html };
};

module.exports = {
  transporter,
  getPasswordResetURL,
  resetPasswordTemplate
};
