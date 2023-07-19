const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const requestSource = require("../middlewares/requestSource");
const QrCode = require("qrcode");
const validate = require("../validations/sendQRCode");

router.post("/", requestSource, async (req, res) => {
  try {
    await validate(req.body);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  const qrCode = await QrCode.toDataURL(req.body.data.g_id, { width: "300px" });

  const msg = {
    to: req.body.to,
    from: `Event Manager System <${process.env.SENDGRID_EMAIL}>`,
    subject: "Your Membership Information",
    html: `
      <p>Your Membership Information is as follows:</p>
      <ul>
        <li>Name: ${req.body.data.first_name} ${req.body.data.last_name}</li>
        <li>Membership ID: ${req.body.data.g_id}</li>
      </ul>
      <img src="cid:qrcode" alt="QR Code" />
      <p>Thank you for your membership!s</p>
    `,
    attachments: [
      {
        content: qrCode.split(",")[1],
        filename: "qr-code",
        type: "image/png",
        content_id: "qrcode",
        disposition: "inline"
      }
    ]
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