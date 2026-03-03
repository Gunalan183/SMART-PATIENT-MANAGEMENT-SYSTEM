# Smart Patient Management System - Project Structure

```
smart-patient-management-system/
│
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Patient.js
│   │   ├── Appointment.js
│   │   ├── MedicalRecord.js
│   │   └── Bill.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── patientController.js
│   │   ├── appointmentController.js
│   │   ├── medicalRecordController.js
│   │   ├── billController.js
│   │   └── dashboardController.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── patientRoutes.js
│   │   ├── appointmentRoutes.js
│   │   ├── medicalRecordRoutes.js
│   │   ├── billRoutes.js
│   │   └── dashboardRoutes.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validationMiddleware.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── utils/
│   │   ├── generateId.js
│   │   └── pdfGenerator.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Table.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── Toast.jsx
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── StatsCard.jsx
│   │   │   │   ├── PatientGrowthChart.jsx
│   │   │   │   ├── RevenueChart.jsx
│   │   │   │   └── RecentActivities.jsx
│   │   │   │
│   │   │   ├── patients/
│   │   │   │   ├── PatientForm.jsx
│   │   │   │   ├── PatientList.jsx
│   │   │   │   └── PatientProfile.jsx
│   │   │   │
│   │   │   ├── appointments/
│   │   │   │   ├── AppointmentForm.jsx
│   │   │   │   ├── AppointmentList.jsx
│   │   │   │   └── UpcomingAppointments.jsx
│   │   │   │
│   │   │   ├── medical/
│   │   │   │   ├── MedicalRecordForm.jsx
│   │   │   │   └── PrescriptionView.jsx
│   │   │   │
│   │   │   └── billing/
│   │   │       ├── BillForm.jsx
│   │   │       └── InvoiceView.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   │
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Patients.jsx
│   │   │   ├── Appointments.jsx
│   │   │   ├── MedicalRecords.jsx
│   │   │   └── Billing.jsx
│   │   │
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx
│   │   │   └── AuthLayout.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ToastContext.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── patientService.js
│   │   │   ├── appointmentService.js
│   │   │   ├── medicalRecordService.js
│   │   │   └── billService.js
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useToast.js
│   │   │
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── index.html
│
└── README.md
```
