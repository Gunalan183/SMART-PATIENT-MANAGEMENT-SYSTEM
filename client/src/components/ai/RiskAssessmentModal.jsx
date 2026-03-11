import { X, Shield, AlertTriangle, Heart, Activity, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

const RiskAssessmentModal = ({ isOpen, onClose, result }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !result) return null;

  const getRiskConfig = (level) => {
    const configs = {
      'Critical': {
        color: 'red',
        gradient: 'from-red-600 to-red-700',
        bg: 'bg-red-50 dark:bg-red-900/20',
        border: 'border-red-300 dark:border-red-700',
        text: 'text-red-600 dark:text-red-400',
        icon: AlertTriangle,
        emoji: '🚨'
      },
      'High': {
        color: 'orange',
        gradient: 'from-orange-600 to-orange-700',
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        border: 'border-orange-300 dark:border-orange-700',
        text: 'text-orange-600 dark:text-orange-400',
        icon: AlertTriangle,
        emoji: '⚠️'
      },
      'Moderate': {
        color: 'yellow',
        gradient: 'from-yellow-600 to-yellow-700',
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
        border: 'border-yellow-300 dark:border-yellow-700',
        text: 'text-yellow-600 dark:text-yellow-400',
        icon: Activity,
        emoji: '⚡'
      },
      'Low': {
        color: 'green',
        gradient: 'from-green-600 to-green-700',
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-300 dark:border-green-700',
        text: 'text-green-600 dark:text-green-400',
        icon: CheckCircle,
        emoji: '✅'
      }
    };
    return configs[level] || configs['Moderate'];
  };

  const config = getRiskConfig(result.riskLevel);
  const RiskIcon = config.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle w-full max-w-2xl">
          {/* Header with Dynamic Gradient */}
          <div className={`bg-gradient-to-r ${config.gradient} px-4 py-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Risk Assessment Results
                  </h3>
                  <p className="text-white/80 text-xs mt-0.5">
                    Comprehensive Patient Evaluation
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-4 max-h-[65vh] overflow-y-auto">
            {/* Risk Level Card */}
            <div className={`mb-4 ${config.bg} border-2 ${config.border} rounded-xl p-4`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`p-2 bg-gradient-to-br ${config.gradient} rounded-lg shadow-lg`}>
                    <RiskIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-0.5">
                      Risk Level
                    </div>
                    <div className={`text-2xl font-bold ${config.text}`}>
                      {result.riskLevel?.toUpperCase()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-4xl font-bold ${config.text}`}>
                    {result.riskScore}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                    Risk Score
                  </div>
                </div>
              </div>

              {/* Animated Risk Bar */}
              <div className="relative">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className={`bg-gradient-to-r ${config.gradient} h-3 rounded-full transition-all duration-1000 ease-out relative`}
                    style={{ width: `${result.riskScore}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Urgency Message */}
              {result.urgencyMessage && (
                <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className={`text-sm font-semibold ${config.text} flex items-center gap-2`}>
                    <span className="text-xl">{config.emoji}</span>
                    {result.urgencyMessage}
                  </p>
                </div>
              )}
            </div>

            {/* Risk Factors */}
            {result.factors && result.factors.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-red-600" />
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Contributing Risk Factors
                  </h5>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {result.factors.map((factor, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex-shrink-0 w-6 h-6 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center font-bold text-xs">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 dark:text-gray-200">
                            {factor}
                          </p>
                        </div>
                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {result.recommendations && result.recommendations.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-blue-600 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Recommended Actions
                  </h5>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                          {index + 1}
                        </div>
                        <span className="text-xs text-blue-900 dark:text-blue-200 flex-1 pt-0.5">
                          {rec}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Risk Level Guide */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700 mb-3">
              <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Risk Level Guide
              </h5>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-2 bg-gradient-to-r from-red-600 to-red-700 rounded-full" />
                  <span className="text-xs text-gray-700 dark:text-gray-300">
                    <strong>Critical (75-100%):</strong> Immediate ER visit
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-2 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full" />
                  <span className="text-xs text-gray-700 dark:text-gray-300">
                    <strong>High (50-74%):</strong> Urgent care within 24h
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-2 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-full" />
                  <span className="text-xs text-gray-700 dark:text-gray-300">
                    <strong>Moderate (25-49%):</strong> Doctor visit in few days
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-2 bg-gradient-to-r from-green-600 to-green-700 rounded-full" />
                  <span className="text-xs text-gray-700 dark:text-gray-300">
                    <strong>Low (0-24%):</strong> Routine monitoring
                  </span>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-yellow-800 dark:text-yellow-200">
                  <p className="font-semibold mb-0.5">Medical Disclaimer</p>
                  <p>
                    This risk assessment is based on AI analysis and should be used as a guide only. 
                    Always seek professional medical advice for accurate diagnosis and treatment planning.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              Close
            </button>
            <button
              onClick={() => window.print()}
              className={`px-4 py-2 bg-gradient-to-r ${config.gradient} text-white rounded-lg hover:shadow-xl transition-all text-sm font-medium shadow-lg`}
            >
              Print Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessmentModal;
