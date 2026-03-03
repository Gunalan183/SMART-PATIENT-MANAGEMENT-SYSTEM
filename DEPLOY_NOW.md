# 🚀 Deploy Your SPMS - Step by Step Guide

## Part 1: Deploy Backend to Render (10 minutes)

### Step 1: Sign Up for Render
1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended)
4. Authorize Render to access your repositories

### Step 2: Create Web Service
1. Click "New +" button (top right)
2. Select "Web Service"
3. Connect your repository: `SMART-PATIENT-MANAGEMENT-SYSTEM`
4. Click "Connect"

### Step 3: Configure Service

Fill in these settings:

**Basic Settings:**
- **Name**: `spms-backend` (or any name you prefer)
- **Region**: Singapore (closest to you) or US East
- **Branch**: `main`
- **Root Directory**: `server`
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- Select **"Free"** (0$/month)

### Step 4: Add Environment Variables

Click "Advanced" → Scroll to "Environment Variables"

Add these 5 variables:

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `MONGODB_URI` | `mongodb+srv://new-user123:uFygLNs64HUoxHdl@cluster0.jartz9l.mongodb.net/spms?retryWrites=true&w=majority` |
| `JWT_SECRET` | `spms_super_secret_jwt_key_2024_production_ready_32chars_min` |
| `JWT_EXPIRE` | `7d` |

**Note:** Leave `CLIENT_URL` empty for now - we'll add it after deploying frontend

### Step 5: Deploy Backend

1. Click "Create Web Service"
2. Wait 5-10 minutes for deployment
3. Watch the logs - you should see:
   - "Installing dependencies..."
   - "Starting server..."
   - "MongoDB Connected"
   - "Server running in production mode on port 5000"

### Step 6: Get Backend URL

Once deployed, you'll see:
- ✅ Green "Live" badge
- Your backend URL (e.g., `https://spms-backend-xxxx.onrender.com`)

**COPY THIS URL - YOU'LL NEED IT FOR FRONTEND!**

### Step 7: Test Backend

Open your browser and visit:
```
https://your-backend-url.onrender.com/api/health
```

You should see:
```json
{"success":true,"message":"Server is running"}
```

---

## Part 2: Deploy Frontend to Vercel (5 minutes)

### Step 1: Sign Up for Vercel
1. Go to https://vercel.com
2. Click "Sign Up"
3. Sign up with GitHub
4. Authorize Vercel

### Step 2: Import Project
1. Click "Add New..." → "Project"
2. Find your repository: `SMART-PATIENT-MANAGEMENT-SYSTEM`
3. Click "Import"

### Step 3: Configure Project

**Framework Preset:** Vite (should auto-detect)

**Root Directory:** 
- Click "Edit"
- Enter: `client`

**Build Settings:**
- Build Command: `npm run build` (auto-filled)
- Output Directory: `dist` (auto-filled)
- Install Command: `npm install` (auto-filled)

### Step 4: Add Environment Variable

Click "Environment Variables" section

Add this variable:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://your-render-backend-url.onrender.com/api` |

**IMPORTANT:** Replace with YOUR actual Render backend URL from Part 1, Step 6

Example:
```
VITE_API_URL=https://spms-backend-xxxx.onrender.com/api
```

### Step 5: Deploy Frontend

1. Click "Deploy"
2. Wait 2-3 minutes
3. Watch the build process
4. You'll see "Building..." → "Deploying..." → "Ready!"

### Step 6: Get Frontend URL

Once deployed, you'll see:
- ✅ Deployment successful
- Your frontend URL (e.g., `https://spms-xxxx.vercel.app`)

**COPY THIS URL!**

---

## Part 3: Update Backend CORS (IMPORTANT!)

### Step 1: Go Back to Render
1. Open Render dashboard
2. Click on your backend service
3. Go to "Environment" tab

