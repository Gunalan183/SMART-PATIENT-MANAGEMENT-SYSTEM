# Quick Start Guide - SPMS

Your MongoDB credentials have been configured! Follow these steps to get started:

## ✅ Prerequisites Installed
- Node.js (v16+)
- npm or yarn

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Dependencies

Open your terminal and run:

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Step 2: Seed the Database

```bash
# From the server directory
cd server
npm run seed
```

You should see:
```
✅ Database seeded successfully!

Login Credentials:
==================
Admin:
  Email: admin@spms.com
  Password: admin123

Doctor:
  Email: doctor@spms.com
  Password: doctor123

Receptionist:
  Email: receptionist@spms.com
  Password: receptionist123
```

### Step 3: Start the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```

Wait for: `Server running in development mode on port 5000`

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```

Wait for: `Local: http://localhost:5173/`

### Step 4: Access the Application

1. Open your browser
2. Go to: **http://localhost:5173**
3. Login with:
   - **Email**: admin@spms.com
   - **Password**: admin123

## 🎯 What to Try First

1. **Dashboard** - View statistics and charts
2. **Patients** - Add a new patient (auto-generates ID)
3. **Appointments** - Book an appointment
4. **Medical Records** - Create a patient record
5. **Billing** - Generate an invoice
6. **Register User** - Create new doctor/receptionist accounts

## 📊 Your Database Info

- **Connection**: MongoDB Atlas (Cloud)
- **Cluster**: cluster0.jartz9l.mongodb.net
- **Database**: spms
- **Status**: ✅ Connected and Ready

## 🔧 Troubleshooting

### Backend won't start?
```bash
# Check if port 5000 is available
# Windows:
netstat -ano | findstr :5000

# Mac/Linux:
lsof -ti:5000
```

### Frontend won't start?
```bash
# Clear cache and reinstall
cd client
rm -rf node_modules package-lock.json
npm install
```

### Database connection error?
- Check your internet connection
- Verify MongoDB Atlas cluster is running
- Check credentials in `server/.env`

### Can't login?
- Make sure you ran `npm run seed` in the server directory
- Check backend console for errors
- Clear browser cache and try again

## 📱 Test the API

Test if backend is working:
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{"success":true,"message":"Server is running"}
```

## 🎨 UI Features

Based on your design mockup, the app includes:
- ✅ Blue medical theme
- ✅ Sidebar navigation
- ✅ Dashboard with stats cards
- ✅ Patient growth chart
- ✅ Monthly revenue chart
- ✅ Upcoming appointments list
- ✅ Recent activities feed
- ✅ Responsive tables
- ✅ Modal forms
- ✅ Toast notifications

## 📚 Next Steps

1. Explore all features as Admin
2. Create a doctor account and login
3. Create a receptionist account and login
4. Test different role permissions
5. Add more sample data
6. Customize the UI colors/theme
7. Deploy to production (see DEPLOYMENT_GUIDE.md)

## 🚀 Ready for Production?

When you're ready to deploy:
1. Read **DEPLOYMENT_GUIDE.md**
2. Deploy backend to Render
3. Deploy frontend to Vercel
4. Update environment variables

## 💡 Tips

- Use **Ctrl+C** to stop servers
- Backend auto-restarts on file changes (nodemon)
- Frontend hot-reloads on file changes (Vite)
- Check browser console for frontend errors
- Check terminal for backend errors

## 📞 Need Help?

- Check **SETUP_GUIDE.md** for detailed setup
- Check **API_DOCUMENTATION.md** for API reference
- Check **README.md** for project overview

---

**Happy Coding! 🎉**

Your Smart Patient Management System is ready to use!
