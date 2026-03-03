import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  }
}, { _id: false });

const medicalRecordSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: [true, 'Patient is required']
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Doctor is required']
  },
  visitDate: {
    type: Date,
    default: Date.now
  },
  symptoms: {
    type: String,
    required: [true, 'Symptoms are required']
  },
  diagnosis: {
    type: String,
    required: [true, 'Diagnosis is required']
  },
  medicines: [medicineSchema],
  labTests: {
    type: String,
    default: 'None'
  },
  followUpDate: {
    type: Date
  },
  notes: {
    type: String
  },
  vitalSigns: {
    bloodPressure: String,
    temperature: String,
    pulse: String,
    weight: String
  }
}, {
  timestamps: true
});

// Index for faster queries
medicalRecordSchema.index({ patient: 1, visitDate: -1 });
medicalRecordSchema.index({ doctor: 1 });

export default mongoose.model('MedicalRecord', medicalRecordSchema);
