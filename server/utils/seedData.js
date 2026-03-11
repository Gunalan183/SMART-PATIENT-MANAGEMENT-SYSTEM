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
      },
      {
        patientId: 'P240011',
        name: 'Vikram Mehta',
        age: 48,
        gender: 'Male',
        phone: '9876543240',
        address: '567 Residency Road, Bangalore - 560025',
        bloodGroup: 'B+',
        allergies: 'None',
        emergencyContact: {
          name: 'Priya Mehta',
          phone: '9876543241',
          relation: 'Wife'
        }
      },
      {
        patientId: 'P240012',
        name: 'Neha Agarwal',
        age: 33,
        gender: 'Female',
        phone: '9876543242',
        address: '789 Connaught Place, Delhi - 110001',
        bloodGroup: 'O+',
        allergies: 'Dust',
        emergencyContact: {
          name: 'Rahul Agarwal',
          phone: '9876543243',
          relation: 'Husband'
        }
      },
      {
        patientId: 'P240013',
        name: 'Suresh Iyer',
        age: 52,
        gender: 'Male',
        phone: '9876543244',
        address: '234 T Nagar, Chennai - 600017',
        bloodGroup: 'AB+',
        allergies: 'Shellfish',
        emergencyContact: {
          name: 'Lakshmi Iyer',
          phone: '9876543245',
          relation: 'Wife'
        }
      },
      {
        patientId: 'P240014',
        name: 'Pooja Saxena',
        age: 27,
        gender: 'Female',
        phone: '9876543246',
        address: '456 Hazratganj, Lucknow - 226001',
        bloodGroup: 'A-',
        allergies: 'None',
        emergencyContact: {
          name: 'Amit Saxena',
          phone: '9876543247',
          relation: 'Father'
        }
      },
      {
        patientId: 'P240015',
        name: 'Aditya Rao',
        age: 41,
        gender: 'Male',
        phone: '9876543248',
        address: '678 Banjara Hills, Hyderabad - 500034',
        bloodGroup: 'O-',
        allergies: 'Penicillin',
        emergencyContact: {
          name: 'Kavita Rao',
          phone: '9876543249',
          relation: 'Wife'
        }
      }
    ]);
    console.log(`✅ Created ${patients.length} patients\n`);

    // Create appointments
    console.log('📅 Creating appointments...');
    
    // Create specific dates for March 11-20, 2026
    const march11 = new Date('2026-03-11');
    const march12 = new Date('2026-03-12');
    const march13 = new Date('2026-03-13');
    const march14 = new Date('2026-03-14');
    const march15 = new Date('2026-03-15');
    const march16 = new Date('2026-03-16');
    const march17 = new Date('2026-03-17');
    const march18 = new Date('2026-03-18');
    const march19 = new Date('2026-03-19');
    const march20 = new Date('2026-03-20');

    const appointments = await Appointment.create([
      // March 11, 2026
      {
        patient: patients[0]._id,
        doctor: doctors[0]._id,
        date: march11,
        time: '09:00 AM',
        reason: 'General Checkup',
        status: 'Completed'
      },
      {
        patient: patients[1]._id,
        doctor: doctors[1]._id,
        date: march11,
        time: '10:30 AM',
        reason: 'Heart Consultation',
        status: 'Completed'
      },
      // March 12, 2026
      {
        patient: patients[2]._id,
        doctor: doctors[2]._id,
        date: march12,
        time: '09:00 AM',
        reason: 'Child Vaccination',
        status: 'Completed'
      },
      {
        patient: patients[3]._id,
        doctor: doctors[3]._id,
        date: march12,
        time: '11:00 AM',
        reason: 'Skin Allergy',
        status: 'Completed'
      },
      // March 13, 2026
      {
        patient: patients[4]._id,
        doctor: doctors[4]._id,
        date: march13,
        time: '10:00 AM',
        reason: 'Knee Pain',
        status: 'Completed'
      },
      {
        patient: patients[5]._id,
        doctor: doctors[0]._id,
        date: march13,
        time: '02:00 PM',
        reason: 'Fever and Cold',
        status: 'Completed'
      },
      // March 14, 2026
      {
        patient: patients[6]._id,
        doctor: doctors[1]._id,
        date: march14,
        time: '09:30 AM',
        reason: 'Chest Pain',
        status: 'Completed'
      },
      {
        patient: patients[7]._id,
        doctor: doctors[2]._id,
        date: march14,
        time: '11:30 AM',
        reason: 'Baby Checkup',
        status: 'Completed'
      },
      // March 15, 2026
      {
        patient: patients[8]._id,
        doctor: doctors[3]._id,
        date: march15,
        time: '10:00 AM',
        reason: 'Skin Rash',
        status: 'Completed'
      },
      {
        patient: patients[9]._id,
        doctor: doctors[4]._id,
        date: march15,
        time: '03:00 PM',
        reason: 'Back Pain',
        status: 'Completed'
      },
      // March 16, 2026
      {
        patient: patients[10]._id,
        doctor: doctors[0]._id,
        date: march16,
        time: '09:00 AM',
        reason: 'Diabetes Checkup',
        status: 'Completed'
      },
      {
        patient: patients[11]._id,
        doctor: doctors[1]._id,
        date: march16,
        time: '11:00 AM',
        reason: 'Blood Pressure Check',
        status: 'Completed'
      },
      // March 17, 2026
      {
        patient: patients[12]._id,
        doctor: doctors[2]._id,
        date: march17,
        time: '10:00 AM',
        reason: 'Child Fever',
        status: 'Scheduled'
      },
      {
        patient: patients[13]._id,
        doctor: doctors[3]._id,
        date: march17,
        time: '02:00 PM',
        reason: 'Acne Treatment',
        status: 'Scheduled'
      },
      // March 18, 2026
      {
        patient: patients[14]._id,
        doctor: doctors[4]._id,
        date: march18,
        time: '09:30 AM',
        reason: 'Shoulder Pain',
        status: 'Scheduled'
      },
      {
        patient: patients[0]._id,
        doctor: doctors[0]._id,
        date: march18,
        time: '11:30 AM',
        reason: 'Follow-up',
        status: 'Scheduled'
      },
      // March 19, 2026
      {
        patient: patients[1]._id,
        doctor: doctors[1]._id,
        date: march19,
        time: '10:00 AM',
        reason: 'Heart Follow-up',
        status: 'Scheduled'
      },
      {
        patient: patients[2]._id,
        doctor: doctors[2]._id,
        date: march19,
        time: '02:30 PM',
        reason: 'Vaccination Follow-up',
        status: 'Scheduled'
      },
      // March 20, 2026
      {
        patient: patients[3]._id,
        doctor: doctors[3]._id,
        date: march20,
        time: '09:00 AM',
        reason: 'Skin Check',
        status: 'Scheduled'
      },
      {
        patient: patients[4]._id,
        doctor: doctors[4]._id,
        date: march20,
        time: '11:00 AM',
        reason: 'Physiotherapy',
        status: 'Scheduled'
      }
    ]);
    console.log(`✅ Created ${appointments.length} appointments\n`);

    // Create medical records for completed appointments
    console.log('📋 Creating medical records...');
    const march25 = new Date('2026-03-25');
    
    const medicalRecords = await MedicalRecord.create([
      {
        patient: patients[0]._id,
        doctor: doctors[0]._id,
        visitDate: march11,
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
        followUpDate: march25,
        notes: 'Advised rest and plenty of fluids',
        vitalSigns: {
          bloodPressure: '120/80',
          temperature: '99.5°F',
          pulse: '78 bpm',
          weight: '70 kg'
        }
      },
      {
        patient: patients[1]._id,
        doctor: doctors[1]._id,
        visitDate: march11,
        symptoms: 'Chest discomfort, palpitations',
        diagnosis: 'Mild Arrhythmia',
        medicines: [
          {
            name: 'Beta Blocker',
            dosage: '25mg',
            frequency: 'Once daily',
            duration: '30 days'
          },
          {
            name: 'Aspirin',
            dosage: '75mg',
            frequency: 'Once daily',
            duration: '30 days'
          }
        ],
        labTests: 'ECG, Echocardiogram',
        followUpDate: march25,
        notes: 'Reduce caffeine intake, regular exercise',
        vitalSigns: {
          bloodPressure: '135/85',
          temperature: '98.6°F',
          pulse: '92 bpm',
          weight: '68 kg'
        }
      },
      {
        patient: patients[2]._id,
        doctor: doctors[2]._id,
        visitDate: march12,
        symptoms: 'Routine vaccination',
        diagnosis: 'Healthy - Vaccination administered',
        medicines: [
          {
            name: 'MMR Vaccine',
            dosage: '0.5ml',
            frequency: 'Single dose',
            duration: '1 day'
          }
        ],
        labTests: 'None',
        followUpDate: new Date('2026-04-12'),
        notes: 'Child is healthy, next vaccination due in 1 month',
        vitalSigns: {
          bloodPressure: 'N/A',
          temperature: '98.4°F',
          pulse: '95 bpm',
          weight: '15 kg'
        }
      },
      {
        patient: patients[3]._id,
        doctor: doctors[3]._id,
        visitDate: march12,
        symptoms: 'Red itchy patches on skin',
        diagnosis: 'Contact Dermatitis',
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
        labTests: 'Allergy Patch Test',
        followUpDate: new Date('2026-03-26'),
        notes: 'Avoid contact with irritants',
        vitalSigns: {
          bloodPressure: '118/76',
          temperature: '98.6°F',
          pulse: '72 bpm',
          weight: '58 kg'
        }
      },
      {
        patient: patients[4]._id,
        doctor: doctors[4]._id,
        visitDate: march13,
        symptoms: 'Knee pain, difficulty walking',
        diagnosis: 'Osteoarthritis - Mild',
        medicines: [
          {
            name: 'Ibuprofen',
            dosage: '400mg',
            frequency: 'Twice daily',
            duration: '15 days'
          },
          {
            name: 'Calcium Supplement',
            dosage: '500mg',
            frequency: 'Once daily',
            duration: '30 days'
          }
        ],
        labTests: 'X-Ray Knee Joint',
        followUpDate: new Date('2026-03-27'),
        notes: 'Physiotherapy recommended, avoid strenuous activities',
        vitalSigns: {
          bloodPressure: '125/82',
          temperature: '98.6°F',
          pulse: '75 bpm',
          weight: '75 kg'
        }
      },
      {
        patient: patients[5]._id,
        doctor: doctors[0]._id,
        visitDate: march13,
        symptoms: 'Fever, cough, sore throat',
        diagnosis: 'Upper Respiratory Tract Infection',
        medicines: [
          {
            name: 'Azithromycin',
            dosage: '500mg',
            frequency: 'Once daily',
            duration: '3 days'
          },
          {
            name: 'Cough Syrup',
            dosage: '10ml',
            frequency: '3 times a day',
            duration: '5 days'
          }
        ],
        labTests: 'Throat Swab',
        followUpDate: new Date('2026-03-20'),
        notes: 'Rest, warm fluids, steam inhalation',
        vitalSigns: {
          bloodPressure: '115/75',
          temperature: '100.2°F',
          pulse: '82 bpm',
          weight: '62 kg'
        }
      },
      {
        patient: patients[6]._id,
        doctor: doctors[1]._id,
        visitDate: march14,
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
        followUpDate: new Date('2026-03-21'),
        notes: 'Lifestyle modifications, low-fat diet, regular exercise',
        vitalSigns: {
          bloodPressure: '140/90',
          temperature: '98.4°F',
          pulse: '88 bpm',
          weight: '82 kg'
        }
      },
      {
        patient: patients[7]._id,
        doctor: doctors[2]._id,
        visitDate: march14,
        symptoms: 'Baby routine checkup',
        diagnosis: 'Healthy - Normal growth',
        medicines: [
          {
            name: 'Vitamin D Drops',
            dosage: '400 IU',
            frequency: 'Once daily',
            duration: '30 days'
          }
        ],
        labTests: 'None',
        followUpDate: new Date('2026-04-14'),
        notes: 'Baby is developing well, continue breastfeeding',
        vitalSigns: {
          bloodPressure: 'N/A',
          temperature: '98.2°F',
          pulse: '110 bpm',
          weight: '8 kg'
        }
      },
      {
        patient: patients[8]._id,
        doctor: doctors[3]._id,
        visitDate: march15,
        symptoms: 'Skin rash, itching',
        diagnosis: 'Eczema',
        medicines: [
          {
            name: 'Moisturizing Cream',
            dosage: 'Apply liberally',
            frequency: 'Twice daily',
            duration: '30 days'
          },
          {
            name: 'Antihistamine',
            dosage: '10mg',
            frequency: 'Once at night',
            duration: '14 days'
          }
        ],
        labTests: 'None',
        followUpDate: new Date('2026-03-29'),
        notes: 'Keep skin moisturized, avoid harsh soaps',
        vitalSigns: {
          bloodPressure: '120/78',
          temperature: '98.6°F',
          pulse: '74 bpm',
          weight: '65 kg'
        }
      },
      {
        patient: patients[9]._id,
        doctor: doctors[4]._id,
        visitDate: march15,
        symptoms: 'Lower back pain',
        diagnosis: 'Lumbar Strain',
        medicines: [
          {
            name: 'Muscle Relaxant',
            dosage: '10mg',
            frequency: 'Twice daily',
            duration: '7 days'
          },
          {
            name: 'Pain Relief Gel',
            dosage: 'Apply',
            frequency: '3 times daily',
            duration: '10 days'
          }
        ],
        labTests: 'X-Ray Lumbar Spine',
        followUpDate: new Date('2026-03-22'),
        notes: 'Physiotherapy sessions recommended, avoid heavy lifting',
        vitalSigns: {
          bloodPressure: '122/80',
          temperature: '98.6°F',
          pulse: '76 bpm',
          weight: '72 kg'
        }
      },
      {
        patient: patients[10]._id,
        doctor: doctors[0]._id,
        visitDate: march16,
        symptoms: 'High blood sugar, fatigue',
        diagnosis: 'Type 2 Diabetes - Controlled',
        medicines: [
          {
            name: 'Metformin',
            dosage: '500mg',
            frequency: 'Twice daily',
            duration: '30 days'
          },
          {
            name: 'Multivitamin',
            dosage: '1 tablet',
            frequency: 'Once daily',
            duration: '30 days'
          }
        ],
        labTests: 'HbA1c, Fasting Blood Sugar',
        followUpDate: new Date('2026-04-16'),
        notes: 'Diet control, regular exercise, monitor blood sugar',
        vitalSigns: {
          bloodPressure: '130/85',
          temperature: '98.6°F',
          pulse: '80 bpm',
          weight: '78 kg'
        }
      },
      {
        patient: patients[11]._id,
        doctor: doctors[1]._id,
        visitDate: march16,
        symptoms: 'High blood pressure, headache',
        diagnosis: 'Hypertension - Stage 1',
        medicines: [
          {
            name: 'Amlodipine',
            dosage: '5mg',
            frequency: 'Once daily',
            duration: '30 days'
          },
          {
            name: 'Aspirin',
            dosage: '75mg',
            frequency: 'Once daily',
            duration: '30 days'
          }
        ],
        labTests: 'Lipid Profile, Kidney Function Test',
        followUpDate: new Date('2026-04-16'),
        notes: 'Low salt diet, stress management, regular monitoring',
        vitalSigns: {
          bloodPressure: '145/92',
          temperature: '98.6°F',
          pulse: '85 bpm',
          weight: '80 kg'
        }
      }
    ]);
    console.log(`✅ Created ${medicalRecords.length} medical records\n`);

    // Create bills
    console.log('💰 Creating bills...');
    const bills = await Bill.create([
      {
        invoiceId: 'INV260001',
        patient: patients[0]._id,
        doctor: doctors[0]._id,
        consultationFee: 500,
        labFee: 800,
        medicineFee: 350,
        discount: 5,
        totalAmount: 1567.5,
        paymentStatus: 'Paid',
        paymentMethod: 'Cash',
        date: new Date('2026-03-11')
      },
      {
        invoiceId: 'INV260002',
        patient: patients[1]._id,
        doctor: doctors[1]._id,
        consultationFee: 1000,
        labFee: 2500,
        medicineFee: 800,
        discount: 10,
        totalAmount: 3870,
        paymentStatus: 'Paid',
        paymentMethod: 'Card',
        date: new Date('2026-03-11')
      },
      {
        invoiceId: 'INV260003',
        patient: patients[2]._id,
        doctor: doctors[2]._id,
        consultationFee: 600,
        labFee: 0,
        medicineFee: 1200,
        discount: 0,
        totalAmount: 1800,
        paymentStatus: 'Paid',
        paymentMethod: 'UPI',
        date: new Date('2026-03-12')
      },
      {
        invoiceId: 'INV260004',
        patient: patients[3]._id,
        doctor: doctors[3]._id,
        consultationFee: 800,
        labFee: 1200,
        medicineFee: 450,
        discount: 10,
        totalAmount: 2205,
        paymentStatus: 'Paid',
        paymentMethod: 'Card',
        date: new Date('2026-03-12')
      },
      {
        invoiceId: 'INV260005',
        patient: patients[4]._id,
        doctor: doctors[4]._id,
        consultationFee: 900,
        labFee: 1500,
        medicineFee: 600,
        discount: 5,
        totalAmount: 2850,
        paymentStatus: 'Paid',
        paymentMethod: 'Cash',
        date: new Date('2026-03-13')
      },
      {
        invoiceId: 'INV260006',
        patient: patients[5]._id,
        doctor: doctors[0]._id,
        consultationFee: 500,
        labFee: 600,
        medicineFee: 400,
        discount: 0,
        totalAmount: 1500,
        paymentStatus: 'Paid',
        paymentMethod: 'UPI',
        date: new Date('2026-03-13')
      },
      {
        invoiceId: 'INV260007',
        patient: patients[6]._id,
        doctor: doctors[1]._id,
        consultationFee: 1000,
        labFee: 2500,
        medicineFee: 1200,
        discount: 0,
        totalAmount: 4700,
        paymentStatus: 'Paid',
        paymentMethod: 'Insurance',
        date: new Date('2026-03-14')
      },
      {
        invoiceId: 'INV260008',
        patient: patients[7]._id,
        doctor: doctors[2]._id,
        consultationFee: 600,
        labFee: 0,
        medicineFee: 250,
        discount: 0,
        totalAmount: 850,
        paymentStatus: 'Paid',
        paymentMethod: 'Cash',
        date: new Date('2026-03-14')
      },
      {
        invoiceId: 'INV260009',
        patient: patients[8]._id,
        doctor: doctors[3]._id,
        consultationFee: 800,
        labFee: 0,
        medicineFee: 550,
        discount: 5,
        totalAmount: 1282.5,
        paymentStatus: 'Paid',
        paymentMethod: 'Card',
        date: new Date('2026-03-15')
      },
      {
        invoiceId: 'INV260010',
        patient: patients[9]._id,
        doctor: doctors[4]._id,
        consultationFee: 900,
        labFee: 1800,
        medicineFee: 450,
        discount: 10,
        totalAmount: 2835,
        paymentStatus: 'Paid',
        paymentMethod: 'UPI',
        date: new Date('2026-03-15')
      },
      {
        invoiceId: 'INV260011',
        patient: patients[10]._id,
        doctor: doctors[0]._id,
        consultationFee: 500,
        labFee: 1000,
        medicineFee: 700,
        discount: 0,
        totalAmount: 2200,
        paymentStatus: 'Paid',
        paymentMethod: 'Cash',
        date: new Date('2026-03-16')
      },
      {
        invoiceId: 'INV260012',
        patient: patients[11]._id,
        doctor: doctors[1]._id,
        consultationFee: 1000,
        labFee: 1500,
        medicineFee: 600,
        discount: 5,
        totalAmount: 2945,
        paymentStatus: 'Paid',
        paymentMethod: 'Card',
        date: new Date('2026-03-16')
      },
      {
        invoiceId: 'INV260013',
        patient: patients[12]._id,
        doctor: doctors[2]._id,
        consultationFee: 600,
        labFee: 0,
        medicineFee: 0,
        discount: 0,
        totalAmount: 600,
        paymentStatus: 'Pending',
        paymentMethod: 'Cash',
        date: new Date('2026-03-17')
      },
      {
        invoiceId: 'INV260014',
        patient: patients[13]._id,
        doctor: doctors[3]._id,
        consultationFee: 800,
        labFee: 500,
        medicineFee: 0,
        discount: 0,
        totalAmount: 1300,
        paymentStatus: 'Pending',
        paymentMethod: 'Card',
        date: new Date('2026-03-17')
      },
      {
        invoiceId: 'INV260015',
        patient: patients[14]._id,
        doctor: doctors[4]._id,
        consultationFee: 900,
        labFee: 0,
        medicineFee: 0,
        discount: 0,
        totalAmount: 900,
        paymentStatus: 'Pending',
        paymentMethod: 'UPI',
        date: new Date('2026-03-18')
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
    console.log(`   • Appointments: ${appointments.length} (March 11-20, 2026)`);
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
