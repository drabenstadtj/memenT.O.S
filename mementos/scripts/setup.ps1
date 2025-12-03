# Setup script for mementO.S. application (PowerShell)
# This script helps initialize the project with the correct environment

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "mementO.S. Setup Script" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env.development exists
if (-not (Test-Path .env.development)) {
    Write-Host "Creating .env.development from .env.example..." -ForegroundColor Yellow
    Copy-Item .env.example .env.development
    Write-Host "✓ .env.development created" -ForegroundColor Green
} else {
    Write-Host "✓ .env.development already exists" -ForegroundColor Green
}

# Check if .env.production exists
if (-not (Test-Path .env.production)) {
    Write-Host "Creating .env.production from .env.example..." -ForegroundColor Yellow
    Copy-Item .env.example .env.production
    Write-Host "✓ .env.production created" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  WARNING: Please update .env.production with your production settings!" -ForegroundColor Yellow
} else {
    Write-Host "✓ .env.production already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Available commands:" -ForegroundColor White
Write-Host "  npm run dev              - Start development server" -ForegroundColor Gray
Write-Host "  npm run build            - Build for production" -ForegroundColor Gray
Write-Host "  npm run preview          - Preview production build" -ForegroundColor Gray
Write-Host "  npm run docker:build     - Build Docker image" -ForegroundColor Gray
Write-Host "  npm run docker:compose:up - Deploy with Docker Compose" -ForegroundColor Gray
Write-Host ""
Write-Host "For more information, see DEPLOYMENT.md" -ForegroundColor White
Write-Host ""
