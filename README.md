# 🏥 Smart Patient Management System (SPMS)

A complete, production-ready full-stack healthcare management application for digitizing clinic and hospital operations with AI-powered features.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://smart-patient-management-system.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/mongodb-5.0+-green)](https://www.mongodb.com)

## 🌐 Live Demo

- **Application**: https://smart-patient-management-system.vercel.app
- **Backend API**: https://smart-patient-management-system.onrender.com
- **Demo Login**: See [LOGIN_CREDENTIALS.md](LOGIN_CREDENTIALS.md)

---

## ✨ Key Features

### 🏥 Core Healthcare Management

#### Patient Management
- ✅ Complete patient registration with auto-generated IDs (P240001, P240002...)
- ✅ Advanced search and filtering capabilities
- ✅ Comprehensive patient profiles with demographics
- ✅ Emergency contact management
- ✅ Blood group and allergy tracking
- ✅ Patient history and visit records
- ✅ Edit and update patient information
- ✅ Delete patient records with confirmation

#### Appointment Scheduling
- ✅ Book appointments with date and time selection
- ✅ Doctor availability management
- ✅ Appointment conflict prevention
- ✅ Status tracking (Scheduled, Completed, Cancelled, No-Show)
- ✅ Reschedule and cancel appointments
- ✅ Today's appointments quick view
- ✅ Upcoming appointments dashboard
- ✅ Appointment reminders and notifications

#### Electronic Medical Records (EMR)
- ✅ Complete patient visit history
- ✅ Symptoms and diagnosis documentation
- ✅ Prescription management with medicines
- ✅ Dosage, frequency, and duration tracking
- ✅ Lab test orders and results
- ✅ Follow-up date scheduling
- ✅ Vital signs recording (BP, temperature, pulse, weight)
- ✅ Doctor notes and observations
- ✅ Medical history timeline

#### Billing & Invoicing
- ✅ Auto-generated invoice IDs (INV260001, INV260002...)
- ✅ Itemized billing (Consultation, Lab, Medicine fees)
- ✅ Automatic total calculation
- ✅ Discount management (percentage-based)
- ✅ Payment status tracking (Paid, Pending, Partial)
- ✅ Multiple payment methods (Cash, Card, UPI, Insurance)
- ✅ Invoice generation and printing
- ✅ Revenue tracking and reports
- ✅ Payment history

### 📊 Analytics & Reporting

#### Dashboard Analytics
- ✅ Real-time statistics and KPIs
- ✅ Total patients, appointments, revenue tracking
- ✅ Patient growth trends
- ✅ Revenue charts (monthly breakdown)
- ✅ Recent activities feed
- ✅ Upcoming appointments widget
- ✅ Role-based dashboard views (Admin, Doctor, Receptionist)
- ✅ Interactive data visualizations

#### Advanced Analytics Dashboard
- ✅ **PowerBI-style analytics** with 7+ chart types
- ✅ **KPI Cards** with trend indicators and comparisons
- ✅ **Appointment Trends** - Line and area charts
- ✅ **Revenue Analytics** - Monthly and category breakdown
- ✅ **Patient Demographics** - Age and gender distribution
- ✅ **Top Diagnoses** - Most common conditions
- ✅ **Department Performance** - Specialization metrics
- ✅ **Doctor Performance Table** - Detailed metrics and rankings
- ✅ **Appointment Heatmap** - Peak hours and days visualization
- ✅ **Interactive Filters** - Date range and doctor selection
- ✅ **Auto-generated Insights** - AI-powered recommendations
- ✅ **Export Reports** - Download analytics as PDF
- ✅ **Responsive Design** - Works on all devices

### 🤖 AI Health Assistant

#### Disease Prediction
- ✅ Predict diseases from symptoms with AI
- ✅ Multiple disease predictions with confidence scores
- ✅ Disease category classification
- ✅ Severity assessment (Critical, Severe, Moderate, Mild)
- ✅ Recommended actions and next steps
- ✅ Medical disclaimer and guidance
- ✅ Print prediction reports

#### Risk Assessment
- ✅ Comprehensive patient risk evaluation
- ✅ Risk level classification (Critical, High, Moderate, Low)
- ✅ Risk score calculation (0-100%)
- ✅ Contributing risk factors identification
- ✅ Urgency messages and alerts
- ✅ Personalized recommendations
- ✅ Risk level guide and interpretation
- ✅ Print assessment reports

#### AI Chatbot
- ✅ 24/7 health consultation and guidance
- ✅ Natural language processing
- ✅ Symptom analysis and triage
- ✅ Health tips and advice
- ✅ Emergency situation detection
- ✅ Conversational interface

#### Real-Time Alerts
- ✅ Critical patient alerts
- ✅ Appointment reminders
- ✅ Lab result notifications
- ✅ Follow-up reminders
- ✅ System notifications
- ✅ Alert priority levels

### 🎨 User Experience

