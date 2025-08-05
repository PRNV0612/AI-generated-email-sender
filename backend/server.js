const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const Groq = require('groq-sdk');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Email transporter setup (using Gmail as example)
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS // Use App Password for Gmail
    }
  });
};

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Generate email using Groq AI
app.post('/api/generate-email', async (req, res) => {
  try {
    const { prompt, recipients, context } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const recipientText = recipients && recipients.length > 0 
      ? `Recipients: ${recipients.join(', ')}\n` 
      : '';

    const fullPrompt = `${recipientText}Context: ${context || 'Professional email'}\n\nPrompt: ${prompt}\n\nPlease generate a professional email with a clear subject line and body. Format your response as JSON with "subject" and "body" fields.`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a professional email writer. Generate emails that are clear, professional, and appropriate for business communication. Always respond with valid JSON containing 'subject' and 'body' fields."
        },
        {
          role: "user",
          content: fullPrompt
        }
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 1024
    });

    let emailContent;
    try {
      emailContent = JSON.parse(completion.choices[0]?.message?.content);
    } catch (parseError) {
      // Fallback if AI doesn't return valid JSON
      const content = completion.choices[0]?.message?.content || '';
      const lines = content.split('\n');
      emailContent = {
        subject: lines[0] || 'Generated Email',
        body: lines.slice(1).join('\n') || content
      };
    }

    res.json({
      subject: emailContent.subject || 'Generated Email',
      body: emailContent.body || emailContent.subject || content,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating email:', error);
    res.status(500).json({ 
      error: 'Failed to generate email',
      details: error.message 
    });
  }
});

// Send email
app.post('/api/send-email', async (req, res) => {
  try {
    const { recipients, subject, body, senderName } = req.body;

    if (!recipients || recipients.length === 0) {
      return res.status(400).json({ error: 'Recipients are required' });
    }

    if (!subject || !body) {
      return res.status(400).json({ error: 'Subject and body are required' });
    }

    const transporter = createTransporter();

    // Verify transporter
    await transporter.verify();

    const mailOptions = {
      from: `${senderName || 'AI Email Sender'} <${process.env.EMAIL_USER}>`,
      to: recipients.join(', '),
      subject: subject,
      html: body.replace(/\n/g, '<br>'),
      text: body
    };

    const result = await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      messageId: result.messageId,
      recipients: recipients,
      sentAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
});

// Test email configuration
app.get('/api/test-email-config', async (req, res) => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    res.json({ status: 'Email configuration is valid' });
  } catch (error) {
    res.status(500).json({ 
      error: 'Email configuration failed',
      details: error.message 
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`);
  console.log(`🤖 Groq API: ${process.env.GROQ_API_KEY ? 'Configured' : 'Not configured'}`);
});