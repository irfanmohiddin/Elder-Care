const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
app.use(cors()); // Enable CORS for frontend
app.use(express.json());

let generatedOtp = null;

app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.json({ success: false, message: "Email is required" });

  generatedOtp = Math.floor(100000 + Math.random() * 900000);
  console.log(`Generated OTP for ${email}: ${generatedOtp}`);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sim722009@gmail.com",
      pass: "mwtm yxfa lgny pxqm"
    }
  });

  const mailOptions = {
    from: '"ElderCare OTP" <sim722009@gmail.com>',
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${generatedOtp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error("Error sending mail:", error);
    res.json({ success: false });
  }
});

app.post("/verify-otp", (req, res) => {
  const { otp } = req.body;
  const isValid = otp == generatedOtp;
  res.json({ success: isValid });
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
