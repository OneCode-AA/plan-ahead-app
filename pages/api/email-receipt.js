import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { subject, html } = req.body;

  if (!html || !subject) {
    return res.status(400).json({ message: 'Missing email content' });
  }

  try {
    const result = await resend.emails.send({
      from: 'Store Receipt <noreply@yourdomain.com>', // We'll set this up next
      to: process.env.EMAIL_RECEIVER,
      subject,
      html,
    });

    return res.status(200).json({ message: 'Email sent!', result });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ message: 'Failed to send email', error });
  }
}
