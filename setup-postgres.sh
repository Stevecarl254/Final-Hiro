#!/bin/bash
# PostgreSQL Migration Setup Script
# This script helps set up your PostgreSQL database quickly

set -e

echo "=================================================="
echo "PostgreSQL Migration Setup Script"
echo "=================================================="
echo ""

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed!"
    echo "Please install PostgreSQL from: https://www.postgresql.org/download/"
    exit 1
fi

echo "✅ PostgreSQL found"
echo ""

# Check if PostgreSQL is running
if ! psql -U postgres -c "SELECT version();" &> /dev/null; then
    echo "❌ PostgreSQL is not running!"
    echo "Please start PostgreSQL and try again"
    exit 1
fi

echo "✅ PostgreSQL is running"
echo ""

# Create database
echo "Creating database 'hiro_db'..."
psql -U postgres -c "CREATE DATABASE hiro_db;" 2>/dev/null || echo "⚠️  Database might already exist"

echo "✅ Database created/verified"
echo ""

# Check if .env exists
if [ ! -f "hiro-backend/.env" ]; then
    echo "Creating .env file from .env.example..."
    cp hiro-backend/.env.example hiro-backend/.env
    echo "✅ .env created - PLEASE EDIT WITH YOUR POSTGRES PASSWORD!"
    echo ""
    echo "Edit hiro-backend/.env and update:"
    echo "  DB_PASSWORD=your_postgres_password"
    exit 0
fi

echo "✅ .env file already exists"
echo ""

# Install dependencies
echo "Installing dependencies..."
cd hiro-backend
npm install
cd ..

echo "✅ Dependencies installed"
echo ""

echo "=================================================="
echo "✨ Setup Complete!"
echo "=================================================="
echo ""
echo "Next steps:"
echo "1. Edit hiro-backend/.env (if needed)"
echo "2. cd hiro-backend"
echo "3. npm run dev"
echo ""
echo "Your PostgreSQL database is ready to use!"
