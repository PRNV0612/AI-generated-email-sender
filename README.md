# AI Email Sender

A full-stack application that generates professional emails using AI and sends them to recipients. Built with React, Express, Groq AI, and Nodemailer.

## Features

✨ **AI-Powered Email Generation** - Uses Groq's Llama3 model to generate professional emails  
📝 **Editable Content** - Edit generated emails before sending  
📧 **Multi-Recipient Support** - Send to multiple recipients at once  
🎨 **Modern UI** - Beautiful, responsive interface with Tailwind CSS  
⚡ **Real-time Status** - Live feedback for generation and sending  
🔒 **Secure** - Rate limiting and input validation  

## Tech Stack

**Frontend:**
- React + Vite
- Tailwind CSS
- Heroicons
- Axios

**Backend:**
- Node.js + Express
- Groq SDK (AI)
- Nodemailer (Email)
- CORS, Helmet, Rate Limiting

## Quick Start

### 1. Install Dependencies

```bash
# Install all dependencies (root, backend, frontend)
npm run install:all
```

### 2. Configure Environment

**Backend Setup:**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your credentials:

```env
# Get from https://console.groq.com/keys
GROQ_API_KEY=your_groq_api_key_here

# Gmail setup (or other email provider)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here

# Server config
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**Gmail Setup:**
1. Enable 2-Factor Authentication
2. Generate App Password: [Google Account Settings](https://myaccount.google.com/apppasswords)
3. Use the App Password (not your regular password)

**Groq API Setup:**
1. Sign up at [Groq Console](https://console.groq.com/)
2. Create an API key
3. Add it to your `.env` file

### 3. Run the Application

```bash
# Start both frontend and backend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## Usage

### 1. Add Recipients
- Enter email addresses in the Recipients section
- Add multiple recipients by clicking the + button

### 2. Configure Email
- Enter your name (optional)
- Choose email context (Professional, Casual, Marketing, etc.)

### 3. Write Prompt
- Describe what you want your email to be about
- Example: "Schedule a meeting to discuss the new project proposal"

### 4. Generate Email
- Click "Generate Email"
- AI will create a professional email with subject and body

### 5. Edit & Send
- Toggle between Preview and Edit modes
- Make any necessary changes
- Click "Send Email" to deliver to all recipients

## API Endpoints

### `POST /api/generate-email`
Generate email content using AI
```json
{
  "prompt": "Schedule a meeting about the project",
  "recipients": ["user@example.com"],
  "context": "Professional email"
}
```

### `POST /api/send-email`
Send email to recipients
```json
{
  "recipients": ["user@example.com"],
  "subject": "Meeting Request",
  "body": "Email content...",
  "senderName": "Your Name"
}
```

### `GET /api/health`
Health check endpoint

### `GET /api/test-email-config`
Test email configuration

## Development

### Project Structure
```
├── backend/           # Express API server
│   ├── server.js     # Main server file
│   ├── package.json  # Backend dependencies
│   └── .env          # Environment variables
├── frontend/         # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.jsx     # Main app component
│   │   └── main.jsx    # Entry point
│   └── package.json    # Frontend dependencies
└── package.json        # Root scripts
```

### Scripts
```bash
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Start only frontend
npm run dev:backend      # Start only backend
npm run install:all      # Install all dependencies
npm run build           # Build frontend for production
npm start              # Start production server
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | Yes | Your Groq API key |
| `EMAIL_USER` | Yes | Your email address |
| `EMAIL_PASS` | Yes | Your email password/app password |
| `PORT` | No | Backend server port (default: 5000) |
| `FRONTEND_URL` | No | Frontend URL for CORS (default: http://localhost:5173) |

## Troubleshooting

### Email Issues
- **Gmail**: Use App Password, not regular password
- **Other providers**: Configure SMTP settings in `server.js`
- **Firewall**: Ensure port 587/465 is open

### Groq API Issues
- **Invalid API Key**: Check your key at [Groq Console](https://console.groq.com/keys)
- **Rate Limits**: Groq has usage limits on free tier
- **Model Issues**: The app uses `llama3-8b-8192` model

### Development Issues
- **Port conflicts**: Change ports in `.env` and package.json
- **CORS errors**: Update `FRONTEND_URL` in backend `.env`
- **Missing dependencies**: Run `npm run install:all`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for any purpose.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the environment setup
3. Check the console for error messages
4. Verify API keys and email configuration