# Frontend Deployment Guide

This guide explains how to deploy the frontend and configure it to work with your Render.com backend.

## Backend URL Configuration

The frontend is configured to use your Render.com backend at:
**https://adminbackend-fuxg.onrender.com**

## Environment Variables

### Required Environment Variable

- `NEXT_PUBLIC_API_URL`: The URL of your backend API

### Environment File Setup

#### Local Development

Create a `.env.local` file in the `adminpage` directory:

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://adminbackend-fuxg.onrender.com
```

#### Production (Vercel)

Set the environment variable in your Vercel dashboard:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://adminbackend-fuxg.onrender.com`
   - **Environment**: Production, Preview, Development

## Deployment Options

### Vercel (Recommended)

1. **Connect Repository**: Connect your GitHub/GitLab repository to Vercel
2. **Set Environment Variables**: Configure `NEXT_PUBLIC_API_URL` as shown above
3. **Deploy**: Vercel will automatically build and deploy your app

### Netlify

1. **Connect Repository**: Connect your repository to Netlify
2. **Set Environment Variables**: In Site settings → Environment variables
3. **Build Command**: `npm run build`
4. **Publish Directory**: `out`

### Manual Deployment

1. **Build**: `npm run build`
2. **Export**: `npm run export` (if using static export)
3. **Deploy**: Upload the `out` directory to your hosting provider

## Current Configuration

Your frontend is currently configured to use:

- **Backend URL**: https://adminbackend-fuxg.onrender.com
- **CORS**: Configured on the backend to accept requests from your Vercel domain
- **Environment**: Production-ready with proper fallbacks

## Testing the Connection

After deployment, test that your frontend can connect to the backend:

1. Open your deployed frontend
2. Navigate to the Jobs page
3. Check the browser console for any API errors
4. Verify that jobs are loading from the backend

## Troubleshooting

### CORS Errors

- Ensure your backend CORS configuration includes your frontend domain
- Check that `ALLOWED_ORIGINS` in the backend includes your Vercel URL

### API Connection Issues

- Verify the backend URL is correct
- Check that the backend service is running on Render
- Ensure environment variables are set correctly

### Build Errors

- Check that all dependencies are installed
- Verify Node.js version compatibility
- Check for TypeScript compilation errors

## Environment File Reference

- `env.local` - Local development (gitignored)
- `env.production` - Production configuration template
- `env.example` - Example configuration for developers

## Next Steps

1. **Set Environment Variables** in your deployment platform
2. **Deploy the Frontend** to Vercel or your preferred platform
3. **Test the Connection** between frontend and backend
4. **Monitor for Errors** in both frontend and backend logs
