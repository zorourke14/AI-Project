import React from 'react';

const OutputPane = ({ output, darkMode }) => {
  return (
    <div className={`p-3 rounded-md bg-gray-800`}>
      <pre className={`whitespace-pre-wrap text-gray-300`}>{output}</pre>
    </div>
  );
};

export default OutputPane;