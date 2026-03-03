import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Patient from '../models/Patient.js';
import connectDB from '../config/db.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Patient.deleteMany({});

    console.log('Existing data cleared');

    // Create users
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
        email: 'doctor@spms.com',
        password: 'doctor123',
        role: 'doctor',
        specialization: 'General Physician',
        phone: '9876543211'
      },
      {
        name: 'Priya Singh',
        email: 'receptionist@spms.com',
        password: 'receptionist123',
        role: 'receptionist',
        phone: '9876543212'
      }
    ]);

    console.log('Users created:', users.length);

    // Create sample patients
    const patients = await Patient.create([
      {
        patientId: 'P240001',
        name: 'Rajesh Kumar',
        age: 45,
        gender: 'Male',
        phone: '9876543213',
        address: '123 MG Road, Delhi',
        bloodGroup: 'O+',
        allergies: 'None',
        emergencyContact: {
          name: 'Sunita Kumar',
          phone: '9876543214',
          relation: 'Wife'
        }
      },
      {
        patientId: 'P240002',
        name: 'Priya Verma',
        age: 32,
        gender: 'Female',
        phone: '9876543215',
        address: '456 Park Street, Mumbai',
        bloodGroup: 'A+',
        allergies: 'Penicillin',
        emergencyContact: {
          name: 'Amit Verma',
          phone: '9876543216',
          relation: 'Husband'
        }
      },
      {
        patientId: 'P240003',
        name: 'Arjun Patel',
        age: 28,
        gender: 'Male',
        phone: '9876543217',
        address: '789 Lake View, Bangalore',
        bloodGroup: 'B+',
        allergies: 'None',
        emergencyContact: {
          name: 'Meera Patel',
          phone: '9876543218',
          relation: 'Mother'
        }
      }
    ]);

    console.log('Patients created:', patients.length);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nLogin Credentials:');
    console.log('==================');
    console.log('Admin:');
    console.log('  Email: admin@spms.com');
    console.log('  Password: admin123');
    console.log('\nDoctor:');
    console.log('  Email: doctor@spms.com');
    console.log('  Password: doctor123');
    console.log('\nReceptionist:');
    console.log('  Email: receptionist@spms.com');
    console.log('  Password: receptionist123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
