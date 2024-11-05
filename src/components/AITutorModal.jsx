import { useState } from 'react';
import { X, Send } from 'lucide-react';

const AiTutorModal = ({ isOpen, onClose, currentTopic }) => {
  const [conversation, setConversation] = useState([
    { role: 'assistant', content: `Hi there! I'm your AI tutor. Let's discuss ${currentTopic}. What would you like to know?` }
  ]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    const updatedConversation = [
      ...conversation,
      { role: 'user', content: userInput },
    ];

    setConversation(updatedConversation);
    setUserInput('');

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const aiResponse = simulateAiResponse(userInput, currentTopic);
      setConversation([...updatedConversation, { role: 'assistant', content: aiResponse }]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-purple-400">AI Tutor: {currentTopic}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {conversation.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] p-3 rounded-lg ${message.role === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-100'}`}>
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask your question..."
              className="flex-grow bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 transition-colors duration-200"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simulated AI response function (replace with actual AI integration)
const simulateAiResponse = (userInput, currentTopic) => {
  const responses = [
    `That's a great question about ${currentTopic}! Here's a simple explanation: ...`,
    `When it comes to ${currentTopic}, it's important to understand that ...`,
    `In ${currentTopic}, we often use the following approach: ...`,
    `Let me provide an example related to ${currentTopic}: ...`,
    `To master ${currentTopic}, you should focus on these key concepts: ...`,
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

export default AiTutorModal;