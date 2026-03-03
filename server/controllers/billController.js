import Bill from '../models/Bill.js';
import { generateInvoiceId } from '../utils/generateId.js';

// @desc    Create bill
// @route   POST /api/bills
// @access  Private
export const createBill = async (req, res, next) => {
  try {
    const invoiceId = await generateInvoiceId(Bill);

    const { consultationFee, labFee, medicineFee, discount } = req.body;
    
    // Calculate total
    const subtotal = consultationFee + labFee + medicineFee;
    const discountAmount = (subtotal * discount) / 100;
    const totalAmount = subtotal - discountAmount;

    const bill = await Bill.create({
      ...req.body,
      invoiceId,
      totalAmount
    });

    const populatedBill = await Bill.findById(bill._id)
      .populate('patient', 'patientId name phone')
      .populate('doctor', 'name specialization');

    res.status(201).json({
      success: true,
      message: 'Bill created successfully',
      data: populatedBill
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bills
// @route   GET /api/bills
// @access  Private
export const getAllBills = async (req, res, next) => {
  try {
    const { patient, paymentStatus, page = 1, limit = 10 } = req.query;

    let query = {};
    if (patient) query.patient = patient;
    if (paymentStatus) query.paymentStatus = paymentStatus;

    const bills = await Bill.find(query)
      .populate('patient', 'patientId name phone')
      .populate('doctor', 'name')
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Bill.countDocuments(query);

    res.json({
      success: true,
      count: bills.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: bills
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get bill by ID
// @route   GET /api/bills/:id
// @access  Private
export const getBillById = async (req, res, next) => {
  try {
    const bill = await Bill.findById(req.params.id)
      .populate('patient')
      .populate('doctor', 'name specialization');

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: 'Bill not found'
      });
    }

    res.json({
      success: true,
      data: bill
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update bill
// @route   PUT /api/bills/:id
// @access  Private
export const updateBill = async (req, res, next) => {
  try {
    // Recalculate total if fees are updated
    if (req.body.consultationFee || req.body.labFee || req.body.medicineFee || req.body.discount) {
      const bill = await Bill.findById(req.params.id);
      
      const consultationFee = req.body.consultationFee || bill.consultationFee;
      const labFee = req.body.labFee || bill.labFee;
      const medicineFee = req.body.medicineFee || bill.medicineFee;
      const discount = req.body.discount || bill.discount;
      
      const subtotal = consultationFee + labFee + medicineFee;
      const discountAmount = (subtotal * discount) / 100;
      req.body.totalAmount = subtotal - discountAmount;
    }

    const bill = await Bill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('patient', 'patientId name')
      .populate('doctor', 'name');

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: 'Bill not found'
      });
    }

    res.json({
      success: true,
      message: 'Bill updated successfully',
      data: bill
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete bill
// @route   DELETE /api/bills/:id
// @access  Private/Admin
export const deleteBill = async (req, res, next) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: 'Bill not found'
      });
    }

    res.json({
      success: true,
      message: 'Bill deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get revenue statistics
// @route   GET /api/bills/stats/revenue
// @access  Private/Admin
export const getRevenueStats = async (req, res, next) => {
  try {
    // Total revenue
    const totalRevenue = await Bill.aggregate([
      { $match: { paymentStatus: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    // Monthly revenue (last 12 months)
    const monthlyRevenue = await Bill.aggregate([
      {
        $match: {
          paymentStatus: 'Paid',
          date: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 12)) }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // This month revenue
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const thisMonthRevenue = await Bill.aggregate([
      {
        $match: {
          paymentStatus: 'Paid',
          date: { $gte: startOfMonth }
        }
      },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
      success: true,
      data: {
        totalRevenue: totalRevenue[0]?.total || 0,
        thisMonthRevenue: thisMonthRevenue[0]?.total || 0,
        monthlyRevenue
      }
    });
  } catch (error) {
    next(error);
  }
};
