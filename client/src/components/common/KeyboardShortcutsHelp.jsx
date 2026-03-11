import { X, Keyboard } from 'lucide-react';
import { useState } from 'react';

const KeyboardShortcutsHelp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { keys: ['Ctrl', 'D'], description: 'Go to Dashboard' },
    { keys: ['Ctrl', 'P'], description: 'Go to Patients' },
    { keys: ['Ctrl', 'A'], description: 'Go to Appointments' },
    { keys: ['Ctrl', 'M'], description: 'Go to Medical Records' },
    { keys: ['Ctrl', 'B'], description: 'Go to Billing' },
    { keys: ['Ctrl', 'Y'], description: 'Go to Analytics' },
    { keys: ['Ctrl', 'I'], description: 'Go to AI Assistant' },
    { keys: ['Ctrl', 'K'], description: 'Focus Search' },
    { keys: ['Esc'], description: 'Close Modal' },
    { keys: ['?'], description: 'Show Shortcuts' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 dark:bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all hover:scale-110"
        title="Keyboard Shortcuts (Press ?)"
      >
        <Keyboard className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Keyboard Shortcuts
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-3">
              {shortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2"
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    {shortcut.description}
                  </span>
                  <div className="flex gap-1">
                    {shortcut.keys.map((key, i) => (
                      <kbd
                        key={i}
                        className="px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KeyboardShortcutsHelp;
