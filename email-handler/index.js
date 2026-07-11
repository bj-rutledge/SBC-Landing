require('dotenv').config();
const { Resend } = require('resend');
 
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;
const LIVE_ALLOWED_ORIGIN = process.env.LIVE_ALLOWED_ORIGIN;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

function normalizeOrigin(value) {
  if (!value) {
    return null;
  }

  const trimmed = String(value).trim();
  if (!trimmed) {
    return null;
  }

  try {
    return new URL(trimmed).origin;
  } catch (_error) {
    return trimmed;
  }
}

const allowedOriginSet = new Set(
  [
    ALLOWED_ORIGIN,
    LIVE_ALLOWED_ORIGIN,
    ...(ALLOWED_ORIGINS ? ALLOWED_ORIGINS.split(',') : []),
  ]
    .map(normalizeOrigin)
    .filter(Boolean),
);

function getRequestOrigin(req) {
  return normalizeOrigin(req.get('origin'));
}

function setCorsHeaders(req, res) {
  const requestOrigin = getRequestOrigin(req);

  if (allowedOriginSet.size === 0) {
    res.set('Access-Control-Allow-Origin', '*');
  } else if (requestOrigin && allowedOriginSet.has(requestOrigin)) {
    res.set('Access-Control-Allow-Origin', requestOrigin);
    res.set('Vary', 'Origin');
  }

  res.set('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

exports.contactUsEmailHandler = async (req, res) => {
  setCorsHeaders(req, res);

  const requestOrigin = getRequestOrigin(req);
  if (
    requestOrigin &&
    allowedOriginSet.size > 0 &&
    !allowedOriginSet.has(requestOrigin)
  ) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }

  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      error: 'Missing required fields: name, email, message',
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!resend || !RESEND_FROM_EMAIL || !CONTACT_TO_EMAIL) {
    return res.status(500).json({
      error: 'Email service is not configured',
    });
  }

  try {
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim());

    const resendResponse = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      replyTo: email,
      subject: `New Contact Form Submission from ${name.trim()}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage.replace(/\n/g, '<br />')}</p>
      `,
      text: `New Contact Request\n\nName: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
    });

    if (resendResponse?.error) {
      console.error('Resend send failed:', resendResponse.error);
      return res.status(502).json({
        error: 'Unable to send message right now. Please try again shortly.',
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Contact request received.',
    });
  } catch (error) {
    console.error('Resend send failed:', error);
    return res.status(500).json({
      error: 'Unable to send message right now. Please try again shortly.',
    });
  }
};
