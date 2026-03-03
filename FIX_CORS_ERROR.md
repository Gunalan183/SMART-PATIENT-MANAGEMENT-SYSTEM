# 🔧 Fix CORS Error - Step by Step

## Problem:
Your Vercel URL is: `https://smart-patient-management-system-k4h2enj1a.vercel.app`
But Render expects: `https://smart-patient-management-system.vercel.app`

## Solution: Update Render Environment Variables

### Step 1: Go to Render Dashboard
1. Open: https://dashboard.render.com
2. Click on your service: `smart-patient-management-system`
3. Click "Environment" tab

### Step 2: Update CLIENT_URL
Find the `CLIENT_URL` variable and update it to:

```
CLIENT_URL=https://smart-patient-management-system-k4h2enj1a.vercel.app
```

**IMPORTANT**: Copy your EXACT Vercel URL from the browser address bar!

### Step 3: Save and Redeploy
1. Click "Save Changes"
2. Wait 2-3 minutes for automatic redeploy
3. Check logs for "Server running" message

---

## Alternative: Set Production Domain in Vercel

### Option A: Use Vercel Production Domain

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Click on your project
3. Go to "Settings" → "Domains"
4. Your production domain should be: `smart-patient-management-system.vercel.app`
5. If not, add it as a domain

Then update Render `CLIENT_URL` to:
```
CLIENT_URL=https://smart-patient-management-system.vercel.app
```

---

## Quick Fix Commands

### Check Your Current Vercel URL:
Look at your browser address bar when you visit your app.

### Update Render (via Dashboard):
1. Render Dashboard → Your Service → Environment
2. Edit `CLIENT_URL` variable
3. Value: Your actual Vercel URL (with https://)
4. Save Changes

---

## Test After Fix:

1. Wait for Render to redeploy (2-3 minutes)
2. Visit your Vercel URL
3. Try to login with: admin@spms.com / admin123
4. Should work without CORS errors!

---

## If Still Not Working:

### Check Render Logs:
1. Render Dashboard → Your Service → Logs
2. Look for: "Server running in production mode"
3. Check for any CORS-related errors

### Verify Environment Variables:
Make sure these are set in Render:
- `PORT` = 5000
- `NODE_ENV` = production
- `MONGODB_URI` = your MongoDB connection string
- `JWT_SECRET` = your secret key
- `JWT_EXPIRE` = 7d
- `CLIENT_URL` = your EXACT Vercel URL

---

## Pro Tip: Support Multiple URLs

If you want to support both preview and production URLs, we need to update the backend code.

Let me know if you need this!
