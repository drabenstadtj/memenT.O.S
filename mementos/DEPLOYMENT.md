# Deployment Guide for mementO.S.

This guide explains how to configure and deploy the mementO.S. application in both development and production environments.

## Table of Contents
- [Environment Configuration](#environment-configuration)
- [Development Mode](#development-mode)
- [Production Mode](#production-mode)
- [Docker Deployment](#docker-deployment)
- [Available Scripts](#available-scripts)

## Environment Configuration

The application uses environment-specific configuration files:

- `.env.development` - Development environment settings
- `.env.production` - Production environment settings
- `.env.example` - Template for environment variables

### Environment Variables

All environment variables for Vite must be prefixed with `VITE_`:

```bash
VITE_APP_ENV=production          # Environment name
VITE_API_URL=http://localhost:3000   # API endpoint URL
VITE_API_TIMEOUT=30000           # API timeout in milliseconds
VITE_ENABLE_DEBUG=false          # Enable debug mode
VITE_ENABLE_ANALYTICS=false      # Enable analytics
VITE_APP_TITLE=mementO.S.        # Application title
VITE_APP_VERSION=1.0.0           # Application version
```

### Accessing Environment Variables in Code

```javascript
// Access environment variables in your React components
const apiUrl = import.meta.env.VITE_API_URL;
const isDebug = import.meta.env.VITE_ENABLE_DEBUG === 'true';
const appTitle = import.meta.env.VITE_APP_TITLE;
```

## Development Mode

### Local Development (without Docker)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# The app will be available at http://localhost:5173
```

### Development with Docker

```bash
# Start development container
npm run docker:compose:dev

# Or use docker-compose directly
docker-compose -f docker-compose.dev.yml up

# The app will be available at http://localhost:5173
# Hot reload is enabled - changes will reflect automatically
```

## Production Mode

### Local Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# The preview will be available at http://localhost:4173
```

### Production Build (Development Mode)

```bash
# Build with development settings
npm run build:dev
```

## Docker Deployment

### Option 1: Docker Build and Run

```bash
# Build Docker image
npm run docker:build

# Or use docker directly
docker build -t mementos:latest .

# Run the container
npm run docker:run

# Or use docker directly
docker run -p 80:80 mementos:latest

# The app will be available at http://localhost
```

### Option 2: Docker Compose (Recommended)

```bash
# Start production deployment
npm run docker:compose:up

# Or use docker-compose directly
docker-compose up -d

# View logs
npm run docker:compose:logs

# Stop and remove containers
npm run docker:compose:down
```

### Docker Compose Environments

The `docker-compose.yml` file includes two service profiles:

1. **Production (default)**: `mementos-app`
   - Runs on port 80
   - Uses nginx to serve static files
   - Optimized for production

2. **Development**: `mementos-dev`
   - Runs on port 5173
   - Includes hot reload
   - Activated with `--profile dev` flag

```bash
# Run development profile
docker-compose --profile dev up mementos-dev
```

## Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run docker:compose:dev` - Start development in Docker

### Production
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Docker
- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Run Docker container
- `npm run docker:compose:up` - Start with Docker Compose (detached)
- `npm run docker:compose:down` - Stop Docker Compose services
- `npm run docker:compose:logs` - View Docker logs

### Other
- `npm run lint` - Run ESLint

## Production Deployment Checklist

1. **Update environment variables**
   - Edit `.env.production` with your production values
   - Set correct `VITE_API_URL` for your API endpoint
   - Enable analytics if needed

2. **Build and test locally**
   ```bash
   npm run build
   npm run preview
   ```

3. **Deploy with Docker**
   ```bash
   # Build the image
   docker build -t mementos:latest .

   # Tag for your registry (if using one)
   docker tag mementos:latest your-registry/mementos:latest

   # Push to registry
   docker push your-registry/mementos:latest

   # Deploy on server
   docker-compose up -d
   ```

4. **Verify deployment**
   - Check health endpoint: `http://your-domain/health`
   - Test application functionality
   - Check browser console for errors

## Nginx Configuration

The production Docker image uses nginx with the following features:

- **Gzip compression** for text assets
- **Security headers** (X-Frame-Options, X-Content-Type-Options, etc.)
- **Static asset caching** (1 year for images, fonts, etc.)
- **SPA routing support** (all routes serve index.html)
- **Health check endpoint** at `/health`

To customize nginx configuration, edit `nginx.conf`.

## Troubleshooting

### Port already in use
```bash
# Change port in docker-compose.yml or use different port mapping
docker run -p 8080:80 mementos:latest
```

### Build fails in Docker
```bash
# Check .dockerignore is not excluding necessary files
# Ensure node_modules is in .dockerignore
# Try building locally first: npm run build
```

### Environment variables not working
```bash
# Ensure variables are prefixed with VITE_
# Restart dev server after changing .env files
# Check variables are imported correctly: import.meta.env.VITE_*
```

## Security Notes

- Never commit `.env.production` with real credentials to version control
- Use `.env.example` as a template
- Rotate API keys and secrets regularly
- Use HTTPS in production
- Review and update security headers in `nginx.conf`
