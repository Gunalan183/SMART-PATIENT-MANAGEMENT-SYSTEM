# Complete Setup Guide - Smart Patient Management System

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Database Setup](#database-setup)
3. [Seeding Initial Data](#seeding-initial-data)
4. [Production Deployment](#production-deployment)
5. [Troubleshooting](#troubleshooting)

---

## Local Development Setup

### Step 1: Install Prerequisites

**Install Node.js**
- Download from https://nodejs.org/ (v16 or higher)
- Verify installation:
```bash
node --version
npm --version
```

**Install Git**
- Download from https://git-scm.com/
- Verify installation:
```bash
git --version
```

### Step 2: Clone and Setup Project

```bash
# Clone repository
git clone <your-repository-url>
cd smart-patient-management-system

# Setup backend
cd server
npm install

# Setup frontend
cd ../client
npm install
```

### Step 3: Configure Environment Variables

**Backend Configuration (server/.env)**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/spms?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

**Frontend Configuration (client/.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Start Development Servers

**Terminal 1 - Backend**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend**
```bash
cd client
npm run dev
```

Access the application at: http://localhost:5173

---

## Database Setup

### Option 1: MongoDB Atlas (Recommended for Production)

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "Free" tier (M0)
   - Select cloud provider and region
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Set username and password
   - Set role to "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `spms`

### Option 2: Local MongoDB

1. **Install MongoDB**
   - Download from https://www.mongodb.com/try/download/community
   - Follow installation instructions for your OS

2. **Start MongoDB**
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

3. **Connection String**
```env
MONGODB_URI=mongodb://localhost:27017/spms
```

---

## Seeding Initial Data

### Create Admin User Manually

After starting the backend server, use this API call to create the first admin user:

**Using cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@spms.com",
    "password": "admin123",
    "role": "admin"
  }'
```

**Using Postman:**
1. Create POST request to `http://localhost:5000/api/auth/register`
2. Set Headers: `Content-Type: application/json`
3. Set Body (raw JSON):
```json
{
  "name": "Admin User",
  "email": "admin@spms.com",
  "password": "admin123",
  "role": "admin"
}
```

### Create Sample Data

After logging in as admin, create:

1. **Doctors**
   - Navigate to "Register User"
   - Create doctor accounts with specializations

2. **Patients**
   - Navigate to "Patients"
   - Add sample patient records

3. **Appointments**
   - Navigate to "Appointments"
   - Book sample appointments

---

## Production Deployment

### Deploy Backend to Render

1. **Prepare Repository**
   - Push code to GitHub/GitLab
   - Ensure `.gitignore` excludes `.env` and `node_modules`

2. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

3. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your repository
   - Configure:
     - Name: `spms-backend`
     - Root Directory: `server`
     - Environment: `Node`
     - Build Command: `npm install`
     - Start Command: `npm start`
     - Instance Type: Free

4. **Add Environment Variables**
   - Click "Environment"
   - Add all variables from `.env`:
     - `PORT`: 5000
     - `NODE_ENV`: production
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Your secret key
     - `JWT_EXPIRE`: 7d
     - `CLIENT_URL`: Your frontend URL (will add after deploying frontend)

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy the service URL (e.g., `https://spms-backend.onrender.com`)

### Deploy Frontend to Vercel

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your repository
   - Configure:
     - Framework Preset: Vite
     - Root Directory: `client`
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Add Environment Variables**
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = Your Render backend URL + `/api`
   - Example: `https://spms-backend.onrender.com/api`

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment
   - Copy the deployment URL

5. **Update Backend CORS**
   - Go back to Render dashboard
   - Update `CLIENT_URL` environment variable with Vercel URL
   - Redeploy backend service

### Configure MongoDB Atlas for Production

1. **Update Network Access**
   - Go to MongoDB Atlas
   - Network Access → Add IP Address
   - Add Render's IP addresses or use 0.0.0.0/0

2. **Verify Connection**
   - Check Render logs for successful database connection
   - Test API endpoints

---

## Troubleshooting

### Common Issues

**1. MongoDB Connection Failed**
```
Error: MongooseServerSelectionError
```
**Solution:**
- Check MongoDB URI is correct
- Verify network access in MongoDB Atlas
- Ensure database user has correct permissions

**2. CORS Error**
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Verify `CLIENT_URL` in backend `.env`
- Check CORS configuration in `server.js`
- Ensure frontend is using correct API URL

**3. JWT Authentication Failed**
```
Error: Not authorized, token failed
```
**Solution:**
- Check `JWT_SECRET` is set in backend
- Verify token is being sent in Authorization header
- Clear browser localStorage and login again

**4. Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

**5. Module Not Found**
```
Error: Cannot find module 'express'
```
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Development Tips

1. **Hot Reload Not Working**
   - Restart development server
   - Check file watchers limit (Linux)

2. **Slow API Responses**
   - Check MongoDB indexes
   - Optimize queries with `.lean()`
   - Add pagination to large datasets

3. **Memory Issues**
   - Increase Node.js memory limit:
   ```bash
   NODE_OPTIONS=--max_old_space_size=4096 npm run dev
   ```

### Getting Help

- Check server logs: `npm run dev` output
- Check browser console for frontend errors
- Review MongoDB Atlas logs
- Check Render/Vercel deployment logs

---

## Next Steps

After successful setup:

1. ✅ Create admin user
2. ✅ Login and explore dashboard
3. ✅ Create doctor and receptionist users
4. ✅ Add sample patients
5. ✅ Book appointments
6. ✅ Create medical records
7. ✅ Generate bills
8. ✅ Review analytics

## Security Checklist for Production

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET (min 32 characters)
- [ ] Enable MongoDB authentication
- [ ] Restrict MongoDB network access
- [ ] Use HTTPS for all connections
- [ ] Set secure CORS origins
- [ ] Enable rate limiting
- [ ] Regular database backups
- [ ] Monitor error logs
- [ ] Keep dependencies updated

---

**Need Help?** Create an issue in the repository or contact support.
