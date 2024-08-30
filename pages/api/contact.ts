import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

// Create a transporter using environment variables
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Ensure these are set in your .env.local
    pass: process.env.EMAIL_PASS,
  },
});

// Define the API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, subject, message } = req.body;

    // Define mail options
    const mailOptions = {
      from: email,
      to: 'azromjr@gmail.com',
      subject: subject,
      text: `From: ${email}\n\n${message}`,
      replyTo: email,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error); // Enhanced error logging
      res.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
