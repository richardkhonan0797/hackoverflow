const cron = require("node-cron");
const express = require("express");
const fs = require("fs");
let nodemailer = require("nodemailer");
const User = require('./models/user')

let email = []

app = express();

// specifying the mailOptions
let transporter = nodemailer.createTransport({
  // The service which will be used to send the emails
  service: "gmail",
  //   credentials to send emails
  auth: {
    user: "minioverflow51@gmail.com",
    pass: "M!niOverflow51"
  }
});

function a(){
    User.find({})
    .then(users=>{
        console.log(users)
        for(let user of users){
            email.push(user.email)
        }
        email = email.join(',')
    })
    .catch(err=>console.log(err))
}

module.exports = a

cron.schedule("18 18 19 12 *", function() {
    console.log("-----------------");
    console.log("Running Cron Job");
    let mailOptions = {
      from: "minioverflow51@gmail.com",
      to: email,
      subject: `Hi from Mini-Overflow`,
      text: `Hi, please checkout the new questions!`
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        throw error;
      } else {
        console.log("email sent");
      }
    });
  });
  
  app.listen(3120);