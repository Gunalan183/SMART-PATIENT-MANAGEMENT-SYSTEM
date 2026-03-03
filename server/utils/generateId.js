// Generate unique patient ID
export const generatePatientId = async (Patient) => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  
  // Find the last patient created this month
  const lastPatient = await Patient.findOne({
    patientId: new RegExp(`^P${year}${month}`)
  }).sort({ patientId: -1 });

  let sequence = 1;
  if (lastPatient) {
    const lastSequence = parseInt(lastPatient.patientId.slice(-4));
    sequence = lastSequence + 1;
  }

  return `P${year}${month}${sequence.toString().padStart(4, '0')}`;
};

// Generate unique invoice ID
export const generateInvoiceId = async (Bill) => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  
  const lastBill = await Bill.findOne({
    invoiceId: new RegExp(`^INV${year}${month}`)
  }).sort({ invoiceId: -1 });

  let sequence = 1;
  if (lastBill) {
    const lastSequence = parseInt(lastBill.invoiceId.slice(-4));
    sequence = lastSequence + 1;
  }

  return `INV${year}${month}${sequence.toString().padStart(4, '0')}`;
};
