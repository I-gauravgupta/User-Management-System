const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "itisgauravgupta@gmail.com",
      pass: process.env.APP_PASSWORD,
    },
  });

module.exports.sendVerificationMail = async (name,email,user_id) =>{
  
  try {
    const info = await transporter.sendMail({
        from: "itisgauravgupta@gmail.com",
        to:email,
        subject: "Hello ✔",                          
        html: `<p>Verify your mail <a href="http://127.0.0.1/verify?id=${user_id}">Verify</a></p>`,        
      });
     console.log("Message sent:", info.messageId);
  } catch (error) {
    console.log(error);
    
  }

}
