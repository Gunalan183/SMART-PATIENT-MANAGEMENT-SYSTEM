# 🌱 Seed Database with Sample Data

## What Gets Created

The enhanced seed script creates comprehensive sample data:

### 👥 Users (7 total)
- **1 Admin**: Full system access
- **5 Doctors**: Different specializations
  - Dr. Anil Sharma - General Physician
  - Dr. Priya Reddy - Cardiologist
  - Dr. Rajesh Gupta - Pediatrician
  - Dr. Sneha Iyer - Dermatologist
  - Dr. Vikram Singh - Orthopedic
- **1 Receptionist**: Patient and appointment management

### 🏥 Patients (10 total)
- Complete patient profiles with:
  - Auto-generated Patient IDs (P240001 - P240010)
  - Demographics (age, gender, blood group)
  - Contact information
  - Emergency contacts
  - Medical allergies

### 📅 Appointments (11 total)
- **Today**: 4 scheduled appointments
- **Yesterday**: 3 completed appointments
- **Tomorrow**: 3 upcoming appointments
- **Next Week**: 1 follow-up appointment

### 📋 Medical Records (3 total)
- Complete medical history for completed appointments
- Includes:
  - Symptoms and diagnosis
  - Prescribed medicines with dosage
  - Lab tests ordered
  - Vital signs (BP, temperature, pulse, weight)
  - Follow-up dates
  - Doctor's notes

### 💰 Bills (5 total)
- **3 Paid bills**: From completed appointments
- **2 Pending bills**: From today's appointments
- Includes:
  - Auto-generated Invoice IDs (INV240001 - INV240005)
  - Consultation, lab, and medicine fees
  - Discounts and total amounts
  - Payment methods (Cash, Card, UPI)

---

## 🚀 How to Seed

### For Local Development:

```bash
# Navigate to server directory
cd server

# Run seed script
npm run seed
```

### For Production (Render):

**Option 1: From Local Machine**
```bash
# Make sure your .env points to production MongoDB
cd server
npm run seed
```

**Option 2: Using Render Shell**
1. Go to Render Dashboard
2. Click on your service
3. Click "Shell" tab
4. Run: `npm run seed`

---

## 📊 Expected Output

```
🗑️  Clearing existing data...
✅ Existing data cleared

👥 Creating users...
✅ Created 7 users (1 Admin, 5 Doctors, 1 Receptionist)

🏥 Creating patients...
✅ Created 10 patients

📅 Creating appointments...
✅ Created 11 appointments

📋 Creating medical records...
✅ Created 3 medical records

💰 Creating bills...
✅ Created 5 bills

═══════════════════════════════════════════════════════
✅ DATABASE SEEDED SUCCESSFULLY!
═══════════════════════════════════════════════════════

📊 Summary:
   • Users: 7 (1 Admin, 5 Doctors, 1 Receptionist)
   • Patients: 10
   • Appointments: 11
   • Medical Records: 3
   • Bills: 5

🔐 Login Credentials:
═══════════════════════════════════════════════════════

👨‍💼 ADMIN:
   Email: admin@spms.com
   Password: admin123

👨‍⚕️ DOCTORS:
   1. Dr. Anil Sharma (General Physician)
      Email: anil.sharma@spms.com
      Password: doctor123

   2. Dr. Priya Reddy (Cardiologist)
      Email: priya.reddy@spms.com
      Password: doctor123

   3. Dr. Rajesh Gupta (Pediatrician)
      Email: rajesh.gupta@spms.com
      Password: doctor123

   4. Dr. Sneha Iyer (Dermatologist)
      Email: sneha.iyer@spms.com
      Password: doctor123

   5. Dr. Vikram Singh (Orthopedic)
      Email: vikram.singh@spms.com
      Password: doctor123

👩‍💼 RECEPTIONIST:
   Email: receptionist@spms.com
   Password: receptionist123

═══════════════════════════════════════════════════════
🎉 You can now login and explore the system!
═══════════════════════════════════════════════════════
```

---

## 🎯 What to Explore After Seeding

### As Admin (admin@spms.com):
1. **Dashboard**
   - View total patients (10)
   - View total doctors (5)
   - View today's appointments (4)
   - View monthly revenue charts
   - View patient growth charts

2. **Patients**
   - Browse 10 patient records
   - Search patients by name/ID
   - View patient details

3. **Appointments**
   - See today's 4 appointments
   - View upcoming appointments
   - Filter by doctor/date

4. **Medical Records**
   - View 3 completed medical records
   - See prescriptions and diagnoses

5. **Billing**
   - View 5 invoices
   - Check payment status
   - View revenue statistics

6. **Register User**
   - Create more doctors
   - Create more receptionists

### As Doctor (e.g., anil.sharma@spms.com):
1. **Dashboard**
   - View your today's appointments
   - See your patient list
   - Check upcoming appointments

2. **Appointments**
   - View your scheduled appointments
   - Update appointment status

3. **Medical Records**
   - Create new medical records
   - View patient history
   - Write prescriptions

### As Receptionist (receptionist@spms.com):
1. **Patients**
   - Register new patients
   - Update patient information

2. **Appointments**
   - Book new appointments
   - Manage appointment schedule

3. **Billing**
   - Create bills
   - Update payment status

---

## 🔄 Re-seeding

To clear and re-seed the database:

```bash
cd server
npm run seed
```

**⚠️ Warning**: This will delete ALL existing data and create fresh sample data.

---

## 📝 Sample Data Details

### Patient Demographics:
- Age range: 26-55 years
- Gender: 5 Male, 5 Female
- Blood groups: All major types (O+, A+, B+, AB+, O-, A-, B-, AB-)
- Locations: Major Indian cities (Delhi, Mumbai, Bangalore, Pune, etc.)

### Appointment Distribution:
- Morning slots: 9:00 AM - 11:30 AM
- Afternoon slots: 2:00 PM - 3:00 PM
- Status: Scheduled, Completed
- Reasons: General checkup, specific complaints, follow-ups

### Medical Records Include:
- Common conditions: Viral fever, allergic dermatitis, angina
- Realistic prescriptions with proper dosages
- Lab tests: CBC, ECG, Lipid Profile, Allergy Tests
- Vital signs within normal ranges

### Bills Range:
- Consultation: ₹500 - ₹1,000
- Lab fees: ₹0 - ₹2,500
- Medicine: ₹0 - ₹1,200
- Total: ₹500 - ₹4,700
- Discounts: 0% - 10%

---

## 🎨 Dashboard Will Show:

After seeding, your dashboard will display:

- **Total Patients**: 10
- **Total Doctors**: 5
- **Today's Appointments**: 4
- **Monthly Revenue**: ₹8,472.50 (from paid bills)
- **Patient Growth Chart**: With data points
- **Revenue Chart**: With monthly data
- **Recent Activities**: Latest appointments
- **Upcoming Appointments**: Next scheduled visits

---

## 💡 Tips

1. **Test Different Roles**: Login with different accounts to see role-based access
2. **Create More Data**: Use the UI to add more patients, appointments, etc.
3. **Test Features**: Try all CRUD operations
4. **Check Analytics**: View charts and statistics
5. **Test Search**: Search patients by name, ID, or phone

---

## 🐛 Troubleshooting

### Error: "MongooseServerSelectionError"
- Check MongoDB connection string in `.env`
- Verify internet connection
- Check MongoDB Atlas network access

### Error: "Duplicate key error"
- Database already has data
- Run seed again (it clears existing data first)

### Error: "Cannot find module"
- Run `npm install` in server directory
- Check all model files exist

---

**Ready to seed? Run `npm run seed` in the server directory! 🌱**
