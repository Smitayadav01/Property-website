import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter with proper Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  connectionTimeout: 60000,
  greetingTimeout: 30000,
  socketTimeout: 60000,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify transporter configuration
const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log('✅ SMTP Server is ready to send emails');
    return true;
  } catch (error) {
    console.error('❌ SMTP Server verification failed:', error.message);
    return false;
  }
};

// Initialize verification
verifyTransporter();

export const sendEmail = async (to, subject, html) => {
  // Check if SMTP credentials are configured
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('⚠️ SMTP credentials not configured, skipping email send');
    return { success: false, error: 'SMTP not configured' };
  }

  // Validate email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    console.log('⚠️ Invalid email address:', to);
    return { success: false, error: 'Invalid email address' };
  }

  try {
    const mailOptions = {
      from: `"Vasai Properties" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      }
    };

    console.log(`📧 Attempting to send email to: ${to}`);
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email send error:', error.message);
    
    // Provide specific error messages
    if (error.code === 'ETIMEDOUT') {
      console.error('💡 Suggestion: Check if Gmail App Password is correct and 2FA is enabled');
    } else if (error.code === 'EAUTH') {
      console.error('💡 Suggestion: Verify Gmail credentials and App Password');
    } else if (error.code === 'ECONNECTION') {
      console.error('💡 Suggestion: Check internet connection and firewall settings');
    }
    
    return { success: false, error: error.message };
  }
};

export const sendWelcomeEmail = async (userEmail, userName) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fef7cd; padding: 20px;">
      <div style="background-color: #22c55e; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">Welcome to Vasai Properties!</h1>
      </div>
      <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #22c55e; margin-top: 0;">Dear ${userName},</h2>
        <p style="color: #333; line-height: 1.6;">
          Welcome to Vasai Properties - your trusted partner in finding the perfect home in Vasai-Virar!
        </p>
        <p style="color: #333; line-height: 1.6;">
          With over 10 years of experience, we're here to help you discover exceptional properties 
          in the Palghar district. You can now browse our extensive collection of 500+ properties 
          and create your personalized wishlist.
        </p>
        <div style="background-color: #f0f9ff; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #22c55e;">
          <h3 style="color: #22c55e; margin-top: 0;">What you can do now:</h3>
          <ul style="color: #333;">
            <li>Browse our premium property listings</li>
            <li>Add properties to your wishlist</li>
            <li>Get personalized recommendations</li>
            <li>Connect with our expert team</li>
          </ul>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <h3 style="color: #22c55e;">Contact Information</h3>
          <p style="color: #333; margin: 5px 0;">📍 Vasai-Virar, Palghar District, Maharashtra - 401201</p>
          <p style="color: #333; margin: 5px 0;">📞 +91 7507770244</p>
          <p style="color: #333; margin: 5px 0;">📧 vasaiproperty9@gmail.com</p>
          <p style="color: #333; margin: 5px 0;">🕒 Office Hours: 10:00 AM - 8:00 PM</p>
        </div>
        <p style="color: #333; line-height: 1.6;">
          Thank you for choosing Vasai Properties. We look forward to helping you find your dream home!
        </p>
        <p style="color: #666; margin-top: 30px;">
          Best regards,<br>
          <strong style="color: #22c55e;">Team Vasai Properties</strong>
        </p>
      </div>
    </div>
  `;

  return await sendEmail(userEmail, 'Welcome to Vasai Properties - Your Dream Home Awaits!', html);
};

export const sendAdminNotification = async (type, userInfo, propertyInfo = null) => {
  let subject = '';
  let html = '';

  if (type === 'new_user') {
    subject = 'New User Registration - Vasai Properties';
    html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
        <div style="background-color: #22c55e; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">New User Registration</h1>
        </div>
        <div style="background-color: white; padding: 20px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #22c55e;">User Details:</h2>
          <ul style="color: #333; line-height: 1.8;">
            <li><strong>Name:</strong> ${userInfo.name}</li>
            <li><strong>Email:</strong> ${userInfo.email}</li>
            <li><strong>Phone:</strong> ${userInfo.phone}</li>
            <li><strong>Registration Time:</strong> ${new Date().toLocaleString()}</li>
          </ul>
        </div>
      </div>
    `;
  } else if (type === 'wishlist_update') {
    subject = 'Property Added to Wishlist - Vasai Properties';
    html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
        <div style="background-color: #22c55e; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">Property Wishlisted</h1>
        </div>
        <div style="background-color: white; padding: 20px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #22c55e;">User Details:</h2>
          <ul style="color: #333; line-height: 1.8;">
            <li><strong>Name:</strong> ${userInfo.name}</li>
            <li><strong>Email:</strong> ${userInfo.email}</li>
            <li><strong>Phone:</strong> ${userInfo.phone}</li>
          </ul>
          <h2 style="color: #22c55e;">Property Details:</h2>
          <ul style="color: #333; line-height: 1.8;">
            <li><strong>Title:</strong> ${propertyInfo.title}</li>
            <li><strong>Location:</strong> ${propertyInfo.location}</li>
            <li><strong>Price:</strong> ₹${propertyInfo.price}</li>
            <li><strong>Type:</strong> ${propertyInfo.type}</li>
          </ul>
          <p style="color: #666; margin-top: 20px;">
            <strong>Time:</strong> ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    `;
  }

  return await sendEmail(process.env.ADMIN_EMAIL, subject, html);
};