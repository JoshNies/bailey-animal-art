require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Send custom order email
app.post('/api/custom-order/send', (req, res) => {
  console.log("Sending email...");

  // Create nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  // Create mail options
  let mailOptions = {
    from: '"Bailey Animal Art" <baileyanimalartbaa@gmail.com>',
    to: 'whatsthatfunction@gmail.com',
    subject: 'Bailey Animal Art - Custom Order',
    text: req.query.text,
    html: req.query.html
  };

  // Send email
  transporter.sendMail(mailOptions)
    .then(res => {
      console.log("Email sent! Response: ", res)
      res.json({ success: true });
    })
    .catch(e => {
      console.log("Email error: ", e)
      res.json({ success: false });
    })
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
