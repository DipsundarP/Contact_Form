const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");



router.post("/register", (req, res) => {
  const { email, text } = req.body;
  console.log(req.body);
  if(!email || !text)
  {
    return res.status(400).json({message: "all fields are required"});
  }


  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "sending email with React and Nodejs",
      html: "<h1>Congratulations you Sucessfully Send Email</h1>",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error", error);
      } else {
        console.log("Email sent" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
  } catch (error) {
    res.status(201).json({ status: 401, error });
  }
});

module.exports = router;
