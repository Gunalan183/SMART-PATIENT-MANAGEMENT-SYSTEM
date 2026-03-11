import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Check if Ctrl (or Cmd on Mac) is pressed
      const isCtrl = e.ctrlKey || e.metaKey;
      
      // Ignore if user is typing in an input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      // Navigation shortcuts
      if (isCtrl) {
        switch (e.key.toLowerCase()) {
          case 'd':
            e.preventDefault();
            navigate('/dashboard');
            break;
          case 'p':
            e.preventDefault();
            navigate('/patients');
            break;
          case 'a':
            e.preventDefault();
            navigate('/appointments');
            break;
          case 'm':
            e.preventDefault();
            navigate('/medical-records');
            break;
          case 'b':
            e.preventDefault();
            navigate('/billing');
            break;
          case 'y':
            e.preventDefault();
            navigate('/analytics');
            break;
          case 'i':
            e.preventDefault();
            navigate('/ai-assistant');
            break;
          case 'k':
            e.preventDefault();
            // Focus search input
            document.querySelector('input[type="text"]')?.focus();
            break;
          default:
            break;
        }
      }

      // Escape key to close modals
      if (e.key === 'Escape') {
        // Trigger close on any open modal
        const closeButtons = document.querySelectorAll('[data-modal-close]');
        closeButtons.forEach(btn => btn.click());
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [navigate]);
};
