const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
const requestSource = require("../middlewares/requestSource");
const QrCode = require("qrcode");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/",requestSource, async (req, res) => {
  const { body } = req;
    const qrCode = await QrCode.toDataURL(body.data.g_id);
    body.data.qrCode = qrCode;

  const formatData = (data) => {
    let result = "";
    if (!data || typeof data !== "object") {
      return result;
    }
    result += `Name: ${data.first_name} ${data.last_name} \nMembership ID: ${data.g_id}\n\n`;
    return result;
  };

  const formattedData = formatData(body.data);

  const msg = {
    to: body.to,
    from: `Event Manager System <${process.env.SENDGRID_EMAIL}>`,
    subject: "Your Membership Information",
    text: `Your Membership Information is as follows:\n\n${formattedData}\n\nThank you for your membership!`,
    attachments: [
        {
          filename: "qrcode.png",
          content: qrCode.split(",")[1],
          type: "image/png",
          disposition: "attachment",
          contentId: "qrcode",
        },
      ],
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
