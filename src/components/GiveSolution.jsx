import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const GiveSolution = ({ problemId, problemDescription, userCode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [solution, setSolution] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSolutionDialog, setShowSolutionDialog] = useState(false);

  const handleGetSolution = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:3000/give-solution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problemId,
          problemDescription,
          userCode: userCode || '',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status === 'success' && data.solution) {
        setSolution(data.solution);
        setShowConfirmDialog(false);
        setShowSolutionDialog(true);
      } else {
        throw new Error(data.error || 'Failed to get solution');
      }
    } catch (err) {
      console.error('Error fetching solution:', err);
      setError(err.message || 'Failed to get solution. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShowSolutionDialog(false);
    setShowConfirmDialog(false);
    setError('');
  };

  return (
    <>
      <button
        onClick={() => setShowConfirmDialog(true)}
        disabled={isLoading}
        className="px-4 py-2 bg-gray-700 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-600 dark:hover:bg-gray-500 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Getting Solution...</span>
          </>
        ) : (
          <span>I Give Up (Show Solution)</span>
        )}
      </button>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6 shadow-lg">
            <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-4">
              Are you sure?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We recommend trying to solve the problem yourself first. Looking at the solution too early might prevent you from learning effectively.
            </p>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
              >
                Keep Trying
              </button>
              <button
                onClick={
                  () => {
                    if (handleGetSolution){
                      handleGetSolution();
                      setShowConfirmDialog(false);
                    }
                  }
                }
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
                disabled={isLoading}
              >
                Show Solution
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Solution Dialog */}
      {showSolutionDialog && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full p-6 max-h-[80vh] overflow-y-auto shadow-lg">
            <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-4">
              Problem Solution
            </h3>
            {error ? (
              <div className="text-red-500 dark:text-red-400">{error}</div>
            ) : (
              <div className="prose dark:prose-invert max-w-none">
                <pre className="whitespace-pre-wrap bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 rounded-lg overflow-auto border border-gray-200 dark:border-gray-700">
                  {solution}
                </pre>
              </div>
            )}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GiveSolution;