
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="font-bangers text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-400 to-indigo-500 tracking-wider">
        Gemini Comics
      </h1>
      <p className="mt-2 text-lg text-slate-300">
        Your Imagination, Instantly Illustrated.
      </p>
    </header>
  );
};
