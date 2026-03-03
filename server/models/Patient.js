import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: [true, 'Patient name is required'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: 0
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female', 'Other']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: [true, 'Blood group is required']
  },
  allergies: {
    type: String,
    default: 'None'
  },
  emergencyContact: {
    name: {
      type: String,
      required: [true, 'Emergency contact name is required']
    },
    phone: {
      type: String,
      required: [true, 'Emergency contact phone is required']
    },
    relation: {
      type: String,
      required: [true, 'Emergency contact relation is required']
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Text index for search
patientSchema.index({ name: 'text', phone: 'text' });

export default mongoose.model('Patient', patientSchema);
