import { X, AlertCircle, CheckCircle, TrendingUp, Activity, Stethoscope, AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

const DiseasePredictionModal = ({ isOpen, onClose, result }) => {
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

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-red-600 bg-red-50 dark:bg-red-900/20';
    if (confidence >= 60) return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
    if (confidence >= 40) return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
    return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
  };

  const getConfidenceBarColor = (confidence) => {
    if (confidence >= 80) return 'bg-red-600';
    if (confidence >= 60) return 'bg-orange-600';
    if (confidence >= 40) return 'bg-yellow-600';
    return 'bg-blue-600';
  };

  const getSeverityBadge = (severity) => {
    const colors = {
      'Critical': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'Severe': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'Moderate': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'Mild': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
    };
    return colors[severity] || colors['Moderate'];
  };

  const topPrediction = result.predictions?.[0];

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
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Disease Prediction Results
                  </h3>
                  <p className="text-purple-100 text-xs mt-0.5">
                    AI-Powered Analysis Complete
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
            {/* Top Prediction Highlight */}
            {topPrediction && (
              <div className="mb-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-4 border-2 border-purple-200 dark:border-purple-800">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                        Most Likely Condition
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {topPrediction.disease}
                    </h4>
                    {topPrediction.category && (
                      <span className="inline-block px-2 py-0.5 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full">
                        {topPrediction.category}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {topPrediction.confidence}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Confidence
                    </div>
                  </div>
                </div>

                {/* Confidence Bar */}
                <div className="mb-3">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${topPrediction.confidence}%` }}
                    />
                  </div>
                </div>

                {/* Severity Badge */}
                {topPrediction.severity && (
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Severity:</span>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getSeverityBadge(topPrediction.severity)}`}>
                      {topPrediction.severity}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* All Predictions */}
            {result.predictions && result.predictions.length > 1 && (
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  Other Possible Conditions
                </h5>
                <div className="space-y-2">
                  {result.predictions.slice(1).map((pred, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1">
                          <h6 className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">
                            {pred.disease}
                          </h6>
                          {pred.category && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {pred.category}
                            </span>
                          )}
                        </div>
                        <div className={`px-2 py-1 rounded-lg text-sm font-semibold ${getConfidenceColor(pred.confidence)}`}>
                          {pred.confidence}%
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                          className={`${getConfidenceBarColor(pred.confidence)} h-1.5 rounded-full transition-all duration-700`}
                          style={{ width: `${pred.confidence}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {result.recommendations && result.recommendations.length > 0 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-blue-600 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <h5 className="text-sm font-semibold text-blue-900 dark:text-blue-200">
                    Recommended Actions
                  </h5>
                </div>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-xs text-blue-900 dark:text-blue-200 flex-1">
                        {rec}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-yellow-800 dark:text-yellow-200">
                  <p className="font-semibold mb-0.5">Important Disclaimer</p>
                  <p>
                    This AI prediction is for informational purposes only and should not replace professional medical advice. 
                    Please consult with a qualified healthcare provider for proper diagnosis and treatment.
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
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-sm font-medium shadow-lg hover:shadow-xl"
            >
              Print Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseasePredictionModal;
