const emailjs = require("emailjs-com");
const uniqid = require("uniqid");

module.exports = async (emailAddress, attachment) => {
  try {
    const template_id = uniqid();
    const template_params = {
      subject: "Testing Email JS",
      text: "I hope this works",
    };

    await emailjs.send(
      process.env.SERVICE_ID,
      template_id,
      template_params,
      process.env.USER_ID
    );
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};
