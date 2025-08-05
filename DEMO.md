# AI Email Sender - Demo Guide

## 🎬 Application Demo

This guide shows you how to use the AI Email Sender application step by step.

### Prerequisites Setup

Before testing the application, you need to set up:

1. **Groq API Key**
   - Sign up at [Groq Console](https://console.groq.com/)
   - Create an API key
   - Add it to `backend/.env` as `GROQ_API_KEY`

2. **Email Configuration (Gmail)**
   - Enable 2-Factor Authentication on your Gmail
   - Generate App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)
   - Add email and app password to `backend/.env`

### Step-by-Step Demo

#### 1. Start the Application
```bash
# In the root directory
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend app on http://localhost:5173

#### 2. Using the Interface

**Add Recipients:**
- In the "Recipients" section, enter email addresses
- Click the + button to add each recipient
- Example: `test@example.com`, `demo@test.com`

**Configure Sender Info:**
- Enter your name (optional)
- Select email context:
  - Professional (default)
  - Casual
  - Marketing
  - Follow-up
  - Thank you
  - Meeting Request

**Write Email Prompt:**
- Describe what you want the email to be about
- Example prompts:
  - "Schedule a meeting to discuss the quarterly budget review"
  - "Follow up on the client presentation from last week"
  - "Thank the team for their hard work on the project"
  - "Request feedback on the new website design"

**Generate Email:**
- Click "Generate Email"
- AI will create a professional email with subject and body
- Generated email appears below with preview

**Edit Email (Optional):**
- Click "Edit" to modify the generated content
- Edit both subject line and email body
- Click "Preview" to see formatted version

**Send Email:**
- Review the final email content
- Click "Send Email" to deliver to all recipients
- Success message will confirm delivery

#### 3. Example Workflow

**Scenario:** Schedule a project kickoff meeting

1. **Recipients:** `john@company.com`, `sarah@company.com`
2. **Sender Name:** "Alex Johnson"
3. **Context:** "Meeting request"
4. **Prompt:** "Schedule a project kickoff meeting for the new mobile app development project next Tuesday at 2 PM"

**AI Generated Result:**
```
Subject: Project Kickoff Meeting - Mobile App Development

Dear Team,

I hope this email finds you well. I would like to schedule a project kickoff meeting for our new mobile app development project.

Meeting Details:
- Date: Next Tuesday
- Time: 2:00 PM
- Purpose: Project kickoff and initial planning

Please confirm your availability, and I'll send out a calendar invitation with the meeting location details.

Looking forward to working with you on this exciting project.

Best regards,
Alex Johnson
```

5. **Edit if needed** and **Send**

### Features Demonstrated

✅ **Multi-recipient support** - Send to multiple people at once  
✅ **AI content generation** - Professional emails created from simple prompts  
✅ **Editable content** - Modify generated emails before sending  
✅ **Different contexts** - Various email types (professional, casual, etc.)  
✅ **Real-time feedback** - Status messages for all actions  
✅ **Modern UI** - Clean, responsive interface  

### Testing Without Real Email

For development/testing without sending real emails:

1. **Mock Mode:** Comment out the actual email sending in `backend/server.js`
2. **Test Recipients:** Use fake email addresses for UI testing
3. **API Testing:** Use tools like Postman to test endpoints directly

### API Testing Examples

**Generate Email:**
```bash
curl -X POST http://localhost:5000/api/generate-email \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Schedule a team meeting",
    "recipients": ["test@example.com"],
    "context": "Professional email"
  }'
```

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

### Troubleshooting Demo Issues

❌ **"Failed to generate email"**
- Check Groq API key in `.env`
- Verify internet connection
- Check console for specific error

❌ **"Failed to send email"**  
- Verify email credentials in `.env`
- Check Gmail App Password setup
- Ensure recipients are valid emails

❌ **Frontend won't load**
- Check if backend is running on port 5000
- Verify no CORS errors in browser console
- Clear browser cache

❌ **Backend won't start**
- Check if port 5000 is available
- Verify all dependencies are installed
- Check `.env` file exists

### Success Metrics

✅ Application starts without errors  
✅ UI loads and is responsive  
✅ Can add/remove recipients  
✅ AI generates relevant email content  
✅ Can edit generated emails  
✅ Successfully sends emails to recipients  
✅ Proper error handling and user feedback  

This completes the demo of the AI Email Sender application!