import { useState, useEffect, useCallback, useMemo } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { marked } from 'marked';

const CodeReviewSection = ({ problem, userCode, darkMode }) => {
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [lastReviewedCode, setLastReviewedCode] = useState('');

  // Reset visibility when problem changes
  useEffect(() => {
    setIsVisible(false);
    setReview('');
    setError(null);
    setLastReviewedCode('');
  }, [problem?.id]);

  const fetchReview = useCallback(async () => {
    if (!problem || !userCode) return;

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
      setLastReviewedCode(userCode);
    } catch (err) {
      setError('Failed to load code review. Please try again later.');
      console.error('Code review error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [problem, userCode]);

  // Compute if review needs to be fetched
  const needsReview = useMemo(() => {
    // Check if code is significantly different from last reviewed code
    if (!lastReviewedCode) return false;
    
    // Simple heuristic: more than 20% difference in code length or content
    const lengthDiff = Math.abs(userCode.length - lastReviewedCode.length);
    const lengthThreshold = Math.max(lastReviewedCode.length * 0.2, 20);
    
    return lengthDiff > lengthThreshold;
  }, [userCode, lastReviewedCode]);

  // Trigger review when explicitly requested
  const handleRequestReview = () => {
    setIsVisible(true);
    fetchReview();
  };

  if (!isVisible) {
    return (
      <button
        onClick={handleRequestReview}
        className={`w-full p-4 rounded-lg ${
          darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
        } transition-colors duration-200 text-left flex justify-between items-center`}
      >
        <div>
          <h3 className="text-lg font-semibold text-purple-500">Code Review</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Get AI-powered analysis and guidance for your code
          </p>
        </div>
        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Click to show →
        </span>
      </button>
    );
  }

  return (
    <div className={`w-full rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-6`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-purple-500">Code Review Analysis</h3>
        <div className="flex space-x-2">
          {needsReview && (
            <button
              onClick={fetchReview}
              className={`px-3 py-1 rounded text-sm ${
                darkMode 
                  ? 'bg-purple-700 text-white hover:bg-purple-600' 
                  : 'bg-purple-500 text-white hover:bg-purple-600'
              } transition-colors duration-200`}
            >
              Update Review
            </button>
          )}
          <button
            onClick={() => setIsVisible(false)}
            className={`px-3 py-1 rounded ${
              darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 
              'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors duration-200`}
          >
            Hide Review
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg text-red-500">
          {error}
        </div>
      )}

      {!isLoading && !error && review && (
        <div className={`prose ${darkMode ? 'prose-invert' : ''} max-w-none`}>
          <div
            className="mt-4"
            dangerouslySetInnerHTML={{
              __html: marked(review, { breaks: true })
            }}
          />
          
          
        </div>
      )}

      {!isLoading && !error && !review && (
        <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          No review available. Click 'Update Review' to generate analysis.
        </p>
      )}
    </div>
  );
};

export default CodeReviewSection;