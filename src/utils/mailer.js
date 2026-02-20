
import nodemailer from "nodemailer"; // import nodemailer for sending emails
import dotenv from "dotenv"; // import dotenv to load environment variables
dotenv.config(); // Load environment variables from .env file

const sendWelcomeEmail = async ( email , name) => {
 // Send welcome email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.APP_PASS  // Your email password or app password
            }

        })
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Our App!',
            text: `Hi ${name},\n\nThank you for registering at our app! We're excited to have you on board.\n\nBest regards,\nThe Team`
        }
       

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log("Error sending email:", error);
            } else {
                console.log("Email sent:", info.response);
            }
        })
    }
    
export default {
    sendWelcomeEmail
}