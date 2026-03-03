import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Patient from '../models/Patient.js';
import Appointment from '../models/Appointment.js';
import MedicalRecord from '../models/MedicalRecord.js';
import Bill from '../models/Bill.js';
import connectDB from '../config/db.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Patient.deleteMany({});
    await Appointment.deleteMany({});
    await MedicalRecord.deleteMany({});
    await Bill.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Create users (Admin, Doctors, Receptionist)
    console.log('👥 Creating users...');
    const users = await User.create([
      {
        name: 'Admin User',
        email: 'admin@spms.com',
        password: 'admin123',
        role: 'admin',
        phone: '9876543210'
      },
      {
        name: 'Dr. Anil Sharma',
        email: 'anil.sharma@spms.com',
        password: 'doctor123',
        role: 'doctor',
        specialization: 'General Physician',
        phone: '9876543211'
      },
      {
        name: 'Dr. Priya Reddy',
        email: 'priya.reddy@spms.com',
        password: 'doctor123',
        role: 'doctor',
        specialization: 'Cardiologist',
        phone: '9876543212'
      },
      {
        name: 'Dr. Rajesh Gupta',
        email: 'rajesh.gupta@spms.com',
        password: 'doctor123',
        role: 'doctor',
        specialization: 'Pediatrician',
        phone: '9876543213'
      },
      {
        name: 'Dr. Sneha Iyer',
        email: 'sneha.iyer@spms.com',
        password: 'doctor123',
        role: 'doctor',
        specialization: 'Dermatologist',
        phone: '9876543214'
      },
      {
        name: 'Dr. Vikram Singh',
        email: 'vikram.singh@spms.com',
        password: 'doctor123',
        role: 'doctor',
        specialization: 'Orthopedic',
        phone: '9876543215'
      },
      {
        name: 'Kavita Sharma',
        email: 'receptionist@spms.com',
        password: 'receptionist123',
        role: 'receptionist',
        phone: '9876543216'
      }
    ]);
    console.log(`✅ Created ${users.length} users (1 Admin, 5 Doctors, 1 Receptionist)\n`);

    // Get doctors for appointments
    const doctors = users.filter(u => u.role === 'doctor');

    // Create patients
    console.log('🏥 Creating patients...');
    const patients = await Patient.create([
      {
        patientId: 'P240001',
        name: 'Rajesh Kumar',
        age: 45,
        gender: 'Male',
        phone: '9876543220',
        address: '123 MG Road, Delhi - 110001',
        bloodGroup: 'O+',
        allergies: 'None',
        emergencyContact: {
          name: 'Sunita Kumar',
          phone: '9876543221',
          relation: 'Wife'
        }
      },
      {
        patientId: 'P240002',
        name: 'Priya Verma',
        age: 32,
        gender: 'Female',
        phone: '9876543222',
        address: '456 Park Street, Mumbai - 400001',
        bloodGroup: 'A+',
        allergies: 'Penicillin',
        emergencyContact: {
          name: 'Amit Verma',
          phone: '9876543223',
          relation: 'Husband'
        }
      },
      {
        patientId: 'P240003',
        name: 'Arjun Patel',
        age: 28,
        gender: 'Male',
        phone: '9876543224',
        address: '789 Lake View, Bangalore - 560001',
        bloodGroup: 'B+',
        allergies: 'None',
        emergencyContact: {
          name: 'Meera Patel',
          phone: '9876543225',
          relation: 'Mother'
        }
      },
      {
        patientId: 'P240004',
        name: 'Anita Desai',
        age: 55,
        gender: 'Female',
        phone: '9876543226',
        address: '321 Gandhi Nagar, Pune - 411001',
        bloodGroup: 'AB+',
        allergies: 'Sulfa drugs',
        emergencyContact: {
          name: 'Ramesh Desai',
          phone: '9876543227',
          relation: 'Husband'
        }
      },
      {
        patientId: 'P240005',
        name: 'Karan Malhotra',
        age: 38,
        gender: 'Male',
        phone: '9876543228',
        address: '567 Sector 15, Noida - 201301',
        bloodGroup: 'O-',
        allergies: 'Aspirin',
        emergencyContact: {
          name: 'Neha Malhotra',
          phone: '9876543229',
          relation: 'Wife'
        }
      },
      {
        patientId: 'P240006',
        name: 'Deepika Shah',
        age: 26,
        gender: 'Female',
        phone: '9876543230',
        address: '890 Ring Road, Ahmedabad - 380001',
        bloodGroup: 'A-',
        allergies: 'None',
        emergencyContact: {
          name: 'Ravi Shah',
          phone: '9876543231',
          relation: 'Father'
        }
      },
      {
        patientId: 'P240007',
        name: 'Sanjay Reddy',
        age: 50,
        gender: 'Male',
        phone: '9876543232',
        address: '234 Jubilee Hills, Hyderabad - 500033',
        bloodGroup: 'B-',
        allergies: 'Latex',
        emergencyContact: {
          name: 'Lakshmi Reddy',
          phone: '9876543233',
          relation: 'Wife'
        }
      },
      {
        patientId: 'P240008',
        name: 'Meena Krishnan',
        age: 42,
        gender: 'Female',
        phone: '9876543234',
        address: '678 Anna Nagar, Chennai - 600040',
        bloodGroup: 'AB-',
        allergies: 'Iodine',
        emergencyContact: {
          name: 'Suresh Krishnan',
          phone: '9876543235',
          relation: 'Husband'
        }
      },
      {
        patientId: 'P240009',
        name: 'Rohit Kapoor',
        age: 35,
        gender: 'Male',
        phone: '9876543236',
        address: '901 Civil Lines, Jaipur - 302006',
        bloodGroup: 'O+',
        allergies: 'None',
        emergencyContact: {
          name: 'Pooja Kapoor',
          phone: '9876543237',
          relation: 'Wife'
        }
      },
      {
        patientId: 'P240010',
        name: 'Anjali Nair',
        age: 29,
        gender: 'Female',
        phone: '9876543238',
        address: '345 MG Road, Kochi - 682016',
        bloodGroup: 'A+',
        allergies: 'Peanuts',
        emergencyContact: {
          name: 'Arun Nair',
          phone: '9876543239',
          relation: 'Brother'
        }
      }
    ]);
    console.log(`✅ Created ${patients.length} patients\n`);

    // Create appointments
    console.log('📅 Creating appointments...');
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const appointments = await Appointment.create([
      // Today's appointments
      {
        patient: patients[0]._id,
        doctor: doctors[0]._id,
        date: today,
        time: '09:00 AM',
        reason: 'General Checkup',
        status: 'Scheduled'
      },
      {
        patient: patients[1]._id,
        doctor: doctors[1]._id,
        date: today,
        time: '10:00 AM',
        reason: 'Heart Consultation',
        status: 'Scheduled'
      },
      {
        patient: patients[2]._id,
        doctor: doctors[0]._id,
        date: today,
        time: '11:00 AM',
        reason: 'Fever and Cold',
        status: 'Scheduled'
      },
      {
        patient: patients[3]._id,
        doctor: doctors[2]._id,
        date: today,
        time: '02:00 PM',
        reason: 'Child Vaccination',
        status: 'Scheduled'
      },
      // Yesterday's appointments (completed)
      {
        patient: patients[4]._id,
        doctor: doctors[0]._id,
        date: yesterday,
        time: '10:00 AM',
        reason: 'Follow-up',
        status: 'Completed'
      },
      {
        patient: patients[5]._id,
        doctor: doctors[3]._id,
        date: yesterday,
        time: '11:30 AM',
        reason: 'Skin Rash',
        status: 'Completed'
      },
      {
        patient: patients[6]._id,
        doctor: doctors[1]._id,
        date: yesterday,
        time: '03:00 PM',
        reason: 'Chest Pain',
        status: 'Completed'
      },
      // Tomorrow's appointments
      {
        patient: patients[7]._id,
        doctor: doctors[4]._id,
        date: tomorrow,
        time: '09:30 AM',
        reason: 'Knee Pain',
        status: 'Scheduled'
      },
      {
        patient: patients[8]._id,
        doctor: doctors[0]._id,
        date: tomorrow,
        time: '11:00 AM',
        reason: 'Diabetes Checkup',
        status: 'Scheduled'
      },
      {
        patient: patients[9]._id,
        doctor: doctors[2]._id,
        date: tomorrow,
        time: '02:30 PM',
        reason: 'Child Health Checkup',
        status: 'Scheduled'
      },
      // Next week appointments
      {
        patient: patients[0]._id,
        doctor: doctors[1]._id,
        date: nextWeek,
        time: '10:00 AM',
        reason: 'Follow-up Consultation',
        status: 'Scheduled'
      }
    ]);
    console.log(`✅ Created ${appointments.length} appointments\n`);

    // Create medical records for completed appointments
    console.log('📋 Creating medical records...');
    const medicalRecords = await MedicalRecord.create([
      {
        patient: patients[4]._id,
        doctor: doctors[0]._id,
        visitDate: yesterday,
        symptoms: 'Headache, fatigue, mild fever',
        diagnosis: 'Viral Fever',
        medicines: [
          {
            name: 'Paracetamol',
            dosage: '500mg',
            frequency: '3 times a day',
            duration: '5 days'
          },
          {
            name: 'Vitamin C',
            dosage: '500mg',
            frequency: 'Once daily',
            duration: '7 days'
          }
        ],
        labTests: 'Complete Blood Count (CBC)',
        followUpDate: nextWeek,
        notes: 'Advised rest and plenty of fluids',
        vitalSigns: {
          bloodPressure: '120/80',
          temperature: '99.5°F',
          pulse: '78 bpm',
          weight: '70 kg'
        }
      },
      {
        patient: patients[5]._id,
        doctor: doctors[3]._id,
        visitDate: yesterday,
        symptoms: 'Red itchy rash on arms and legs',
        diagnosis: 'Allergic Dermatitis',
        medicines: [
          {
            name: 'Cetirizine',
            dosage: '10mg',
            frequency: 'Once at night',
            duration: '10 days'
          },
          {
            name: 'Hydrocortisone Cream',
            dosage: '1%',
            frequency: 'Apply twice daily',
            duration: '7 days'
          }
        ],
        labTests: 'Allergy Test',
        followUpDate: new Date(yesterday.getTime() + 14 * 24 * 60 * 60 * 1000),
        notes: 'Avoid contact with potential allergens',
        vitalSigns: {
          bloodPressure: '118/76',
          temperature: '98.6°F',
          pulse: '72 bpm',
          weight: '58 kg'
        }
      },
      {
        patient: patients[6]._id,
        doctor: doctors[1]._id,
        visitDate: yesterday,
        symptoms: 'Chest pain, shortness of breath',
        diagnosis: 'Angina - Mild',
        medicines: [
          {
            name: 'Aspirin',
            dosage: '75mg',
            frequency: 'Once daily',
            duration: '30 days'
          },
          {
            name: 'Atorvastatin',
            dosage: '10mg',
            frequency: 'Once at night',
            duration: '30 days'
          },
          {
            name: 'Nitroglycerin',
            dosage: '0.4mg',
            frequency: 'As needed',
            duration: '30 days'
          }
        ],
        labTests: 'ECG, Lipid Profile, Cardiac Enzymes',
        followUpDate: new Date(yesterday.getTime() + 7 * 24 * 60 * 60 * 1000),
        notes: 'Advised lifestyle modifications, low-fat diet, regular exercise',
        vitalSigns: {
          bloodPressure: '140/90',
          temperature: '98.4°F',
          pulse: '88 bpm',
          weight: '82 kg'
        }
      }
    ]);
    console.log(`✅ Created ${medicalRecords.length} medical records\n`);

    // Create bills
    console.log('💰 Creating bills...');
    const bills = await Bill.create([
      {
        invoiceId: 'INV240001',
        patient: patients[4]._id,
        doctor: doctors[0]._id,
        consultationFee: 500,
        labFee: 800,
        medicineFee: 350,
        discount: 5,
        totalAmount: 1567.5,
        paymentStatus: 'Paid',
        paymentMethod: 'Cash',
        date: yesterday
      },
      {
        invoiceId: 'INV240002',
        patient: patients[5]._id,
        doctor: doctors[3]._id,
        consultationFee: 800,
        labFee: 1200,
        medicineFee: 450,
        discount: 10,
        totalAmount: 2205,
        paymentStatus: 'Paid',
        paymentMethod: 'Card',
        date: yesterday
      },
      {
        invoiceId: 'INV240003',
        patient: patients[6]._id,
        doctor: doctors[1]._id,
        consultationFee: 1000,
        labFee: 2500,
        medicineFee: 1200,
        discount: 0,
        totalAmount: 4700,
        paymentStatus: 'Paid',
        paymentMethod: 'UPI',
        date: yesterday
      },
      {
        invoiceId: 'INV240004',
        patient: patients[0]._id,
        doctor: doctors[0]._id,
        consultationFee: 500,
        labFee: 0,
        medicineFee: 0,
        discount: 0,
        totalAmount: 500,
        paymentStatus: 'Pending',
        paymentMethod: 'Cash',
        date: today
      },
      {
        invoiceId: 'INV240005',
        patient: patients[1]._id,
        doctor: doctors[1]._id,
        consultationFee: 1000,
        labFee: 1500,
        medicineFee: 0,
        discount: 0,
        totalAmount: 2500,
        paymentStatus: 'Pending',
        paymentMethod: 'Card',
        date: today
      }
    ]);
    console.log(`✅ Created ${bills.length} bills\n`);

    // Summary
    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ DATABASE SEEDED SUCCESSFULLY!');
    console.log('═══════════════════════════════════════════════════════\n');
    
    console.log('📊 Summary:');
    console.log(`   • Users: ${users.length} (1 Admin, 5 Doctors, 1 Receptionist)`);
    console.log(`   • Patients: ${patients.length}`);
    console.log(`   • Appointments: ${appointments.length}`);
    console.log(`   • Medical Records: ${medicalRecords.length}`);
    console.log(`   • Bills: ${bills.length}\n`);

    console.log('🔐 Login Credentials:');
    console.log('═══════════════════════════════════════════════════════');
    console.log('\n👨‍💼 ADMIN:');
    console.log('   Email: admin@spms.com');
    console.log('   Password: admin123');
    
    console.log('\n👨‍⚕️ DOCTORS:');
    console.log('   1. Dr. Anil Sharma (General Physician)');
    console.log('      Email: anil.sharma@spms.com');
    console.log('      Password: doctor123');
    console.log('\n   2. Dr. Priya Reddy (Cardiologist)');
    console.log('      Email: priya.reddy@spms.com');
    console.log('      Password: doctor123');
    console.log('\n   3. Dr. Rajesh Gupta (Pediatrician)');
    console.log('      Email: rajesh.gupta@spms.com');
    console.log('      Password: doctor123');
    console.log('\n   4. Dr. Sneha Iyer (Dermatologist)');
    console.log('      Email: sneha.iyer@spms.com');
    console.log('      Password: doctor123');
    console.log('\n   5. Dr. Vikram Singh (Orthopedic)');
    console.log('      Email: vikram.singh@spms.com');
    console.log('      Password: doctor123');
    
    console.log('\n👩‍💼 RECEPTIONIST:');
    console.log('   Email: receptionist@spms.com');
    console.log('   Password: receptionist123');
    
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('🎉 You can now login and explore the system!');
    console.log('═══════════════════════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
