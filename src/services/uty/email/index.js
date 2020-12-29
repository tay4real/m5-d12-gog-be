const nodemailer = require("nodemailer");

module.exports = async (emailAddress, attachment) => {
  try {
    const myFile64 = attachment.toString("base64");

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // send mail with defined transport object
    const mailOptions = {
      from: `Ademuyiwa Otubusin <${process.env.SMTP_USER}>`, // sender address
      to: emailAddress, // list of receivers
      subject: "Testing Nodemailer", // Subject line
      html: "<b>Find your Order details below</b>", // plain text body
      attachments: [
        {
          content: myFile64, // file itself in the form of a base64 string
          type: "plain/text",
          filename: "whatever.pdf",
          disposition: "attachment",
        },
      ],
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};
