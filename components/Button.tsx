
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="w-full font-bangers text-3xl tracking-wider text-white bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg px-6 py-3 transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg"
    >
      {children}
    </button>
  );
};