### Step 2: Add CLIENT_URL
1. Click "Add Environment Variable"
2. Key: `CLIENT_URL`
3. Value: Your Vercel frontend URL (e.g., `https://spms-xxxx.vercel.app`)
4. Click "Save Changes"

### Step 3: Wait for Redeploy
- Render will automatically redeploy (2-3 minutes)
- Wait for "Live" status

---

## Part 4: Seed Production Database

### Option 1: Using Local Script (Recommended)

1. Update your local `server/.env`:
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://new-user123:uFygLNs64HUoxHdl@cluster0.jartz9l.mongodb.net/spms?retryWrites=true&w=majority
```

2. Run seed script:
```bash
cd server
npm run seed
```

### Option 2: Using API Call

Open terminal and run:
```bash
curl -X POST https://your-backend-url.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Admin User\",\"email\":\"admin@spms.com\",\"password\":\"admin123\",\"role\":\"admin\"}"
```

---

## Part 5: Test Your Live Application! 🎉

### Step 1: Open Your App
Visit your Vercel URL: `https://spms-xxxx.vercel.app`

### Step 2: Login
- Email: `admin@spms.com`
- Password: `admin123`

### Step 3: Test Features
1. ✅ Dashboard loads with stats
2. ✅ Create a patient
3. ✅ Book an appointment
4. ✅ Create medical record
5. ✅ Generate a bill

---

## 🎯 Your Live URLs

After deployment, you'll have:

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | `https://spms-xxxx.vercel.app` | ✅ Live |
| **Backend** | `https://spms-backend-xxxx.onrender.com` | ✅ Live |
| **Database** | MongoDB Atlas | ✅ Connected |

---

## 🔧 Troubleshooting

### Frontend shows "Network Error"
- Check if backend is live (visit `/api/health`)
- Verify `VITE_API_URL` in Vercel environment variables
- Check if `CLIENT_URL` is set in Render

### Backend shows "CORS Error"
- Make sure `CLIENT_URL` matches your Vercel URL exactly
- No trailing slash in URLs
- Redeploy backend after adding `CLIENT_URL`

### Can't Login
- Make sure you seeded the database
- Check backend logs in Render
- Verify MongoDB connection

### Backend Sleeps (Free Tier)
- Render free tier sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- Upgrade to paid plan for 24/7 uptime

---

## 📊 Monitoring Your App

### Render Dashboard
- View logs: Click service → "Logs" tab
- Monitor uptime
- Check deployment history

### Vercel Dashboard
- View deployments
- Check analytics
- Monitor performance

### MongoDB Atlas
- Monitor database usage
- View connection logs
- Check storage size

---

## 🎉 Success Checklist

- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] CORS configured (CLIENT_URL added)
- [ ] Database seeded with admin user
- [ ] Can login successfully
- [ ] All features working
- [ ] URLs saved for future reference

---

## 🚀 Next Steps

1. **Custom Domain** (Optional)
   - Add custom domain in Vercel
   - Update `CLIENT_URL` in Render

2. **Share Your App**
   - Share Vercel URL with team/clients
   - Add to your portfolio
   - Update GitHub README with live links

3. **Monitor & Maintain**
   - Check logs regularly
   - Monitor database size
   - Update dependencies monthly

---

## 💡 Pro Tips

1. **Bookmark Your Dashboards:**
   - Render: https://dashboard.render.com
   - Vercel: https://vercel.com/dashboard
   - MongoDB: https://cloud.mongodb.com

2. **Save Your URLs:**
   - Frontend: ___________________________
   - Backend: ___________________________

3. **Free Tier Limits:**
   - Render: 750 hours/month, sleeps after 15 min
   - Vercel: Unlimited bandwidth
   - MongoDB: 512 MB storage

---

**Need Help?** 
- Check logs in Render/Vercel dashboards
- Review DEPLOYMENT_GUIDE.md for detailed troubleshooting
- Check MongoDB Atlas connection status

**Ready to deploy? Start with Part 1! 🚀**
