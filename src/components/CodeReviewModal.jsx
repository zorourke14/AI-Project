import { useState, useEffect } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import { X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { marked } from 'marked';

const AiCodeReviewModal = ({ isOpen, onClose, problem, userCode, darkMode }) => {
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      if (isOpen && problem && userCode) {
        setIsLoading(true);
        setError(null);
        
        try {
          const response = await fetch('http://localhost:3000/pre-execution-guidance', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              problemDescription: problem.description,
              constraints: problem.constraints,
              userCode: userCode
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to fetch code review');
          }

          const data = await response.json();
          setReview(data.guidance);
        } catch (err) {
          setError('Failed to load code review. Please try again later.');
          console.error('Code review error:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchReview();
  }, [isOpen, problem, userCode]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <Dialog.Title className="text-2xl font-semibold mb-4 text-orange-500">
            Code Review: {problem?.title}
          </Dialog.Title>
          
          <Dialog.Description className="text-sm text-gray-500 mb-4">
            Pre-execution analysis and guidance for your code
          </Dialog.Description>

          <div className="mt-4">
            {isLoading && (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg text-red-500">
                {error}
              </div>
            )}

            {!isLoading && !error && (
              <div className={`prose ${darkMode ? 'prose-invert' : ''} max-w-none`}>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-purple-500">Your Current Code:</h3>
                  <pre className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                    <code>{userCode}</code>
                  </pre>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-purple-500">Analysis & Guidance:</h3>
                  <div 
                    className="mt-4"
                    dangerouslySetInnerHTML={{ 
                      __html: marked(review, { breaks: true })
                    }} 
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="flex space-x-4">
              <button 
                className={`p-2 rounded-full ${
                  darkMode ? 'bg-gray-700 text-green-500' : 'bg-gray-200 text-green-600'
                } hover:opacity-80`}
                aria-label="Helpful feedback"
              >
                <ThumbsUp size={24} />
              </button>
              <button 
                className={`p-2 rounded-full ${
                  darkMode ? 'bg-gray-700 text-red-500' : 'bg-gray-200 text-red-600'
                } hover:opacity-80`}
                aria-label="Not helpful feedback"
              >
                <ThumbsDown size={24} />
              </button>
            </div>
            
            <Dialog.Close asChild>
              <button 
                className={`p-2 rounded-full ${
                  darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                } hover:opacity-80`}
                aria-label="Close review"
              >
                <X size={24} />
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AiCodeReviewModal;