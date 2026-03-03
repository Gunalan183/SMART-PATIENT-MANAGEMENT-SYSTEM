import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  invoiceId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: [true, 'Patient is required']
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [{
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  consultationFee: {
    type: Number,
    default: 0
  },
  labFee: {
    type: Number,
    default: 0
  },
  medicineFee: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Pending', 'Partial'],
    default: 'Pending'
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Card', 'UPI', 'Insurance'],
    default: 'Cash'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
billSchema.index({ patient: 1, date: -1 });

export default mongoose.model('Bill', billSchema);
