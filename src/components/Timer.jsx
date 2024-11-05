import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const Timer = ({ darkMode }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center space-x-2 px-4 py-2 rounded-full ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      } shadow-lg`}
    >
      <Clock size={20} className="text-orange-500" />
      <span className="font-mono text-lg">{formatTime(time)}</span>
    </div>
  );
};

export default Timer;