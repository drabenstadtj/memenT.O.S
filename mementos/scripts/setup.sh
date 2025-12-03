#!/bin/bash

# Setup script for mementO.S. application
# This script helps initialize the project with the correct environment

set -e

echo "========================================="
echo "mementO.S. Setup Script"
echo "========================================="
echo ""

# Check if .env.development exists
if [ ! -f .env.development ]; then
    echo "Creating .env.development from .env.example..."
    cp .env.example .env.development
    echo "✓ .env.development created"
else
    echo "✓ .env.development already exists"
fi

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "Creating .env.production from .env.example..."
    cp .env.example .env.production
    echo "✓ .env.production created"
    echo ""
    echo "⚠️  WARNING: Please update .env.production with your production settings!"
else
    echo "✓ .env.production already exists"
fi

echo ""
echo "Installing dependencies..."
npm install

echo ""
echo "========================================="
echo "Setup Complete!"
echo "========================================="
echo ""
echo "Available commands:"
echo "  npm run dev              - Start development server"
echo "  npm run build            - Build for production"
echo "  npm run preview          - Preview production build"
echo "  npm run docker:build     - Build Docker image"
echo "  npm run docker:compose:up - Deploy with Docker Compose"
echo ""
echo "For more information, see DEPLOYMENT.md"
echo ""
