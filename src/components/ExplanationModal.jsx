import React, { useState, useEffect } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import { X } from 'lucide-react';

const AiExplanationModal = ({ isOpen, onClose, problem, darkMode }) => {
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen && problem) {
      setIsLoading(true);
      // Simulating AI explanation generation
      setTimeout(() => {
        setExplanation(`
# ${problem.title} - Detailed Explanation

## Problem Overview
${problem.description}

## Key Concepts
- ${problem.tags.join('\n- ')}

## Approach
1. Understand the problem requirements
2. Identify the optimal data structures (e.g., ${problem.tags.includes('Array') ? 'arrays' : 'hash tables'})
3. Develop an algorithm that efficiently solves the problem

## Time and Space Complexity
- Time Complexity: O(n) where n is the input size
- Space Complexity: O(n) for additional storage

## Common Pitfalls
- Edge cases: Remember to handle empty inputs or special cases
- Optimization: Consider ways to improve the initial brute force solution

## Related Problems
- [Problem 1]: Brief description
- [Problem 2]: Brief description

## Tips for Solving
1. Start with a simple example and trace through your algorithm
2. Consider using multiple pointers or a sliding window technique
3. Think about preprocessing the input for faster lookup

Remember, practice is key to mastering these types of problems!
        `);
        setIsLoading(false);
      }, 1500);
    }
  }, [isOpen, problem]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <Dialog.Title className="text-2xl font-semibold mb-4 text-orange-500">AI Explanation: {problem?.title}</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500 mb-4">
            Detailed explanation and approach for solving this problem.
          </Dialog.Description>
          <div className="mt-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              </div>
            ) : (
              <div className={`prose ${darkMode ? 'prose-invert' : ''} max-w-none`}>
                {/* <div dangerouslySetInnerHTML={{ __html: marked(explanation) }} /> */}
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-end">
            <Dialog.Close asChild>
              <button className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'} hover:opacity-80`}>
                <X size={24} />
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AiExplanationModal;