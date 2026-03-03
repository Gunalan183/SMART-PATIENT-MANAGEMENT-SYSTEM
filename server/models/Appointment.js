import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  time: {
    type: String,
    required: [true, 'Appointment time is required']
  },
  reason: {
    type: String,
    default: 'General Checkup'
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled', 'No-Show'],
    default: 'Scheduled'
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

// Compound index to prevent double booking
appointmentSchema.index({ doctor: 1, date: 1, time: 1 });
appointmentSchema.index({ patient: 1, date: 1 });

export default mongoose.model('Appointment', appointmentSchema);
