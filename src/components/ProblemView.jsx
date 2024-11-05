import React from 'react';

const ProblemView = ({ problem, darkMode }) => {
  if (!problem) {
    console.error("No problem data provided to ProblemView");
    return <div className="text-center text-gray-500">No problem selected</div>;
  }

  console.log("Rendering problem:", problem);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-orange-500 mb-2">{problem.title}</h2>
        <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
          problem.difficulty === 'Easy' ? 'bg-green-500 text-white' :
          problem.difficulty === 'Medium' ? 'bg-yellow-500 text-gray-900' : 'bg-red-500 text-white'
        }`}>
          {problem.difficulty}
        </p>
      </div>
      <div className={`prose ${darkMode ? 'prose-invert' : ''} max-w-none`}>
        <h3 className="text-xl font-semibold text-orange-500">Problem Statement</h3>
        <p>{problem.description || 'No description available'}</p>
        {problem.example && (
          <>
            <h3 className="text-xl font-semibold text-orange-500 mt-4">Example</h3>
            <pre className={'p-4 rounded-md text-wrap bg-gray-600'}>
              <code>{problem.example}</code>
            </pre>
          </>
        )}
        {problem.constraints && problem.constraints.length > 0 && (
          <>
            <h3 className="text-xl font-semibold text-orange-500 mt-4">Constraints</h3>
            <ul className="list-disc pl-5">
              {problem.constraints.map((constraint, index) => (
                <li key={index} className="mb-1">{constraint}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ProblemView;