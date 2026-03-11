import Alert from '../models/Alert.js';

// Comprehensive Disease Database (simulated ML model)
const diseaseDatabase = {
  // Respiratory Infections
  'fever,cough,headache,fatigue': {
    disease: 'Common Cold',
    confidence: 85,
    category: 'Respiratory',
    severity: 'Mild',
    recommendations: [
      'Rest and stay hydrated (8-10 glasses of water daily)',
      'Take over-the-counter pain relievers (acetaminophen or ibuprofen)',
      'Use saline nasal drops for congestion',
      'Gargle with warm salt water for sore throat',
      'Monitor temperature - seek care if >103°F',
      'Symptoms typically resolve in 7-10 days'
    ]
  },
  'fever,cough,difficulty breathing,fatigue': {
    disease: 'Pneumonia',
    confidence: 78,
    category: 'Respiratory',
    severity: 'Severe',
    recommendations: [
      'Seek immediate medical attention',
      'Get chest X-ray and blood tests',
      'May require antibiotics or antiviral medication',
      'Monitor oxygen levels - use pulse oximeter',
      'Stay hydrated and rest completely',
      'Hospitalization may be necessary for severe cases'
    ]
  },
  'cough,fever,body ache,sore throat': {
    disease: 'Influenza (Flu)',
    confidence: 82,
    category: 'Respiratory',
    severity: 'Moderate',
    recommendations: [
      'Rest for at least 5-7 days',
      'Antiviral medications if started within 48 hours',
      'Stay hydrated with warm fluids',
      'Isolate to prevent spreading',
      'Monitor for complications (difficulty breathing)',
      'Get annual flu vaccine for prevention'
    ]
  },
  'dry cough,fever,loss of taste,loss of smell,fatigue': {
    disease: 'COVID-19',
    confidence: 80,
    category: 'Respiratory',
    severity: 'Moderate to Severe',
    recommendations: [
      'Get tested immediately (PCR or rapid antigen)',
      'Isolate for at least 5 days',
      'Monitor oxygen levels daily',
      'Seek emergency care if breathing difficulty',
      'Stay hydrated and rest',
      'Inform close contacts for testing'
    ]
  },
  'wheezing,shortness of breath,chest tightness,cough': {
    disease: 'Asthma Attack',
    confidence: 85,
    category: 'Respiratory',
    severity: 'Moderate to Severe',
    recommendations: [
      'Use rescue inhaler (albuterol) immediately',
      'Sit upright and breathe slowly',
      'Seek emergency care if no improvement',
      'Avoid triggers (smoke, allergens, cold air)',
      'Follow asthma action plan',
      'Schedule follow-up with pulmonologist'
    ]
  },

  // Cardiovascular Conditions
  'chest pain,shortness of breath,nausea': {
    disease: 'Cardiac Event (Heart Attack)',
    confidence: 82,
    category: 'Cardiovascular',
    severity: 'Critical',
    recommendations: [
      '🚨 Call 911 immediately - DO NOT DRIVE',
      'Chew aspirin (if not allergic) while waiting',
      'Stay calm and sit or lie down',
      'Loosen tight clothing',
      'Do not eat or drink anything',
      'Time is critical - every minute counts'
    ]
  },
  'chest pain,sweating,pain radiating to arm,jaw pain': {
    disease: 'Myocardial Infarction',
    confidence: 88,
    category: 'Cardiovascular',
    severity: 'Critical',
    recommendations: [
      '🚨 EMERGENCY - Call 911 immediately',
      'Chew 325mg aspirin if available',
      'Rest in comfortable position',
      'Do not delay seeking help',
      'Inform emergency responders of symptoms',
      'Have someone stay with you'
    ]
  },
  'irregular heartbeat,dizziness,shortness of breath,fatigue': {
    disease: 'Atrial Fibrillation',
    confidence: 75,
    category: 'Cardiovascular',
    severity: 'Moderate',
    recommendations: [
      'Seek medical evaluation within 24 hours',
      'Monitor heart rate and rhythm',
      'Avoid caffeine and alcohol',
      'May require ECG and echocardiogram',
      'Medication may be needed to control rhythm',
      'Risk of stroke - may need anticoagulation'
    ]
  },
  'high blood pressure,headache,blurred vision,nosebleed': {
    disease: 'Hypertensive Crisis',
    confidence: 80,
    category: 'Cardiovascular',
    severity: 'Severe',
    recommendations: [
      'Seek immediate medical attention',
      'Do not take extra blood pressure medication',
      'Rest in quiet environment',
      'Monitor blood pressure every 15 minutes',
      'May require IV medications',
      'Risk of stroke or heart attack'
    ]
  },

  // Neurological Conditions
  'headache,fever,stiff neck,sensitivity to light': {
    disease: 'Meningitis',
    confidence: 75,
    category: 'Neurological',
    severity: 'Critical',
    recommendations: [
      '🚨 Seek emergency medical care immediately',
      'This is a life-threatening emergency',
      'Do not delay treatment',
      'Inform close contacts for prophylaxis',
      'May require lumbar puncture',
      'IV antibiotics needed urgently'
    ]
  },
  'severe headache,nausea,vomiting,sensitivity to light': {
    disease: 'Migraine',
    confidence: 82,
    category: 'Neurological',
    severity: 'Moderate',
    recommendations: [
      'Rest in dark, quiet room',
      'Take prescribed migraine medication early',
      'Apply cold compress to head',
      'Stay hydrated',
      'Avoid triggers (stress, certain foods)',
      'Consider preventive medication if frequent'
    ]
  },
  'sudden weakness,facial drooping,slurred speech,confusion': {
    disease: 'Stroke',
    confidence: 90,
    category: 'Neurological',
    severity: 'Critical',
    recommendations: [
      '🚨 Call 911 IMMEDIATELY - Time = Brain',
      'Note time symptoms started',
      'Do not give food, drink, or medication',
      'Keep person calm and lying down',
      'Treatment must start within 3-4.5 hours',
      'FAST test: Face, Arms, Speech, Time'
    ]
  },
  'tremor,stiffness,slow movement,balance problems': {
    disease: 'Parkinson\'s Disease',
    confidence: 70,
    category: 'Neurological',
    severity: 'Moderate',
    recommendations: [
      'Consult neurologist for evaluation',
      'May require MRI and neurological tests',
      'Medications can help manage symptoms',
      'Physical therapy beneficial',
      'Support groups available',
      'Early diagnosis improves outcomes'
    ]
  },

  // Gastrointestinal Conditions
  'abdominal pain,nausea,vomiting,diarrhea': {
    disease: 'Gastroenteritis',
    confidence: 85,
    category: 'Gastrointestinal',
    severity: 'Mild to Moderate',
    recommendations: [
      'Stay hydrated with oral rehydration solution',
      'BRAT diet (Bananas, Rice, Applesauce, Toast)',
      'Avoid dairy, fatty, and spicy foods',
      'Rest and avoid solid foods initially',
      'Seek care if severe dehydration or blood in stool',
      'Usually resolves in 1-3 days'
    ]
  },
  'severe abdominal pain,fever,nausea,pain in lower right': {
    disease: 'Appendicitis',
    confidence: 78,
    category: 'Gastrointestinal',
    severity: 'Severe',
    recommendations: [
      'Seek emergency medical care immediately',
      'Do not eat or drink anything',
      'Do not take laxatives or pain medication',
      'May require emergency surgery',
      'Risk of rupture if untreated',
      'CT scan needed for diagnosis'
    ]
  },
  'heartburn,chest pain,difficulty swallowing,regurgitation': {
    disease: 'GERD (Acid Reflux)',
    confidence: 80,
    category: 'Gastrointestinal',
    severity: 'Mild to Moderate',
    recommendations: [
      'Avoid trigger foods (spicy, fatty, acidic)',
      'Eat smaller, more frequent meals',
      'Don\'t lie down for 3 hours after eating',
      'Elevate head of bed 6-8 inches',
      'Over-the-counter antacids may help',
      'See doctor if symptoms persist >2 weeks'
    ]
  },
  'abdominal pain,bloating,constipation,diarrhea': {
    disease: 'Irritable Bowel Syndrome (IBS)',
    confidence: 75,
    category: 'Gastrointestinal',
    severity: 'Mild to Moderate',
    recommendations: [
      'Keep food diary to identify triggers',
      'Increase fiber intake gradually',
      'Manage stress through relaxation techniques',
      'Regular exercise helps',
      'Consider low FODMAP diet',
      'Consult gastroenterologist for management'
    ]
  },

  // Endocrine Conditions
  'increased thirst,frequent urination,fatigue,blurred vision': {
    disease: 'Diabetes Mellitus',
    confidence: 82,
    category: 'Endocrine',
    severity: 'Moderate to Severe',
    recommendations: [
      'Get blood glucose test immediately',
      'HbA1c test for long-term glucose control',
      'May require insulin or oral medications',
      'Monitor blood sugar regularly',
      'Dietary modifications essential',
      'Regular exercise and weight management'
    ]
  },
  'weight gain,fatigue,cold sensitivity,dry skin': {
    disease: 'Hypothyroidism',
    confidence: 78,
    category: 'Endocrine',
    severity: 'Moderate',
    recommendations: [
      'Get thyroid function tests (TSH, T3, T4)',
      'Thyroid hormone replacement may be needed',
      'Regular monitoring required',
      'Symptoms improve with treatment',
      'Lifelong medication usually required',
      'Follow-up every 6-12 months'
    ]
  },
  'weight loss,increased appetite,anxiety,rapid heartbeat': {
    disease: 'Hyperthyroidism',
    confidence: 80,
    category: 'Endocrine',
    severity: 'Moderate',
    recommendations: [
      'Thyroid function tests needed',
      'May require anti-thyroid medications',
      'Radioactive iodine or surgery options',
      'Monitor heart rate and blood pressure',
      'Avoid caffeine and stimulants',
      'Regular endocrinologist follow-up'
    ]
  },

  // Infectious Diseases
  'fever,rash,joint pain,red eyes': {
    disease: 'Dengue Fever',
    confidence: 75,
    category: 'Infectious',
    severity: 'Moderate to Severe',
    recommendations: [
      'Seek medical evaluation immediately',
      'Blood tests to confirm diagnosis',
      'Stay hydrated - drink plenty of fluids',
      'Rest completely',
      'Monitor for warning signs (bleeding, severe pain)',
      'Avoid aspirin - use acetaminophen for fever'
    ]
  },
  'fever,chills,sweating,headache,muscle pain': {
    disease: 'Malaria',
    confidence: 70,
    category: 'Infectious',
    severity: 'Severe',
    recommendations: [
      'Seek immediate medical attention',
      'Blood smear test for confirmation',
      'Antimalarial medication required',
      'Hospitalization may be necessary',
      'Monitor for complications',
      'Prevent mosquito bites in endemic areas'
    ]
  },
  'fever,jaundice,dark urine,fatigue,abdominal pain': {
    disease: 'Hepatitis',
    confidence: 78,
    category: 'Infectious',
    severity: 'Moderate to Severe',
    recommendations: [
      'Get liver function tests and viral markers',
      'Rest and avoid alcohol completely',
      'High-calorie, low-fat diet',
      'Avoid medications that stress liver',
      'May require antiviral treatment',
      'Vaccination available for Hepatitis A & B'
    ]
  },

  // Musculoskeletal Conditions
  'joint pain,stiffness,swelling,morning stiffness': {
    disease: 'Rheumatoid Arthritis',
    confidence: 75,
    category: 'Musculoskeletal',
    severity: 'Moderate',
    recommendations: [
      'Consult rheumatologist for evaluation',
      'Blood tests (RF, anti-CCP) and X-rays needed',
      'Disease-modifying drugs may be required',
      'Physical therapy helps maintain mobility',
      'Balance rest and gentle exercise',
      'Early treatment prevents joint damage'
    ]
  },
  'back pain,leg pain,numbness,tingling': {
    disease: 'Sciatica',
    confidence: 80,
    category: 'Musculoskeletal',
    severity: 'Moderate',
    recommendations: [
      'Rest but avoid prolonged bed rest',
      'Apply ice for first 48 hours, then heat',
      'Over-the-counter pain relievers',
      'Gentle stretching exercises',
      'Physical therapy may help',
      'See doctor if severe or worsening'
    ]
  },
  'muscle weakness,fatigue,muscle pain,difficulty swallowing': {
    disease: 'Myasthenia Gravis',
    confidence: 70,
    category: 'Musculoskeletal',
    severity: 'Moderate to Severe',
    recommendations: [
      'Consult neurologist immediately',
      'Specialized tests needed (EMG, antibody tests)',
      'Medications can improve symptoms',
      'Avoid triggers (stress, infections)',
      'May require immunosuppressive therapy',
      'Regular monitoring essential'
    ]
  },

  // Allergic Conditions
  'itching,hives,swelling,difficulty breathing': {
    disease: 'Anaphylaxis',
    confidence: 85,
    category: 'Allergic',
    severity: 'Critical',
    recommendations: [
      '🚨 Use EpiPen immediately if available',
      'Call 911 - this is life-threatening',
      'Lie down with legs elevated',
      'Do not stand up suddenly',
      'Second dose of epinephrine may be needed',
      'Hospital observation required'
    ]
  },
  'sneezing,runny nose,itchy eyes,congestion': {
    disease: 'Allergic Rhinitis',
    confidence: 88,
    category: 'Allergic',
    severity: 'Mild',
    recommendations: [
      'Identify and avoid allergens',
      'Antihistamines for symptom relief',
      'Nasal corticosteroid sprays effective',
      'Keep windows closed during high pollen',
      'Use air purifiers indoors',
      'Consider allergy testing and immunotherapy'
    ]
  },

  // Dermatological Conditions
  'rash,itching,redness,blisters': {
    disease: 'Eczema (Atopic Dermatitis)',
    confidence: 80,
    category: 'Dermatological',
    severity: 'Mild to Moderate',
    recommendations: [
      'Moisturize skin frequently',
      'Avoid harsh soaps and hot water',
      'Use prescribed topical corticosteroids',
      'Identify and avoid triggers',
      'Keep nails short to prevent scratching',
      'Consider wet wrap therapy for severe cases'
    ]
  },
  'red patches,silvery scales,itching,joint pain': {
    disease: 'Psoriasis',
    confidence: 78,
    category: 'Dermatological',
    severity: 'Moderate',
    recommendations: [
      'Consult dermatologist for treatment plan',
      'Topical treatments (corticosteroids, vitamin D)',
      'Phototherapy may be beneficial',
      'Systemic medications for severe cases',
      'Manage stress - can trigger flares',
      'Moisturize regularly'
    ]
  },

  // Mental Health Conditions
  'persistent sadness,loss of interest,fatigue,sleep changes': {
    disease: 'Depression',
    confidence: 75,
    category: 'Mental Health',
    severity: 'Moderate',
    recommendations: [
      'Consult mental health professional',
      'Therapy (CBT) very effective',
      'Antidepressant medication may help',
      'Regular exercise and sleep routine',
      'Social support important',
      'Crisis hotline: 988 (Suicide & Crisis Lifeline)'
    ]
  },
  'excessive worry,restlessness,fatigue,difficulty concentrating': {
    disease: 'Generalized Anxiety Disorder',
    confidence: 78,
    category: 'Mental Health',
    severity: 'Moderate',
    recommendations: [
      'Seek mental health evaluation',
      'Cognitive behavioral therapy effective',
      'Relaxation techniques (meditation, yoga)',
      'Regular exercise reduces anxiety',
      'Limit caffeine and alcohol',
      'Medication may be prescribed if needed'
    ]
  }
};

