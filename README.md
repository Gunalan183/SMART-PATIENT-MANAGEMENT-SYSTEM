# Smart Patient Management System (SPMS)

A complete, production-ready full-stack web application for digitizing clinic and hospital operations.

## 🌐 Live Demo

- **Application**: https://smart-patient-management-system.vercel.app
- **Backend API**: https://smart-patient-management-system.onrender.com
- **Demo Login**: admin@spms.com / admin123

## 🚀 Features

### Core Functionality
- **Patient Management**: Register, edit, search, and manage patient records with auto-generated IDs
- **Appointment Scheduling**: Book, reschedule, and manage appointments with conflict prevention
- **Electronic Medical Records (EMR)**: Complete patient history, prescriptions, and diagnoses
- **Billing System**: Generate invoices with automatic calculations and payment tracking
- **Dashboard Analytics**: Real-time statistics with interactive charts
- **Role-Based Access Control**: Admin, Doctor, and Receptionist roles with specific permissions

### Technical Features
- JWT-based authentication with secure password hashing
- RESTful API architecture
- MongoDB database with optimized schemas
- Responsive UI with Tailwind CSS
- Real-time data updates
- Input validation and error handling
- Search and pagination
- Auto-generated IDs for patients and invoices

## 📋 Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- React Hook Form for form handling
- Recharts for data visualization
- React Hot Toast for notifications
- Lucide React for icons

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- Express Validator for input validation
- Morgan for logging
- CORS enabled

## 🏗️ Project Structure

```
smart-patient-management-system/
├── server/                 # Backend application
│   ├── models/            # Mongoose schemas
│   ├── controllers/       # Route controllers
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── config/           # Configuration files
│   ├── utils/            # Utility functions
│   └── server.js         # Entry point
│
└── client/               # Frontend application
    └── src/
        ├── components/   # Reusable components
        ├── pages/        # Page components
        ├── services/     # API services
        ├── context/      # React context
        ├── hooks/        # Custom hooks
        ├── layouts/      # Layout components
        └── utils/        # Helper functions
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd smart-patient-management-system
```

2. **Setup Backend**
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

3. **Setup Frontend**
```bash
cd client
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Environment Variables

**Server (.env)**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

**Client (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

## 👥 User Roles & Permissions

### Admin
- Full system access
- Create users (doctors, receptionists)
- View all analytics and reports
- Manage all patients, appointments, and billing

### Doctor
- View assigned appointments
- Create and manage medical records
- View patient history
- Access dashboard with personal statistics

### Receptionist
- Register and manage patients
- Book and manage appointments
- Create bills and invoices
- Limited dashboard access

## 🔐 Default Credentials

After seeding the database, use these credentials:

```
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

## 📊 Database Models

### User
- Authentication and role management
- Supports admin, doctor, and receptionist roles

### Patient
- Auto-generated patient ID
- Complete demographic information
- Emergency contact details

### Appointment
- Patient and doctor references
- Date and time scheduling
- Status tracking (Scheduled, Completed, Cancelled)
- Conflict prevention

### Medical Record
- Patient visit history
- Symptoms and diagnosis
- Prescription with medicines
- Lab tests and follow-up dates

### Bill
- Auto-generated invoice ID
- Itemized billing
- Discount calculation
- Payment status tracking

## 🚀 Deployment

### Backend (Render)

1. Create account on Render.com
2. Create new Web Service
3. Connect your repository
4. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables
6. Deploy

### Frontend (Vercel)

1. Create account on Vercel.com
2. Import your repository
3. Configure:
   - Framework: Vite
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variables
5. Deploy

### Database (MongoDB Atlas)

1. Create account on MongoDB.com
2. Create new cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all)
5. Get connection string
6. Update MONGODB_URI in environment variables

## 📱 API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user (Admin only)
- POST `/api/auth/login` - User login
- GET `/api/auth/me` - Get current user
- GET `/api/auth/doctors` - Get all doctors

### Patients
- GET `/api/patients` - Get all patients
- GET `/api/patients/:id` - Get patient by ID
- POST `/api/patients` - Create patient
- PUT `/api/patients/:id` - Update patient
- DELETE `/api/patients/:id` - Delete patient

### Appointments
- GET `/api/appointments` - Get all appointments
- GET `/api/appointments/today` - Get today's appointments
- POST `/api/appointments` - Create appointment
- PUT `/api/appointments/:id` - Update appointment
- DELETE `/api/appointments/:id` - Delete appointment

### Medical Records
- GET `/api/medical-records` - Get all records
- GET `/api/medical-records/patient/:id` - Get patient history
- POST `/api/medical-records` - Create record
- PUT `/api/medical-records/:id` - Update record

### Billing
- GET `/api/bills` - Get all bills
- GET `/api/bills/stats/revenue` - Get revenue statistics
- POST `/api/bills` - Create bill
- PUT `/api/bills/:id` - Update bill

### Dashboard
- GET `/api/dashboard/admin` - Admin dashboard data
- GET `/api/dashboard/doctor` - Doctor dashboard data

## 🛠️ Development

### Running Tests
```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

### Code Style
- ESLint for code linting
- Prettier for code formatting

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email support@spms.com or create an issue in the repository.

## 🙏 Acknowledgments

- Built with modern MERN stack
- UI inspired by healthcare management systems
- Icons by Lucide React
- Charts by Recharts
