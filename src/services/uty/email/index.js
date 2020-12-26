const { SMTPClient } = require("emailjs");

module.exports = async (emailAddress, attachment) => {
  try {
    const client = new SMTPClient({
      user: process.env.SMTP_USER,
      password: process.env.SMTP_PASSWORD,
      host: process.env.SMTP_HOST,
      ssl: true,
    });

    const msg = {
      to: emailAddress,
      from: process.env.SENDER_EMAIL,
      subject: "Testing Email JS",
      text: "I hope this works",
      attachments: [
        { data: "<html>i <i>hope</i> this works!</html>", alternative: true },
        {
          path: "whatever.pdf",
          type: "plain/text",
          name: "renamed.pdf",
        },
      ],
    };

    await client.send(msg);
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};