// @desc    AI Chatbot
// @route   POST /api/ai/chatbot
// @access  Private
export const chatbot = async (req, res, next) => {
  try {
    const { message } = req.body;

    // Simple rule-based chatbot (can be replaced with actual AI model)
    let response = '';

    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
      response = 'Fever can be a sign of infection. Normal body temperature is around 98.6°F (37°C). If your fever is above 103°F (39.4°C) or persists for more than 3 days, please consult a doctor. Stay hydrated and rest.';
    } else if (lowerMessage.includes('headache') || lowerMessage.includes('head pain')) {
      response = 'Headaches can have various causes including stress, dehydration, or underlying conditions. Try resting in a quiet, dark room, stay hydrated, and consider over-the-counter pain relievers. If severe or persistent, consult a healthcare provider.';
    } else if (lowerMessage.includes('cough')) {
      response = 'Coughs can be dry or productive. Stay hydrated, use honey (for adults), and avoid irritants. If accompanied by fever, difficulty breathing, or lasting more than 3 weeks, seek medical attention.';
    } else if (lowerMessage.includes('diabetes') || lowerMessage.includes('blood sugar')) {
      response = 'Diabetes management includes monitoring blood sugar levels, maintaining a healthy diet, regular exercise, and taking prescribed medications. Regular check-ups with your healthcare provider are essential.';
    } else if (lowerMessage.includes('blood pressure') || lowerMessage.includes('hypertension')) {
      response = 'Normal blood pressure is around 120/80 mmHg. High blood pressure can be managed through diet (low sodium), exercise, stress management, and medication if prescribed. Regular monitoring is important.';
    } else if (lowerMessage.includes('appointment') || lowerMessage.includes('book')) {
      response = 'To book an appointment, please go to the Appointments section in the sidebar or press Ctrl+A. You can select your preferred doctor, date, and time slot.';
    } else if (lowerMessage.includes('medication') || lowerMessage.includes('medicine')) {
      response = 'Always take medications as prescribed by your doctor. Never share medications, and inform your doctor about any side effects. Keep a list of all medications you\'re taking.';
    } else if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
      response = '🚨 For medical emergencies, please call emergency services (911) immediately or visit the nearest emergency room. Do not delay seeking emergency care.';
    } else {
      response = 'I\'m here to help with general health information. For specific medical advice, please consult with a healthcare professional. You can book an appointment through our system or ask me about symptoms, medications, or general health topics.';
    }

    res.json({
      success: true,
      data: { response }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Predict Disease from Symptoms
// @route   POST /api/ai/predict-disease
// @access  Private
export const predictDisease = async (req, res, next) => {
  try {
    const { symptoms } = req.body;

    // Normalize symptoms
    const normalizedSymptoms = symptoms
      .toLowerCase()
      .split(',')
      .map(s => s.trim())
      .sort()
      .join(',');

    // Find matching diseases (simulated ML prediction)
    const predictions = [];

    // Check for exact matches
    for (const [key, value] of Object.entries(diseaseDatabase)) {
      const keySymptoms = key.split(',').sort();
      const inputSymptoms = normalizedSymptoms.split(',');
      
      // Calculate similarity
      const commonSymptoms = keySymptoms.filter(s => inputSymptoms.includes(s));
      const similarity = (commonSymptoms.length / Math.max(keySymptoms.length, inputSymptoms.length)) * 100;

      if (similarity > 40) {
        predictions.push({
          disease: value.disease,
          confidence: Math.round(similarity),
          recommendations: value.recommendations
        });
      }
    }

    // Add generic predictions if no specific match
    if (predictions.length === 0) {
      predictions.push({
        disease: 'General Viral Infection',
        confidence: 60,
        recommendations: [
          'Rest and stay hydrated',
          'Monitor symptoms',
          'Consult a doctor if symptoms persist',
          'Take over-the-counter medications as needed'
        ]
      });
    }

    // Sort by confidence
    predictions.sort((a, b) => b.confidence - a.confidence);

    // Create alert for high-confidence critical conditions
    if (predictions[0].confidence > 70 && 
        (predictions[0].disease.includes('Cardiac') || 
         predictions[0].disease.includes('Meningitis'))) {
      await Alert.create({
        type: 'critical',
        title: `Potential ${predictions[0].disease} Detected`,
        message: `AI detected possible ${predictions[0].disease} with ${predictions[0].confidence}% confidence. Immediate medical attention recommended.`,
        user: req.user.id
      });
    }

    res.json({
      success: true,
      data: {
        predictions: predictions.slice(0, 3),
        recommendations: predictions[0]?.recommendations || []
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Classify Patient Risk
// @route   POST /api/ai/classify-risk
// @access  Private
export const classifyRisk = async (req, res, next) => {
  try {
    const { age, bloodPressure, heartRate, temperature, symptoms, medicalHistory } = req.body;

    let riskScore = 0;
    const factors = [];

    // Age factor
    const ageNum = parseInt(age);
    if (ageNum > 65) {
      riskScore += 20;
      factors.push('Age over 65 increases risk');
    } else if (ageNum > 50) {
      riskScore += 10;
      factors.push('Age over 50 moderately increases risk');
    }

    // Blood pressure factor
    if (bloodPressure) {
      const [systolic, diastolic] = bloodPressure.split('/').map(Number);
      if (systolic > 140 || diastolic > 90) {
        riskScore += 25;
        factors.push('High blood pressure detected');
      } else if (systolic < 90 || diastolic < 60) {
        riskScore += 20;
        factors.push('Low blood pressure detected');
      }
    }

    // Heart rate factor
    const hr = parseInt(heartRate);
    if (hr > 100) {
      riskScore += 15;
      factors.push('Elevated heart rate (tachycardia)');
    } else if (hr < 60 && hr > 0) {
      riskScore += 10;
      factors.push('Low heart rate (bradycardia)');
    }

    // Temperature factor
    const temp = parseFloat(temperature);
    if (temp > 103) {
      riskScore += 25;
      factors.push('High fever (>103°F)');
    } else if (temp > 100.4) {
      riskScore += 15;
      factors.push('Fever detected');
    } else if (temp < 95) {
      riskScore += 20;
      factors.push('Hypothermia risk');
    }

    // Symptoms factor
    const criticalSymptoms = ['chest pain', 'difficulty breathing', 'severe headache', 'confusion', 'seizure'];
    const symptomsLower = symptoms.toLowerCase();
    
    criticalSymptoms.forEach(symptom => {
      if (symptomsLower.includes(symptom)) {
        riskScore += 30;
        factors.push(`Critical symptom: ${symptom}`);
      }
    });

    // Medical history factor
    if (medicalHistory) {
      const historyLower = medicalHistory.toLowerCase();
      const conditions = ['diabetes', 'heart disease', 'cancer', 'kidney disease', 'copd'];
      
      conditions.forEach(condition => {
        if (historyLower.includes(condition)) {
          riskScore += 10;
          factors.push(`Pre-existing condition: ${condition}`);
        }
      });
    }

    // Cap risk score at 100
    riskScore = Math.min(riskScore, 100);

    // Determine risk level
    let riskLevel, urgency, urgencyMessage;
    const recommendations = [];

    if (riskScore >= 75) {
      riskLevel = 'Critical';
      urgency = 'immediate';
      urgencyMessage = '🚨 IMMEDIATE MEDICAL ATTENTION REQUIRED - Go to ER or call 911';
      recommendations.push('Seek emergency medical care immediately');
      recommendations.push('Do not delay treatment');
      recommendations.push('Have someone accompany you');
    } else if (riskScore >= 50) {
      riskLevel = 'High';
      urgency = 'urgent';
      urgencyMessage = '⚠️ Urgent medical consultation needed within 24 hours';
      recommendations.push('Schedule urgent doctor appointment');
      recommendations.push('Monitor symptoms closely');
      recommendations.push('Prepare medical history for doctor');
    } else if (riskScore >= 25) {
      riskLevel = 'Moderate';
      urgency = 'routine';
      urgencyMessage = 'Schedule a doctor appointment within a few days';
      recommendations.push('Book appointment with primary care physician');
      recommendations.push('Keep track of symptoms');
      recommendations.push('Maintain healthy lifestyle');
    } else {
      riskLevel = 'Low';
      urgency = 'routine';
      urgencyMessage = 'Continue routine care and monitoring';
      recommendations.push('Continue regular health monitoring');
      recommendations.push('Maintain healthy habits');
      recommendations.push('Schedule routine check-up');
    }

    // Create alert for high/critical risk
    if (riskScore >= 50) {
      await Alert.create({
        type: riskScore >= 75 ? 'critical' : 'warning',
        title: `${riskLevel} Risk Patient Detected`,
        message: `Patient risk score: ${riskScore}%. ${urgencyMessage}`,
        user: req.user.id
      });
    }

    res.json({
      success: true,
      data: {
        riskLevel,
        riskScore,
        factors,
        recommendations,
        urgency,
        urgencyMessage
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Alerts
// @route   GET /api/ai/alerts
// @access  Private
export const getAlerts = async (req, res, next) => {
  try {
    const alerts = await Alert.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      data: alerts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark Alert as Read
// @route   PUT /api/ai/alerts/:id/read
// @access  Private
export const markAlertRead = async (req, res, next) => {
  try {
    const alert = await Alert.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { read: true },
      { new: true }
    );

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found'
      });
    }

    res.json({
      success: true,
      data: alert
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear All Alerts
// @route   DELETE /api/ai/alerts
// @access  Private
export const clearAlerts = async (req, res, next) => {
  try {
    await Alert.deleteMany({ user: req.user.id });

    res.json({
      success: true,
      message: 'All alerts cleared'
    });
  } catch (error) {
    next(error);
  }
};
