
import React, { useState, useEffect } from 'react';

const messages = [
  "Sketching characters...",
  "Inking the panels...",
  "Coloring the scenes...",
  "Adding dramatic shadows...",
  "Finalizing the artwork...",
  "Polishing the pixels...",
  "Bringing your story to life...",
];

export const Loader: React.FC = () => {
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = messages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-slate-300 flex flex-col items-center">
        <svg className="animate-spin h-12 w-12 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      <p className="mt-4 text-xl font-medium transition-opacity duration-500">{message}</p>
    </div>
  );
};