#### Dark Mode
- ✅ Toggle between light and dark themes
- ✅ Persistent user preference
- ✅ Optimized for reduced eye strain
- ✅ Smooth theme transitions
- ✅ All components dark mode compatible
- ✅ Perfect for night shifts

#### Keyboard Shortcuts
- ✅ **Ctrl + D** - Dashboard
- ✅ **Ctrl + P** - Patients
- ✅ **Ctrl + A** - Appointments
- ✅ **Ctrl + M** - Medical Records
- ✅ **Ctrl + B** - Billing
- ✅ **Ctrl + Y** - Analytics
- ✅ **Ctrl + I** - AI Assistant
- ✅ **Ctrl + K** - Focus Search
- ✅ **Esc** - Close Modal
- ✅ **?** - Show Shortcuts Help

#### Responsive Design
- ✅ Mobile-friendly interface
- ✅ Tablet optimized layouts
- ✅ Desktop full-featured experience
- ✅ Touch-friendly controls
- ✅ Adaptive navigation

### 🔐 Security & Access Control

#### Role-Based Access Control (RBAC)
- ✅ **Admin** - Full system access and user management
- ✅ **Doctor** - Patient care and medical records
- ✅ **Receptionist** - Front desk operations
- ✅ Permission-based feature access
- ✅ Secure route protection

#### Authentication & Security
- ✅ JWT-based authentication
- ✅ Secure password hashing (bcrypt)
- ✅ Token expiration and refresh
- ✅ Protected API endpoints
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Environment variable protection

### 🛠️ Technical Features

#### Performance
- ✅ Optimized database queries
- ✅ Efficient data pagination
- ✅ Lazy loading components
- ✅ Code splitting
- ✅ Fast page load times
- ✅ Caching strategies

#### Data Management
- ✅ Real-time data updates
- ✅ Automatic data validation
- ✅ Error handling and recovery
- ✅ Data backup and restore
- ✅ Database seeding scripts
- ✅ Migration support

#### User Interface
- ✅ Modern, clean design
- ✅ Intuitive navigation
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error messages
- ✅ Success confirmations
- ✅ Modal dialogs
- ✅ Form validation feedback

---

