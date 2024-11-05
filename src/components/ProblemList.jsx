const problems = [
    { 
      id: 'two-sum', 
      title: 'Two Sum', 
      difficulty: 'Easy', 
      tags: ['Array', 'Hash Table'],
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      example: 'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].',
      constraints: [
        '2 <= nums.length <= 10^4',
        '-10^9 <= nums[i] <= 10^9',
        '-10^9 <= target <= 10^9',
        'Only one valid answer exists.'
      ]
    },
    { 
      id: 2, 
      title: 'Add Two Numbers', 
      difficulty: 'Medium', 
      tags: ['Linked List', 'Math'],
      description: 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.',
      example: 'Input: l1 = [2,4,3], l2 = [5,6,4]\nOutput: [7,0,8]\nExplanation: 342 + 465 = 807.',
      constraints: [
        'The number of nodes in each linked list is in the range [1, 100].',
        '0 <= Node.val <= 9',
        'It is guaranteed that the list represents a number that does not have leading zeros.'
      ]
    },
  ];
  
  const ProblemList = ({ onSelectProblem, darkMode }) => {
    const handleProblemSelect = (problem) => {
      console.log("Selecting problem:", problem);
      onSelectProblem(problem);
    };
  
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">Problem List</h2>
        {problems.map((problem) => (
          <div key={problem.id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-800 hover:bg-gray-500'} transition-colors duration-200 shadow-md`}>
            <h3 className="font-medium text-lg mb-2">{problem.title}</h3>
            <p className={`text-sm inline-block px-2 py-1 rounded-full mb-2 ${
              problem.difficulty === 'Easy' ? 'bg-green-500 text-white' :
              problem.difficulty === 'Medium' ? 'bg-yellow-500 text-gray-900' : 'bg-red-500 text-white'
            }`}>
              {problem.difficulty}
            </p>
            <div className="mb-3">
              {problem.tags.map((tag) => (
                <span key={tag} className="inline-block bg-gray-700 text-gray-300 rounded-full px-2 py-1 text-xs font-semibold mr-2 mb-1">
                  {tag}
                </span>
              ))}
            </div>
            <button 
              onClick={() => handleProblemSelect(problem)} 
              className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors duration-200"
            >
              Solve Problem
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  export default ProblemList;