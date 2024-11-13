import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const Quiz = ({ problemId, problemDescription, userCode, onClose }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch('http://localhost:3000/quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            problemId,
            userCode,
            problemDescription
          })
        });
        
        const data = await response.json();
        
        if (data.status === 'error') {
          throw new Error(data.error);
        }
        
        setQuestions(data.quiz.questions);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [problemId, userCode, problemDescription]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex) => {
    if (!isAnswered) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setIsComplete(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 rounded-lg dark:bg-gray-800 bg-white shadow-lg">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-lg dark:bg-gray-800 bg-white shadow-lg">
        <h2 className="text-xl font-bold text-red-500 mb-4">Error Loading Quiz</h2>
        <p className="dark:text-gray-300 text-gray-700 mb-4">{error}</p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg dark:bg-gray-800 bg-white shadow-lg">
      <h2 className="text-2xl font-bold text-purple-500 mb-6">
        {isComplete ? 'Quiz Complete!' : `Question ${currentQuestionIndex + 1} of ${questions.length}`}
      </h2>
      
      {isComplete ? (
        <div>
          <h3 className="text-xl mb-4 dark:text-white text-gray-900">Your Score: {score}/{questions.length}</h3>
          <p className="dark:text-gray-300 text-gray-700 mb-4">
            {score === questions.length 
              ? "Perfect score! You've mastered this concept!" 
              : "Keep practicing to improve your understanding!"}
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Close Quiz
          </button>
        </div>
      ) : (
        <>
          <div className="prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
          </div>
          <div className="mt-6 space-y-3">
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all
                  dark:text-white text-gray-900
                  ${selectedAnswer === index 
                    ? 'border-purple-500 dark:bg-purple-900/20 bg-purple-100' 
                    : 'dark:border-gray-700 border-gray-200 dark:hover:border-purple-300 hover:border-purple-500'}
                  ${isAnswered && index === currentQuestion.correctAnswer 
                    ? 'dark:bg-green-900/20 bg-green-100 border-green-500' 
                    : ''}
                  ${isAnswered && index === selectedAnswer && index !== currentQuestion.correctAnswer 
                    ? 'dark:bg-red-900/20 bg-red-100 border-red-500' 
                    : ''}
                `}
                disabled={isAnswered}
              >
                <div className="flex items-center justify-between">
                  <span dangerouslySetInnerHTML={{ __html: answer }} />
                  {isAnswered && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="text-green-500 h-5 w-5" />
                  )}
                  {isAnswered && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                    <XCircle className="text-red-500 h-5 w-5" />
                  )}
                </div>
              </button>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-6">
            {!isAnswered ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className={`px-6 py-2 rounded-lg ${
                  selectedAnswer === null
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-purple-500 hover:bg-purple-600'
                } text-white transition-colors`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
              >
                {currentQuestionIndex === questions.length - 1 ? 'Show Results' : 'Next Question'}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
            <div className="dark:text-gray-500 text-gray-600">
              Score: {score}/{currentQuestionIndex + 1}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;