import React from 'react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center px-4 py-2 rounded-full border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-sm font-medium transition-all duration-300 shadow hover:shadow-md focus:outline-none"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <span className="flex items-center gap-2">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-8.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.95-7.07l-.71.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          Dark
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-600"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" /></svg>
          Light
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
