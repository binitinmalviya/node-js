const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "nitinmalviya172@gmail.com",
        pass: "lahf okpj tyxh xiuu",
    },
});

const wellComeMessage = async (userEmail, userName, otp) => {

    await transporter.sendMail({
        from: "nitinmalviya172@gmail.com",
        to: userEmail,
        subject: "Well come in Pustak...",
        text: `Dear ${userName} well come  to our platform pustak.`,
        html: `
            <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome to [Your Brand]!</title>
    <!-- CSS media queries for responsiveness should be placed here in the <head> -->
    <style>
        @media screen and (max-width: 600px) {
            .container {
                width: 100% !important;
                padding: 0 10px;
            }
            .content-area {
                padding: 15px !important;
            }
            .main-text {
                font-size: 24px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: sans-serif;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
        <tr>
            <td style="padding: 20px 0 30px 0;">
                <!-- Main Email Container -->
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" class="container" style="border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    
                    <!-- Header/Logo Section -->
                    <tr>
                        <td align="center" style="padding: 40px 0 30px 0; background-color: #0056b3; color: #ffffff; font-size: 28px; font-weight: bold;">
                            <img src="https://via.placeholder.com/150x50?text=Your+Logo" alt="Your Brand Logo" width="150" height="50" style="display: block;" />
                        </td>
                    </tr>

                    <!-- Welcome Message Body -->
                    <tr>
                        <td class="content-area" style="padding: 40px 30px 40px 30px;">
                            <h1 class="main-text" style="font-size: 32px; margin: 0 0 20px 0; color: #333333;">Hello, ${userName}!</h1>
                            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px; color: #666666;">
                                Welcome to the Pustak family! We are thrilled to have you on board. Thank you for signing up.
                            </p>
                            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px; color: #666666;">
                                We believe our service will help you **[briefly state key benefit/value]**. To get started, simply click the button below.
                            </p>
                            
                            <!-- Call to Action Button -->
                            <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                                <tr>
                                    <td align="center" bgcolor="#007bff" style="border-radius: 5px; padding: 12px 24px;">
                                        <a href="[Your Website Link]" target="_blank" style="color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;">Your OTP IS ${otp}</a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 20px 0 0 0; font-size: 14px; line-height: 20px; color: #999999;">
                                If you have any questions, feel free to reply to this email or visit our <a href="[FAQ Link]" style="color: #0056b3; text-decoration: none;">FAQ page</a>.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer Section -->
                    <tr>
                        <td align="center" style="padding: 30px 30px 30px 30px; background-color: #f9f9f9; font-size: 12px; color: #999999;">
                            <p style="margin: 0 0 10px 0;">© [Current Year] [Your Brand Name]. All rights reserved.</p>
                            <p style="margin: 0;">
                                <a href="[Unsubscribe Link]" style="color: #999999; text-decoration: underline;">Unsubscribe</a> | 
                                <a href="[Privacy Policy Link]" style="color: #999999; text-decoration: underline;">Privacy Policy</a>
                            </p>
                            <!-- Social Media Links (optional) -->
                            <p style="margin: 10px 0 0 0;">
                                <a href="[Facebook Link]"><img src="https://via.placeholder.com/24?text=F" alt="Facebook" width="24" height="24" style="border: 0;"></a>
                                <a href="[Twitter Link]"><img src="https://via.placeholder.com/24?text=T" alt="Twitter" width="24" height="24" style="border: 0;"></a>
                                <a href="[Instagram Link]"><img src="https://via.placeholder.com/24?text=I" alt="Instagram" width="24" height="24" style="border: 0;"></a>
                            </p>
                        </td>
                    </tr>

                </table>
                <!-- End Main Email Container -->
            </td>
        </tr>
    </table>
</body>
</html>

        `
    })

}


module.exports = { transporter, wellComeMessage }
