import React, { useState } from 'react';
import * as Dialog from "@radix-ui/react-dialog";

const AiHintModal = ({ isOpen, onClose, problem, userCode }) => {
  const [hint, setHint] = useState('');

  const generateHint = () => {
    // Simulating AI hint generation
    setHint(`Here's a hint for the "${problem.title}" problem:
    
1. Consider using a hash table to optimize your solution.
2. Think about edge cases, such as empty input or duplicate elements.
3. Can you solve this in a single pass through the input?`);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl">
          <Dialog.Title className="text-lg font-semibold mb-2">AI Hint for {problem.title}</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-600 mb-4">
            Get a helpful hint without spoiling the solution.
          </Dialog.Description>
          <div className="mt-4">
            {hint ? (
              <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-md">{hint}</pre>
            ) : (
              <p>Click the button below to generate a hint.</p>
            )}
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <button
              onClick={generateHint}
              disabled={!!hint}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {hint ? 'Hint Generated' : 'Generate Hint'}
            </button>
            <Dialog.Close asChild>
              <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                Close
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AiHintModal;