require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER, 
        pass: process.env.GMAIL_PASS, 
    },
});

app.post("/send-email", async (req, res) => {
    try {
        const { 
            firstName, 
            lastName, 
            email, 
            phone, 
            petName, 
            appointmentReason, 
            firstTimeClient,
            recaptchaResponse 
        } = req.body;

        if (!recaptchaResponse) {
            return res.status(400).json({ message: "Please complete the reCAPTCHA verification" });
        }

        const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
        const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaResponse}`;
        
        const recaptchaResult = await axios.post(verificationURL);
        
        if (!recaptchaResult.data.success) {
            return res.status(400).json({ message: "reCAPTCHA verification failed" });
        }

        const fullName = `${firstName} ${lastName}`;

        const mailOptions = {
            from: email,
            replyTo: email,
            to: `decodefactory@gmail.com`,
            subject: `Service request by ${firstName} from Hope Animal Clinic`,
            text: `
                Name: ${fullName}
                Email: ${email}
                Phone: ${phone}
                Pet Name: ${petName}
                Appointment Reason: ${appointmentReason}
                First Time Client: ${firstTimeClient}
            `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});