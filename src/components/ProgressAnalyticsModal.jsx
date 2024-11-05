import React from 'react';
import { X, TrendingUp, Award, BrainCircuit } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressAnalyticsModal = ({ isOpen, onClose, userProgress }) => {
  if (!isOpen) return null;

  const { completedProblems, averageScore, skillImprovements, recommendedTopics } = userProgress;

  const chartData = [
    { name: 'Easy', problems: Math.floor(completedProblems * 0.5) },
    { name: 'Medium', problems: Math.floor(completedProblems * 0.3) },
    { name: 'Hard', problems: Math.floor(completedProblems * 0.2) },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-2xl font-semibold text-purple-400">Your Progress Analytics</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard
              icon={<TrendingUp className="text-green-500" size={24} />}
              title="Completed Problems"
              value={completedProblems}
            />
            <StatCard
              icon={<Award className="text-yellow-500" size={24} />}
              title="Average Score"
              value={`${averageScore}%`}
            />
          </div>

          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-purple-300">Problem Difficulty Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                  itemStyle={{ color: '#E5E7EB' }}
                />
                <Bar dataKey="problems" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AIInsightCard
              icon={<BrainCircuit className="text-blue-500" size={24} />}
              title="Skill Improvements"
              items={skillImprovements}
            />
            <AIInsightCard
              icon={<BrainCircuit className="text-purple-500" size={24} />}
              title="Recommended Topics"
              items={recommendedTopics}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-gray-700 p-6 rounded-lg flex items-center space-x-4">
    {icon}
    <div>
      <h3 className="text-lg font-medium text-gray-300">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

const AIInsightCard = ({ icon, title, items }) => (
  <div className="bg-gray-700 p-6 rounded-lg">
    <div className="flex items-center space-x-2 mb-4">
      {icon}
      <h3 className="text-xl font-semibold text-purple-300">{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-gray-300">• {item}</li>
      ))}
    </ul>
  </div>
);

export default ProgressAnalyticsModal;