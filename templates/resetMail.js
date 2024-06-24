const urlReset = ''
module.exports = { 
    resetEmailHtml: 
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border: 1px solid #ddd;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                padding: 10px 0;
                border-bottom: 1px solid #ddd;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 20px 0;
            }
            .content p {
                font-size: 16px;
                line-height: 1.5;
            }
            .button-container {
                text-align: center;
                margin: 20px 0;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                color: #fff;
                background-color: #007bff;
                text-decoration: none;
                border-radius: 5px;
            }
            .button:hover {
                background-color: #0056b3;
            }
            .footer {
                text-align: center;
                padding: 10px 0;
                border-top: 1px solid #ddd;
                font-size: 14px;
                color: #666;
            }
            @media (max-width: 600px) {
                .container {
                    padding: 10px;
                }
                .content p {
                    font-size: 14px;
                }
                .button {
                    padding: 10px 15px;
                    font-size: 14px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Password Reset</h1>
            </div>
            <div class="content">
                <p>Hello,</p>
                <p>We received a request to reset your password. If you made this request, please click the button below to continue the process.</p>
                <div class="button-container">
                    <a href="${urlReset}" class="button">Reset Password</a>
                </div>
                <p>If you did not request a password reset, you can ignore this email.</p>
            </div>
            <div class="footer">
                <p>Best regards,<br>The Support Team</p>
            </div>
        </div>
    </body>
    </html>
`};
