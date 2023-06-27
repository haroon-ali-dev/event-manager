const express = require("express");
const router = express.Router();
const requestSource = require("../middlewares/requestSource");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/", async (req, res) => {
  const { body } = req;

  const formatData = (data) => {
    let result = "";
    if (!data) {
      return result;
    }
    result += "First test";
    return result;
  };

  const formattedData = formatData(body.data);

  const msg = {
    to: body.to,
    from: `Event Manager System <${process.env.SENDGRID_EMAIL}>`,
    subject: "Your Membership Information",
    text: "Your Membership Information",
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email" });
  }
});

module.exports = router;
