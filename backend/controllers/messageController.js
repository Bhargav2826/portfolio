const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

// @desc    Store a message & send email notification
// @route   POST /api/contact
const sendMessage = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        res.status(400);
        throw new Error('Please fill all fields');
    }

    // 1. Attempt to save to DB (optional/resilient)
    let dbSaved = false;
    try {
        const newMessage = new Message({ name, email, message });
        await newMessage.save();
        dbSaved = true;
    } catch (error) {
        console.error('⚠️  Database save failed:', error.message);
        // We continue anyway to try and send the email
    }

    // 2. Attempt to send email notification
    let emailSent = false;
    // Only attempt if credentials are properly configured
    if (process.env.EMAIL_PASS && process.env.EMAIL_PASS !== 'your_gmail_app_password_here') {
        try {
            const transporter = createTransporter();
            const mailOptions = {
                from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
                to: process.env.EMAIL_TO,
                replyTo: email,
                subject: `📬 New Portfolio Message from ${name}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f14; color: #ffffff; border-radius: 12px; overflow: hidden;">
                        <div style="background: linear-gradient(135deg, #6d28d9, #8b5cf6); padding: 30px 40px;">
                            <h1 style="margin: 0; font-size: 24px; color: #ffffff;">📬 New Contact Message</h1>
                            <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">Someone reached out through your portfolio</p>
                        </div>
                        <div style="padding: 30px 40px;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #a78bfa; font-weight: bold; width: 80px;">Name</td>
                                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #e2e8f0;">${name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #a78bfa; font-weight: bold;">Email</td>
                                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #e2e8f0;"><a href="mailto:${email}" style="color: #8b5cf6; text-decoration: none;">${email}</a></td>
                                </tr>
                            </table>
                            <div style="margin-top: 24px;">
                                <p style="color: #a78bfa; font-weight: bold; margin-bottom: 10px;">Message</p>
                                <div style="background: rgba(255,255,255,0.05); border-left: 4px solid #6d28d9; border-radius: 4px; padding: 16px 20px; color: #e2e8f0; line-height: 1.6; white-space: pre-wrap;">${message}</div>
                            </div>
                            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">
                                <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #6d28d9, #8b5cf6); color: #fff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">Reply to ${name}</a>
                            </div>
                        </div>
                        <div style="background: rgba(255,255,255,0.03); padding: 16px 40px; text-align: center; color: #6b7280; font-size: 12px;">
                            Sent from your Portfolio Contact Form
                        </div>
                    </div>
                `,
            };

            await transporter.sendMail(mailOptions);
            emailSent = true;
        } catch (error) {
            console.error('⚠️  Email sending failed:', error.message);
        }
    } else {
        console.warn('⚠️  EMAIL_PASS not configured — skipping email notification.');
    }

    // 3. Return response based on results
    if (dbSaved || emailSent) {
        res.status(201).json({ 
            message: 'Message processed successfully!',
            details: { db: dbSaved, email: emailSent }
        });
    } else {
        res.status(500).json({ 
            message: 'Failed to process message. Please check server configuration.',
            error: 'Both database save and email sending failed'
        });
    }
};

// @desc    Get all messages (for admin)
// @route   GET /api/messages
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({}).sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { sendMessage, getMessages };
