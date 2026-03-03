# API Documentation - Smart Patient Management System

Base URL: `http://localhost:5000/api` (Development)

All endpoints except `/auth/login` require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User (Admin Only)
```http
POST /auth/register
```

**Headers:**
```json
{
  "Authorization": "Bearer <admin_token>",
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "name": "Dr. John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "doctor",
  "specialization": "Cardiology",
  "phone": "1234567890"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "...",
    "name": "Dr. John Doe",
    "email": "john@example.com",
    "role": "doctor",
    "specialization": "Cardiology"
  }
}
```

### Login
```http
POST /auth/login
```

**Body:**
```json
{
  "email": "admin@spms.com",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "name": "Admin User",
      "email": "admin@spms.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get Current User
```http
GET /auth/me
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Admin User",
    "email": "admin@spms.com",
    "role": "admin"
  }
}
```

### Get All Doctors
```http
GET /auth/doctors
```

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "...",
      "name": "Dr. John Doe",
      "email": "john@example.com",
      "role": "doctor",
      "specialization": "Cardiology"
    }
  ]
}
```

---

## Patient Endpoints

### Get All Patients
```http
GET /patients?search=john&page=1&limit=10
```

**Query Parameters:**
- `search` (optional): Search by name, patient ID, or phone
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response (200):**
```json
{
  "success": true,
  "count": 10,
  "total": 50,
  "totalPages": 5,
  "currentPage": 1,
  "data": [
    {
      "_id": "...",
      "patientId": "P240001",
      "name": "John Doe",
      "age": 35,
      "gender": "Male",
      "phone": "1234567890",
      "address": "123 Main St",
      "bloodGroup": "O+",
      "allergies": "None",
      "emergencyContact": {
        "name": "Jane Doe",
        "phone": "0987654321",
        "relation": "Wife"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Patient by ID
```http
GET /patients/:id
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "patientId": "P240001",
    "name": "John Doe",
    ...
  }
}
```

### Create Patient
```http
POST /patients
```

**Body:**
```json
{
  "name": "John Doe",
  "age": 35,
  "gender": "Male",
  "phone": "1234567890",
  "address": "123 Main St",
  "bloodGroup": "O+",
  "allergies": "None",
  "emergencyContact": {
    "name": "Jane Doe",
    "phone": "0987654321",
    "relation": "Wife"
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Patient registered successfully",
  "data": {
    "_id": "...",
    "patientId": "P240001",
    ...
  }
}
```

### Update Patient
```http
PUT /patients/:id
```

**Body:** Same as create (all fields optional)

**Response (200):**
```json
{
  "success": true,
  "message": "Patient updated successfully",
  "data": { ... }
}
```

### Delete Patient
```http
DELETE /patients/:id
```

**Response (200):**
```json
{
  "success": true,
  "message": "Patient deleted successfully"
}
```

---

## Appointment Endpoints

### Get All Appointments
```http
GET /appointments?date=2024-01-01&doctor=...&status=Scheduled
```

**Query Parameters:**
- `date` (optional): Filter by date (YYYY-MM-DD)
- `doctor` (optional): Filter by doctor ID
- `status` (optional): Filter by status
- `page`, `limit`: Pagination

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "...",
      "patient": {
        "_id": "...",
        "patientId": "P240001",
        "name": "John Doe",
        "phone": "1234567890"
      },
      "doctor": {
        "_id": "...",
        "name": "Dr. Smith",
        "specialization": "General"
      },
      "date": "2024-01-15T00:00:00.000Z",
      "time": "10:00 AM",
      "reason": "General Checkup",
      "status": "Scheduled"
    }
  ]
}
```

### Get Today's Appointments
```http
GET /appointments/today
```

### Get Upcoming Appointments
```http
GET /appointments/upcoming
```

### Create Appointment
```http
POST /appointments
```

**Body:**
```json
{
  "patient": "patient_id",
  "doctor": "doctor_id",
  "date": "2024-01-15",
  "time": "10:00 AM",
  "reason": "General Checkup",
  "status": "Scheduled"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Appointment booked successfully",
  "data": { ... }
}
```

**Error (400) - Time Slot Taken:**
```json
{
  "success": false,
  "message": "This time slot is already booked"
}
```

### Update Appointment
```http
PUT /appointments/:id
```

### Delete Appointment
```http
DELETE /appointments/:id
```

---

## Medical Record Endpoints

### Get All Medical Records
```http
GET /medical-records?patient=...&doctor=...
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "patient": { ... },
      "doctor": { ... },
      "visitDate": "2024-01-15T00:00:00.000Z",
      "symptoms": "Fever, headache",
      "diagnosis": "Viral infection",
      "medicines": [
        {
          "name": "Paracetamol",
          "dosage": "500mg",
          "frequency": "3 times a day",
          "duration": "5 days"
        }
      ],
      "labTests": "Blood test",
      "followUpDate": "2024-01-22T00:00:00.000Z",
      "notes": "Rest recommended"
    }
  ]
}
```

### Get Patient Medical History
```http
GET /medical-records/patient/:patientId
```

### Create Medical Record
```http
POST /medical-records
```

**Body:**
```json
{
  "patient": "patient_id",
  "doctor": "doctor_id",
  "symptoms": "Fever, headache",
  "diagnosis": "Viral infection",
  "medicines": [
    {
      "name": "Paracetamol",
      "dosage": "500mg",
      "frequency": "3 times a day",
      "duration": "5 days"
    }
  ],
  "labTests": "Blood test",
  "followUpDate": "2024-01-22",
  "notes": "Rest recommended"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Medical record created successfully",
  "data": { ... }
}
```

---

## Billing Endpoints

### Get All Bills
```http
GET /bills?patient=...&paymentStatus=Paid
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "invoiceId": "INV240001",
      "patient": { ... },
      "doctor": { ... },
      "consultationFee": 500,
      "labFee": 300,
      "medicineFee": 200,
      "discount": 10,
      "totalAmount": 900,
      "paymentStatus": "Paid",
      "paymentMethod": "Cash",
      "date": "2024-01-15T00:00:00.000Z"
    }
  ]
}
```

### Get Revenue Statistics
```http
GET /bills/stats/revenue
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalRevenue": 50000,
    "thisMonthRevenue": 15000,
    "monthlyRevenue": [
      {
        "_id": { "year": 2024, "month": 1 },
        "revenue": 15000
      }
    ]
  }
}
```

### Create Bill
```http
POST /bills
```

**Body:**
```json
{
  "patient": "patient_id",
  "doctor": "doctor_id",
  "consultationFee": 500,
  "labFee": 300,
  "medicineFee": 200,
  "discount": 10,
  "paymentStatus": "Paid",
  "paymentMethod": "Cash"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Bill created successfully",
  "data": {
    "invoiceId": "INV240001",
    "totalAmount": 900,
    ...
  }
}
```

---

## Dashboard Endpoints

### Get Admin Dashboard
```http
GET /dashboard/admin
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalPatients": 150,
      "totalDoctors": 10,
      "todayAppointments": 25,
      "monthlyRevenue": 50000
    },
    "patientGrowth": [
      { "_id": { "year": 2024, "month": 1 }, "count": 30 }
    ],
    "revenueChart": [
      { "_id": { "year": 2024, "month": 1 }, "revenue": 15000 }
    ],
    "recentActivities": [ ... ]
  }
}
```

### Get Doctor Dashboard
```http
GET /dashboard/doctor
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "stats": {
      "todayAppointments": 8,
      "totalPatients": 45,
      "upcomingAppointments": 12
    },
    "todayAppointmentsList": [ ... ],
    "upcomingAppointmentsList": [ ... ]
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized, no token provided"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Role 'receptionist' is not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server Error"
}
```

---

## Rate Limiting

- 100 requests per 15 minutes per IP
- Exceeding limit returns 429 status

---

## Testing with cURL

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@spms.com","password":"admin123"}'
```

**Get Patients (with token):**
```bash
curl -X GET http://localhost:5000/api/patients \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Create Patient:**
```bash
curl -X POST http://localhost:5000/api/patients \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Patient",
    "age": 30,
    "gender": "Male",
    "phone": "1234567890",
    "address": "Test Address",
    "bloodGroup": "O+",
    "emergencyContact": {
      "name": "Emergency Contact",
      "phone": "0987654321",
      "relation": "Friend"
    }
  }'
```

---

## Postman Collection

Import this collection to test all endpoints:

1. Create new collection in Postman
2. Add environment variable `baseUrl` = `http://localhost:5000/api`
3. Add environment variable `token` (will be set after login)
4. Import endpoints from this documentation

---

**For more details, refer to the source code in `/server/routes` and `/server/controllers`**
