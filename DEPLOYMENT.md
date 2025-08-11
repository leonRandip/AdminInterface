# 🚀 Job Management App - Deployment Guide

## 📋 Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Git repository set up
- Backend API running and accessible

## 🏗️ Project Structure

```
AdminInterface/
├── adminpage/          # Frontend (Next.js)
├── backend/            # Backend (NestJS + PostgreSQL)
└── README.md
```

## 🔧 Backend Deployment

### Option 1: Local Development

```bash
cd backend
npm install
npm run start:dev
```

### Option 2: Production Server

```bash
cd backend
npm install
npm run build
npm run start:prod
```

### Option 3: Docker Deployment

```bash
cd backend
docker build -t job-management-backend .
docker run -p 3001:3001 job-management-backend
```

### Option 4: Cloud Platforms

#### Heroku

```bash
cd backend
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

#### Railway

```bash
cd backend
railway login
railway init
railway up
```

#### Render

```bash
cd backend
# Connect your GitHub repo to Render
# Set environment variables in Render dashboard
```

## 🌐 Frontend Deployment

### Option 1: Static Export (Recommended for hosting)

```bash
cd adminpage
npm install
npm run build
npm run export
# Upload 'out' folder to any static hosting service
```

### Option 2: Vercel (Recommended for Next.js)

```bash
cd adminpage
npm install -g vercel
vercel
# Follow prompts to deploy
```

### Option 3: Netlify

```bash
cd adminpage
npm install
npm run build
npm run export
# Drag 'out' folder to Netlify dashboard
```

### Option 4: GitHub Pages

```bash
cd adminpage
npm install
npm run build
npm run export
# Push 'out' folder to gh-pages branch
```

## 🔑 Environment Variables

### Backend (.env)

```env
DB_HOST=your-db-host
DB_PORT=5432
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_NAME=job_management
PORT=3001
NODE_ENV=production
```

### Frontend (.env.production)

```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

## 📱 Hosting Services Comparison

| Service          | Frontend | Backend | Database | Cost        | Ease   |
| ---------------- | -------- | ------- | -------- | ----------- | ------ |
| **Vercel**       | ✅       | ❌      | ❌       | Free+       | Easy   |
| **Netlify**      | ✅       | ❌      | ❌       | Free+       | Easy   |
| **Railway**      | ✅       | ✅      | ✅       | Pay-per-use | Medium |
| **Render**       | ✅       | ✅      | ✅       | Free+       | Medium |
| **Heroku**       | ✅       | ✅      | ✅       | $7+/month   | Medium |
| **DigitalOcean** | ✅       | ✅      | ✅       | $5+/month   | Hard   |

## 🚀 Quick Deploy Scripts

### Deploy to Vercel

```bash
#!/bin/bash
cd adminpage
npm install
npm run build
vercel --prod
```

### Deploy to Netlify

```bash
#!/bin/bash
cd adminpage
npm install
npm run build
npm run export
# Upload 'out' folder to Netlify
```

### Deploy Backend to Railway

```bash
#!/bin/bash
cd backend
npm install
railway up
```

## 🔒 Security Considerations

1. **CORS Configuration**: Update backend CORS for production domains
2. **Environment Variables**: Never commit sensitive data
3. **Database Security**: Use strong passwords and SSL connections
4. **API Rate Limiting**: Implement rate limiting for production
5. **HTTPS**: Always use HTTPS in production

## 📊 Monitoring & Maintenance

1. **Health Checks**: Implement `/health` endpoint
2. **Logging**: Use proper logging service (Winston, Pino)
3. **Error Tracking**: Integrate Sentry or similar
4. **Performance**: Monitor API response times
5. **Backups**: Regular database backups

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**: Check backend CORS configuration
2. **Database Connection**: Verify database credentials and network
3. **Build Failures**: Check Node.js version compatibility
4. **API Timeouts**: Increase timeout values for production

### Debug Commands

```bash
# Check backend status
curl http://localhost:3001/jobs

# Check database connection
psql -h your-host -U your-user -d job_management

# Check frontend build
cd adminpage && npm run build
```

## 📞 Support

For deployment issues:

1. Check logs in hosting platform dashboard
2. Verify environment variables
3. Test API endpoints locally
4. Check database connectivity

---

**Happy Deploying! 🎉**
