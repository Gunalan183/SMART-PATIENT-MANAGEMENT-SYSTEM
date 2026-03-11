import { useState, useEffect, useRef } from 'react';
import { 
  Bot, Send, Loader, Activity, Brain,
  Stethoscope, Shield
} from 'lucide-react';
import { aiService } from '../services/aiService';
import toast from 'react-hot-toast';
import DiseasePredictionModal from '../components/ai/DiseasePredictionModal';
import RiskAssessmentModal from '../components/ai/RiskAssessmentModal';

const AIAssistant = () => {
  const [activeTab, setActiveTab] = useState('chatbot');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI Health Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Disease Prediction State
  const [symptoms, setSymptoms] = useState('');
  const [predictionResult, setPredictionResult] = useState(null);
  const [predictingDisease, setPredictingDisease] = useState(false);
  const [showPredictionModal, setShowPredictionModal] = useState(false);

  // Risk Classification State
  const [patientData, setPatientData] = useState({
    age: '',
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    symptoms: '',
    medicalHistory: ''
  });
  const [riskResult, setRiskResult] = useState(null);
  const [classifyingRisk, setClassifyingRisk] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Chatbot Functions
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await aiService.chatbot({ message: input });
      const assistantMessage = { 
        role: 'assistant', 
        content: response.data.response 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast.error('Failed to get response');
      const errorMessage = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Disease Prediction
  const handlePredictDisease = async () => {
    if (!symptoms.trim()) {
      toast.error('Please enter symptoms');
      return;
    }

    setPredictingDisease(true);
    try {
      const response = await aiService.predictDisease({ symptoms });
      setPredictionResult(response.data);
      setShowPredictionModal(true);
      toast.success('Disease prediction completed!');
    } catch (error) {
      toast.error('Failed to predict disease');
    } finally {
      setPredictingDisease(false);
    }
  };

  // Risk Classification
  const handleClassifyRisk = async () => {
    if (!patientData.age || !patientData.symptoms) {
      toast.error('Please fill required fields');
      return;
    }

    setClassifyingRisk(true);
    try {
      const response = await aiService.classifyRisk(patientData);
      setRiskResult(response.data);
      setShowRiskModal(true);
      toast.success('Risk classification completed!');
    } catch (error) {
      toast.error('Failed to classify risk');
    } finally {
      setClassifyingRisk(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Brain className="w-8 h-8" />
          <h1 className="text-2xl font-bold">AI Health Assistant</h1>
        </div>
        <p className="text-blue-100">
          Advanced AI-powered disease prediction, risk assessment, and health consultation
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('chatbot')}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
              activeTab === 'chatbot'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Bot className="w-5 h-5" />
            AI Chatbot
          </button>
          <button
            onClick={() => setActiveTab('prediction')}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
              activeTab === 'prediction'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Stethoscope className="w-5 h-5" />
            Disease Prediction
          </button>
          <button
            onClick={() => setActiveTab('risk')}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
              activeTab === 'risk'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Shield className="w-5 h-5" />
            Risk Classification
          </button>
        </div>

        <div className="p-6">
          {/* Chatbot Tab */}
          {activeTab === 'chatbot' && (
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  💡 Ask me about symptoms, medications, health tips, or general medical questions!
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="flex items-center gap-2 mb-2">
                          <Bot className="w-4 h-4 text-blue-600" />
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            AI Assistant
                          </span>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                      <Loader className="w-5 h-5 animate-spin text-blue-600" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your health question..."
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={loading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={loading || !input.trim()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send
                </button>
              </div>
            </div>
          )}

          {/* Disease Prediction Tab */}
          {activeTab === 'prediction' && (
            <div className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  🔬 Enter symptoms separated by commas (e.g., fever, cough, headache, fatigue)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Symptoms
                </label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Enter symptoms (e.g., fever, cough, headache, body ache, fatigue)"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <button
                onClick={handlePredictDisease}
                disabled={predictingDisease || !symptoms.trim()}
                className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {predictingDisease ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    Predict Disease
                  </>
                )}
              </button>

              {predictionResult && (
                <button
                  onClick={() => setShowPredictionModal(true)}
                  className="w-full px-6 py-3 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Activity className="w-5 h-5" />
                  View Last Results
                </button>
              )}
            </div>
          )}

          {/* Risk Classification Tab */}
          {activeTab === 'risk' && (
            <div className="space-y-6">
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  🏥 Enter patient vitals and symptoms for AI-powered risk assessment
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    value={patientData.age}
                    onChange={(e) => setPatientData({ ...patientData, age: e.target.value })}
                    placeholder="Enter age"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Blood Pressure (mmHg)
                  </label>
                  <input
                    type="text"
                    value={patientData.bloodPressure}
                    onChange={(e) => setPatientData({ ...patientData, bloodPressure: e.target.value })}
                    placeholder="e.g., 120/80"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Heart Rate (bpm)
                  </label>
                  <input
                    type="number"
                    value={patientData.heartRate}
                    onChange={(e) => setPatientData({ ...patientData, heartRate: e.target.value })}
                    placeholder="e.g., 72"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Temperature (°F)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={patientData.temperature}
                    onChange={(e) => setPatientData({ ...patientData, temperature: e.target.value })}
                    placeholder="e.g., 98.6"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Symptoms *
                </label>
                <textarea
                  value={patientData.symptoms}
                  onChange={(e) => setPatientData({ ...patientData, symptoms: e.target.value })}
                  placeholder="Describe current symptoms"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Medical History
                </label>
                <textarea
                  value={patientData.medicalHistory}
                  onChange={(e) => setPatientData({ ...patientData, medicalHistory: e.target.value })}
                  placeholder="Previous conditions, medications, allergies"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <button
                onClick={handleClassifyRisk}
                disabled={classifyingRisk || !patientData.age || !patientData.symptoms}
                className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {classifyingRisk ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Classify Risk
                  </>
                )}
              </button>

              {riskResult && (
                <button
                  onClick={() => setShowRiskModal(true)}
                  className="w-full px-6 py-3 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Shield className="w-5 h-5" />
                  View Last Assessment
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <DiseasePredictionModal
        isOpen={showPredictionModal}
        onClose={() => setShowPredictionModal(false)}
        result={predictionResult}
      />
      <RiskAssessmentModal
        isOpen={showRiskModal}
        onClose={() => setShowRiskModal(false)}
        result={riskResult}
      />
    </div>
  );
};

export default AIAssistant;
