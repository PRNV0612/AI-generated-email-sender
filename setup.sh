#!/bin/bash

echo "🚀 Setting up AI Email Sender..."

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

# Create environment file
echo "⚙️ Setting up environment..."
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env from example"
    echo "⚠️  Please edit backend/.env with your API keys and email credentials"
else
    echo "✅ backend/.env already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env with your credentials:"
echo "   - Get Groq API key from: https://console.groq.com/keys"
echo "   - Set up Gmail App Password: https://myaccount.google.com/apppasswords"
echo ""
echo "2. Start the application:"
echo "   npm run dev"
echo ""
echo "3. Open your browser to:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:5000"
echo ""