## 📋 Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Recharts** - Data visualization library
- **React Hot Toast** - Beautiful notifications
- **Lucide React** - Modern icon library
- **React Hook Form** - Form handling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for auth
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### DevOps & Deployment
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Cloud database
- **Git** - Version control
- **npm** - Package management

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- Git
- npm or yarn

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/smart-patient-management-system.git
cd smart-patient-management-system
```

#### 2. Setup Backend
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

#### 3. Setup Frontend
```bash
cd client
npm install
cp .env.example .env
# Edit .env with your backend API URL
npm run dev
```

#### 4. Seed Database (Optional)
```bash
cd server
node utils/seedData.js
```

This will create:
- 7 Users (1 Admin, 5 Doctors, 1 Receptionist)
- 15 Patients
- 20 Appointments (March 11-20, 2026)
- 12 Medical Records
- 15 Bills

### Environment Variables

**Server (.env)**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_min_32_chars
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

**Client (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 👥 User Roles & Permissions

### 👨‍💼 Admin
- ✅ Full system access
- ✅ Create and manage users (doctors, receptionists)
- ✅ View all analytics and reports
- ✅ Manage all patients, appointments, and billing
- ✅ Access advanced analytics dashboard
- ✅ System configuration

### 👨‍⚕️ Doctor
- ✅ View assigned appointments
- ✅ Create and manage medical records
- ✅ View patient history and records
- ✅ Access dashboard with personal statistics
- ✅ Use AI health assistant features
- ✅ View analytics for their patients

### 👩‍💼 Receptionist
- ✅ Register and manage patients
- ✅ Book and manage appointments
- ✅ Create bills and invoices
- ✅ Limited dashboard access
- ✅ Patient search and lookup
- ✅ Basic reporting

---

## 🔐 Login Credentials

See [LOGIN_CREDENTIALS.md](LOGIN_CREDENTIALS.md) for all login credentials.

---

## 📊 Database Models

### User
- Authentication and role management
- Name, email, password (hashed)
- Role (admin, doctor, receptionist)
- Specialization (for doctors)
- Phone number

### Patient
- Auto-generated patient ID (P240001, P240002...)
- Personal information (name, age, gender)
- Contact details (phone, address)
- Medical information (blood group, allergies)
- Emergency contact details

### Appointment
- Patient and doctor references
- Date and time scheduling
- Reason for visit
- Status (Scheduled, Completed, Cancelled, No-Show)
- Timestamps

### Medical Record
- Patient and doctor references
- Visit date and vital signs
- Symptoms and diagnosis
- Prescription with medicines (name, dosage, frequency, duration)
- Lab tests ordered
- Follow-up date
- Doctor notes

### Bill
- Auto-generated invoice ID (INV260001, INV260002...)
- Patient and doctor references
- Itemized fees (consultation, lab, medicine)
- Discount percentage
- Total amount (auto-calculated)
- Payment status and method
- Date

### Alert
- Type (critical, warning, info)
- Message and description
- Patient reference
- Priority level
- Read status
- Timestamps

---

## 📱 API Endpoints

### Authentication
```
POST   /api/auth/register      - Register new user (Admin only)
POST   /api/auth/login         - User login
GET    /api/auth/me            - Get current user
GET    /api/auth/doctors       - Get all doctors
GET    /api/auth/users         - Get all users (Admin only)
```

### Patients
```
GET    /api/patients           - Get all patients (with search)
GET    /api/patients/:id       - Get patient by ID
POST   /api/patients           - Create patient
PUT    /api/patients/:id       - Update patient
DELETE /api/patients/:id       - Delete patient
```

### Appointments
```
GET    /api/appointments       - Get all appointments
GET    /api/appointments/today - Get today's appointments
GET    /api/appointments/:id   - Get appointment by ID
POST   /api/appointments       - Create appointment
PUT    /api/appointments/:id   - Update appointment
DELETE /api/appointments/:id   - Delete appointment
```

### Medical Records
```
GET    /api/medical-records              - Get all records
GET    /api/medical-records/patient/:id  - Get patient history
GET    /api/medical-records/:id          - Get record by ID
POST   /api/medical-records              - Create record
PUT    /api/medical-records/:id          - Update record
DELETE /api/medical-records/:id          - Delete record
```

### Billing
```
GET    /api/bills                - Get all bills
GET    /api/bills/stats/revenue  - Get revenue statistics
GET    /api/bills/:id            - Get bill by ID
POST   /api/bills                - Create bill
PUT    /api/bills/:id            - Update bill
DELETE /api/bills/:id            - Delete bill
```

### Dashboard
```
GET    /api/dashboard/admin      - Admin dashboard data
GET    /api/dashboard/doctor     - Doctor dashboard data
GET    /api/dashboard/stats      - General statistics
```

### Analytics
```
GET    /api/analytics/overview           - Overview statistics
GET    /api/analytics/appointments       - Appointment analytics
GET    /api/analytics/revenue            - Revenue analytics
GET    /api/analytics/patients           - Patient demographics
GET    /api/analytics/diagnoses          - Top diagnoses
GET    /api/analytics/departments        - Department performance
GET    /api/analytics/doctors            - Doctor performance
GET    /api/analytics/heatmap            - Appointment heatmap
```

### AI Features
```
POST   /api/ai/predict-disease   - Predict disease from symptoms
POST   /api/ai/assess-risk       - Assess patient risk level
POST   /api/ai/chat              - AI chatbot conversation
GET    /api/ai/alerts            - Get real-time alerts
```

---

## 🚀 Deployment

### Backend Deployment (Render)

1. Create account on [Render.com](https://render.com)
2. Create new **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Add environment variables from `.env.example`
6. Deploy

### Frontend Deployment (Vercel)

1. Create account on [Vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variable: `VITE_API_URL=your_backend_url/api`
5. Deploy

### Database Setup (MongoDB Atlas)

1. Create account on [MongoDB.com](https://www.mongodb.com/cloud/atlas)
2. Create new **Cluster** (Free tier available)
3. Create **Database User** with password
4. **Network Access**: Add IP `0.0.0.0/0` (allow from anywhere)
5. Get **Connection String**
6. Update `MONGODB_URI` in environment variables

---

## 🛠️ Development

### Running in Development Mode

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

### Building for Production

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

### Code Quality

**Linting:**
```bash
npm run lint
```

**Formatting:**
```bash
npm run format
```

---

## 📚 Documentation

- [Complete Features Summary](COMPLETE_FEATURES_SUMMARY.md)
- [AI Features Documentation](AI_FEATURES_DOCUMENTATION.md)
- [Analytics Dashboard Guide](ANALYTICS_DASHBOARD.md)
- [Developer Guide](DEVELOPER_GUIDE.md)
- [Deployment Guide](FINAL_DEPLOYMENT_CONFIG.md)
- [Quick Start Guide](QUICK_START.md)
- [Login Credentials](LOGIN_CREDENTIALS.md)

---

## 🎯 Roadmap

### Upcoming Features
- [ ] SMS and Email notifications
- [ ] Video consultation integration
- [ ] Lab integration for test results
- [ ] Pharmacy management
- [ ] Insurance claim processing
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Telemedicine features
- [ ] Patient portal
- [ ] Advanced reporting and exports

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with the MERN stack
- UI inspired by modern healthcare management systems
- Icons by [Lucide React](https://lucide.dev)
- Charts by [Recharts](https://recharts.org)
- Styling by [Tailwind CSS](https://tailwindcss.com)

---

## 📧 Support

For support and queries:
- 📧 Email: support@spms.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/smart-patient-management-system/issues)
- 📖 Documentation: See docs folder

---

## ⭐ Show Your Support

If you find this project helpful, please give it a ⭐ on GitHub!

---

**Made with ❤️ for better healthcare management**
