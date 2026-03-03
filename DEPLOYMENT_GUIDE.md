# Production Deployment Guide

## Overview
This guide covers deploying the Smart Patient Management System to production using:
- **Backend**: Render.com (Free tier)
- **Frontend**: Vercel.com (Free tier)
- **Database**: MongoDB Atlas (Free tier)

---

## Prerequisites

- GitHub account
- MongoDB Atlas account
- Render account
- Vercel account
- Code pushed to GitHub repository

---

## Part 1: MongoDB Atlas Setup

### Step 1: Create Database

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign in or create account
3. Click "Build a Database"
4. Select "M0 Free" tier
5. Choose cloud provider (AWS recommended)
6. Select region closest to your users
7. Name cluster: `spms-cluster`
8. Click "Create"

### Step 2: Create Database User

1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Authentication Method: Password
4. Username: `spms_admin`
5. Password: Generate secure password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 3: Configure Network Access

1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere"
4. IP Address: `0.0.0.0/0`
5. Click "Confirm"

### Step 4: Get Connection String

1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: Node.js, Version: 4.1 or later
5. Copy connection string
6. Replace `<password>` with your database user password
7. Replace `myFirstDatabase` with `spms`

Example:
```
mongodb+srv://spms_admin:YOUR_PASSWORD@spms-cluster.xxxxx.mongodb.net/spms?retryWrites=true&w=majority
```

---

## Part 2: Backend Deployment (Render)

### Step 1: Prepare Repository

Ensure your `server/package.json` has:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
```

### Step 2: Create Render Service

1. Go to https://render.com
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure service:

**Basic Settings:**
- Name: `spms-backend`
- Region: Choose closest to your users
- Branch: `main`
- Root Directory: `server`
- Runtime: Node
- Build Command: `npm install`
- Start Command: `npm start`

**Instance Type:**
- Select "Free"

### Step 3: Add Environment Variables

Click "Advanced" → "Add Environment Variable"

Add these variables:

```
PORT = 5000
NODE_ENV = production
MONGODB_URI = [Your MongoDB Atlas connection string]
JWT_SECRET = [Generate random 32+ character string]
JWT_EXPIRE = 7d
CLIENT_URL = [Will add after frontend deployment]
```

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait 5-10 minutes for deployment
3. Check logs for "Server running" message
4. Copy service URL (e.g., `https://spms-backend.onrender.com`)

### Step 5: Test Backend

Test health endpoint:
```bash
curl https://spms-backend.onrender.com/api/health
```

Should return:
```json
{"success":true,"message":"Server is running"}
```

---

## Part 3: Frontend Deployment (Vercel)

### Step 1: Prepare Repository

Ensure your `client/package.json` has:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Import your repository
5. Configure project:

**Framework Preset:** Vite
**Root Directory:** `client`
**Build Command:** `npm run build`
**Output Directory:** `dist`
**Install Command:** `npm install`

### Step 3: Add Environment Variables

Click "Environment Variables"

Add:
```
VITE_API_URL = https://spms-backend.onrender.com/api
```

Replace with your actual Render backend URL.

### Step 4: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. Copy deployment URL (e.g., `https://spms.vercel.app`)

---

## Part 4: Final Configuration

### Update Backend CORS

1. Go back to Render dashboard
2. Open your backend service
3. Go to "Environment"
4. Update `CLIENT_URL` variable:
```
CLIENT_URL = https://spms.vercel.app
```
5. Click "Save Changes"
6. Service will automatically redeploy

### Seed Database

Option 1: Using seed script
```bash
cd server
node utils/seedData.js
```

Option 2: Manual API call
```bash
curl -X POST https://spms-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@spms.com",
    "password": "admin123",
    "role": "admin"
  }'
```

---

## Part 5: Verification

### Test Complete Flow

1. **Access Frontend**
   - Go to your Vercel URL
   - Should see login page

2. **Login**
   - Email: `admin@spms.com`
   - Password: `admin123`
   - Should redirect to dashboard

3. **Test Features**
   - Create a patient
   - Book an appointment
   - View dashboard analytics

### Check Logs

**Backend Logs (Render):**
- Go to Render dashboard
- Click on service
- Click "Logs" tab
- Check for errors

**Frontend Logs (Vercel):**
- Go to Vercel dashboard
- Click on project
- Click "Deployments"
- Click on latest deployment
- Check build logs

---

## Part 6: Custom Domain (Optional)

### Add Custom Domain to Vercel

1. Go to Vercel project settings
2. Click "Domains"
3. Add your domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (up to 48 hours)

### Update Backend CORS

Update `CLIENT_URL` in Render to your custom domain.

---

## Monitoring & Maintenance

### Set Up Monitoring

**Render:**
- Enable email notifications for deployment failures
- Monitor service health in dashboard

**MongoDB Atlas:**
- Set up alerts for high CPU/memory usage
- Enable backup (paid feature)

**Vercel:**
- Monitor deployment status
- Check analytics for traffic

### Regular Maintenance

1. **Weekly:**
   - Check error logs
   - Monitor database size
   - Review user feedback

2. **Monthly:**
   - Update dependencies
   - Review security alerts
   - Backup database

3. **Quarterly:**
   - Performance optimization
   - Security audit
   - Feature updates

---

## Troubleshooting

### Backend Not Responding

1. Check Render logs for errors
2. Verify MongoDB connection
3. Check environment variables
4. Restart service

### Frontend Can't Connect to Backend

1. Verify `VITE_API_URL` is correct
2. Check CORS configuration
3. Test backend health endpoint
4. Check browser console for errors

### Database Connection Issues

1. Verify MongoDB Atlas network access
2. Check connection string
3. Verify database user credentials
4. Check MongoDB Atlas status

### Deployment Failures

**Render:**
- Check build logs
- Verify package.json scripts
- Check Node.js version

**Vercel:**
- Check build logs
- Verify environment variables
- Clear build cache and redeploy

---

## Performance Optimization

### Backend

1. **Enable Compression**
```javascript
import compression from 'compression';
app.use(compression());
```

2. **Add Rate Limiting**
```javascript
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);
```

3. **Database Indexing**
- Already implemented in models
- Monitor slow queries in MongoDB Atlas

### Frontend

1. **Code Splitting**
- Already handled by Vite
- Use lazy loading for routes

2. **Image Optimization**
- Use WebP format
- Implement lazy loading

3. **Caching**
- Configure Vercel caching headers
- Use service workers

---

## Security Checklist

- [x] HTTPS enabled (automatic on Vercel/Render)
- [x] Environment variables secured
- [x] CORS properly configured
- [x] JWT authentication implemented
- [x] Password hashing enabled
- [x] Input validation active
- [ ] Rate limiting enabled (optional)
- [ ] Security headers configured (optional)
- [ ] Regular dependency updates
- [ ] Database backups configured

---

## Cost Breakdown

**Free Tier Limits:**

- **MongoDB Atlas**: 512 MB storage
- **Render**: 750 hours/month, sleeps after 15 min inactivity
- **Vercel**: Unlimited bandwidth, 100 GB-hours

**When to Upgrade:**

- Database > 500 MB
- Need 24/7 uptime (Render paid plan)
- High traffic (consider CDN)

---

## Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **Project Issues**: Create issue in repository

---

**Deployment Complete! 🎉**

Your Smart Patient Management System is now live and accessible worldwide.
