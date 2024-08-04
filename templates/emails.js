const { transporter } = require("../middleware/mailer");

module.exports = {
  resetEmailHtml: async (email, urlReset) => {
    await transporter.sendMail({
      from: process.env.MAILER_AUTH_USER_NAME,
      to: email,
      subject: "Reset Password",
      html: `
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
                color: white;
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
`,
    });
  },
  
  welcome: async (email, userName) => {
    await transporter.sendMail({
        from: process.env.MAILER_AUTH_USER_NAME,
        to: email,
        subject: "Welcome to CARS4U!",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Website</title>
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
            background-color: #28a745;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #218838;
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
            <h1>Welcome to CARS4U!</h1>
        </div>
        <div class="content">
            <p>Hello ${userName},</p>
            <p>Thank you for signing up to our website! We are excited to have you on board. Here are a few things you can do to get started:</p>
            <ul>
                <li>Search for a new car and buy it</li>
                <li>Update your profile information</li>
            </ul>
            <div class="button-container">
                <a href="${process.env.E_COMMERCE_URL}" class="button">Get Started</a>
            </div>
            <p>If you have any questions, feel free to reach out to our support team.</p>
        </div>
        <div class="footer">
            <p>Best regards,<br>The Support Team</p>
        </div>
    </div>
</body>
</html>
`
    })
  },
  
  orderMail: async (order) => {
    const items = order.products.map(item => `<li>${item.product.company}${item.product.model} - ${item.quantity} - $ ${item.product.price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>`).join(' ')


    const date = new Date().toLocaleDateString(undefined, {year: '2-digit',
        month: '2-digit',
        day: '2-digit'})
    await transporter.sendMail({
        from: process.env.MAILER_AUTH_USER_NAME,
        to: order.user.email,
        subject: `Your order from CARS4U dated ${date}`,
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Confirmation</title>
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
                .order-details {
                    margin: 20px 0;
                    border: 1px solid #ddd;
                    padding: 10px;
                    border-radius: 5px;
                }
                .order-details h2 {
                    margin: 0;
                    font-size: 20px;
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 10px;
                    margin-bottom: 10px;
                }
                .order-details p {
                    margin: 5px 0;
                    font-size: 16px;
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
                    .content p, .order-details p {
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
                    <h1>Thanks for your order</h1>
                </div>
                <div class="content">
                    <p>Hello ${order.user.firstName},</p>
                    <p>Thank you for your order! We are pleased to confirm your order and will notify you once it has been shipped. Below are your order details:</p>
                    <div class="order-details">
                        <h2>Order Summary</h2>
                        <p><strong>Order Number:</strong> ${order.orderNum}</p>
                        <p><strong>Order Date:</strong> ${date}</p>
                        <p><strong>Shipping Address:</strong> ${order.user.address}</p>
                        <p><strong>Items:</strong></p>
                        <ul>
                            ${items}
                        <!--
                            <li>${order.products} - [Quantity] - [Price]</li>
                            <li>[Item 2] - [Quantity] - [Price]</li>
                             Add more items as needed -->
                        </ul>
                        <p><strong>Total: $</strong> ${order.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                    </div>
                   <!-- לסדר בהמשך
                <div class="button-container">
                    <a href="" class="button">Reset Password</a>
                </div>
                -->
                    <p>If you have any questions about your order, please contact our support team.</p>
                </div>
                <div class="footer">
                    <p>Best regards,<br>The Support Team</p>
                </div>
            </div>
        </body>
        </html>`
        
    })
  }
};
