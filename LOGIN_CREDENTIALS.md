# 🔐 Login Credentials

This document contains all login credentials for the Smart Patient Management System (SPMS).

---

## 🌐 Live Demo Access

**Application URL**: https://smart-patient-management-system.vercel.app

---

## 👥 User Accounts

After seeding the database with `node server/utils/seedData.js`, the following accounts are available:

---

### 👨‍💼 Admin Account

**Full system access with all permissions**

```
Email:    admin@spms.com
Password: admin123
```

**Permissions:**
- ✅ Full system access
- ✅ Create and manage users (doctors, receptionists)
- ✅ View all analytics and reports
- ✅ Manage all patients, appointments, and billing
- ✅ Access advanced analytics dashboard
- ✅ System configuration and settings

---

### 👨‍⚕️ Doctor Accounts

**Access to patient care and medical records**

#### 1. Dr. Anil Sharma (General Physician)
```
Email:    anil.sharma@spms.com
Password: doctor123
```

#### 2. Dr. Priya Reddy (Cardiologist)
```
Email:    priya.reddy@spms.com
Password: doctor123
```

#### 3. Dr. Rajesh Gupta (Pediatrician)
```
Email:    rajesh.gupta@spms.com
Password: doctor123
```

#### 4. Dr. Sneha Iyer (Dermatologist)
```
Email:    sneha.iyer@spms.com
Password: doctor123
```

#### 5. Dr. Vikram Singh (Orthopedic)
```
Email:    vikram.singh@spms.com
Password: doctor123
```

**Doctor Permissions:**
- ✅ View assigned appointments
- ✅ Create and manage medical records
- ✅ View patient history and records
- ✅ Access dashboard with personal statistics
- ✅ Use AI health assistant features
- ✅ View analytics for their patients

---

### 👩‍💼 Receptionist Account

**Front desk operations and patient management**

```
Email:    receptionist@spms.com
Password: receptionist123
```

**Receptionist Permissions:**
- ✅ Register and manage patients
- ✅ Book and manage appointments
- ✅ Create bills and invoices
- ✅ Limited dashboard access
- ✅ Patient search and lookup
- ✅ Basic reporting

---

## 📊 Seeded Data Summary

When you run the seed script, the following data is created:

| Data Type | Count | Details |
|-----------|-------|---------|
| **Users** | 7 | 1 Admin, 5 Doctors, 1 Receptionist |
| **Patients** | 15 | Complete patient profiles with demographics |
| **Appointments** | 20 | Scheduled from March 11-20, 2026 |
| **Medical Records** | 12 | Complete visit history with prescriptions |
| **Bills** | 15 | Invoices with various payment statuses |

---

## 🔄 How to Seed the Database

If you need to reset or populate the database with sample data:

```bash
# Navigate to server directory
cd server

# Run the seed script
node utils/seedData.js
```

**Note:** This will clear all existing data and create fresh sample data.

---

## 🛡️ Security Best Practices

### For Development
- ✅ Use the provided credentials for testing
- ✅ Keep `.env` files secure and never commit them
- ✅ Change default passwords in production

### For Production
- ⚠️ **IMPORTANT**: Change all default passwords before deploying to production
- ⚠️ Use strong, unique passwords (minimum 12 characters)
- ⚠️ Enable two-factor authentication if available
- ⚠️ Regularly rotate passwords
- ⚠️ Monitor login attempts and suspicious activity
- ⚠️ Use environment variables for sensitive data

---

## 🔑 Password Requirements

When creating new users in production:

- Minimum 6 characters (8+ recommended)
- Mix of uppercase and lowercase letters
- Include numbers
- Include special characters
- Avoid common words or patterns
- Don't reuse passwords

---

## 🚀 Quick Start Guide

### 1. Login to the System
1. Open the application URL
2. Enter email and password from above
3. Click "Login"

### 2. First Time Setup (Admin)
1. Login as admin
2. Navigate to "Register User" page
3. Create additional users as needed
4. Configure system settings

### 3. Testing Different Roles
1. Logout from current account
2. Login with different role credentials
3. Explore role-specific features and permissions

---

## 📝 Creating New Users

### As Admin:

1. **Login** as admin
2. Navigate to **"Register User"** page (Ctrl + R)
3. Fill in the form:
   - Name
   - Email
   - Password
   - Role (Admin/Doctor/Receptionist)
   - Specialization (for doctors)
   - Phone number
4. Click **"Register User"**

### User Roles Explained:

| Role | Access Level | Use Case |
|------|--------------|----------|
| **Admin** | Full Access | System administrators, clinic owners |
| **Doctor** | Medical Access | Healthcare providers, physicians |
| **Receptionist** | Front Desk | Patient registration, appointments, billing |

---

## 🔒 Password Reset

Currently, password reset is handled manually by administrators. To reset a user's password:

1. Login as admin
2. Access user management
3. Update user password
4. Notify the user of the new password

**Future Enhancement:** Self-service password reset via email will be added.

---

## 📧 Support

If you encounter login issues:

1. **Verify credentials** - Check email and password spelling
2. **Check database** - Ensure database is seeded
3. **Clear browser cache** - Try incognito/private mode
4. **Check backend** - Ensure server is running
5. **Contact support** - Email: support@spms.com

---

## 🎯 Testing Scenarios

### Scenario 1: Admin Workflow
```
Login: admin@spms.com / admin123
1. View dashboard with all statistics
2. Create a new doctor user
3. View all patients and appointments
4. Access advanced analytics
5. Generate reports
```

### Scenario 2: Doctor Workflow
```
Login: anil.sharma@spms.com / doctor123
1. View assigned appointments
2. Create medical record for a patient
3. Write prescriptions
4. Use AI health assistant
5. View patient history
```

### Scenario 3: Receptionist Workflow
```
Login: receptionist@spms.com / receptionist123
1. Register a new patient
2. Book an appointment
3. Create a bill
4. Search for patients
5. View today's appointments
```

---

## 📱 Mobile Access

All credentials work on mobile devices as well. The application is fully responsive and optimized for:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Desktop computers

---

## ⚠️ Important Notes

1. **Default Passwords**: All default passwords are for development/testing only
2. **Production Security**: Change all passwords before production deployment
3. **Data Privacy**: Follow HIPAA/local healthcare data regulations
4. **Access Control**: Regularly audit user access and permissions
5. **Backup**: Regularly backup user credentials and database

---

## 🔄 Credential Management

### Best Practices:
- ✅ Store credentials securely (password manager)
- ✅ Use different passwords for each environment
- ✅ Document password changes
- ✅ Implement password expiration policies
- ✅ Monitor failed login attempts
- ✅ Enable session timeout
- ✅ Use HTTPS in production

---

## 📚 Related Documentation

- [README.md](README.md) - Main project documentation
- [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) - Development setup
- [DEPLOYMENT_GUIDE.md](FINAL_DEPLOYMENT_CONFIG.md) - Production deployment
- [SECURITY.md](SECURITY.md) - Security guidelines

---

## 🆘 Troubleshooting

### Cannot Login?
- ✅ Check if backend server is running
- ✅ Verify database connection
- ✅ Ensure database is seeded
- ✅ Check browser console for errors
- ✅ Try different browser

### Forgot Password?
- Contact admin to reset password
- Or re-seed the database (development only)

### Account Locked?
- Contact system administrator
- Check for failed login attempts

---

**Last Updated**: March 2026

**Security Level**: Development/Testing

**For Production**: Update all credentials before deployment

---

**Made with 🔒 for secure healthcare management**
