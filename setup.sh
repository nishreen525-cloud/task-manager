#!/bin/bash

echo "📋 Task Manager App - Quick Start"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install --silent
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
echo "✅ Backend dependencies installed"
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd client
npm install --silent
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
echo "✅ Frontend dependencies installed"
cd ..
echo ""

echo "✨ Setup complete!"
echo ""
echo "🚀 To start development:"
echo "   Terminal 1: npm run dev"
echo "   Terminal 2: cd client && npm run dev"
echo ""
echo "📖 For more info, see README.md"
