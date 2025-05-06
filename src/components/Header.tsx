import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { theme as themeObj } from '../styles/theme';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <header className={`${themeObj.card[theme]} backdrop-blur-sm py-4 px-4 md:px-6 shadow-sm fixed top-0 left-0 right-0 z-10`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Taf Downloader Logo" className="w-8 h-8" />
          <h1 className="text-xl md:text-2xl font-bold gradient-text">
            Taf Downloader
          </h1>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          <a href="#" className={`text-base font-medium ${themeObj.text.secondary} hover:text-blue-500 transition-all duration-300`}>
            Home
          </a>
          <a href="#about" className={`text-base font-medium ${themeObj.text.secondary} hover:text-blue-500 transition-all duration-300`}>
            About
          </a>
          <a href="#how-it-works" className={`text-base font-medium ${themeObj.text.secondary} hover:text-blue-500 transition-all duration-300`}>
            How It Works
          </a>
          <a href="#faq" className={`text-base font-medium ${themeObj.text.secondary} hover:text-blue-500 transition-all duration-300`}>
            FAQ
          </a>
        </nav>
        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileNavOpen((v) => !v)}
          >
            {mobileNavOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
      {/* Mobile Nav Drawer */}
      {mobileNavOpen && (
        <nav className="md:hidden absolute left-0 right-0 top-full bg-white dark:bg-black shadow-lg border-t border-gray-200 dark:border-neutral-800 transition-all duration-300 z-20">
          <ul className="flex flex-col py-4 px-6 gap-4">
            <li>
              <a href="#" className="block py-2 text-lg font-medium text-gray-900 dark:text-white hover:text-blue-500" onClick={() => setMobileNavOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="block py-2 text-lg font-medium text-gray-900 dark:text-white hover:text-blue-500" onClick={() => setMobileNavOpen(false)}>
                About
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="block py-2 text-lg font-medium text-gray-900 dark:text-white hover:text-blue-500" onClick={() => setMobileNavOpen(false)}>
                How It Works
              </a>
            </li>
            <li>
              <a href="#faq" className="block py-2 text-lg font-medium text-gray-900 dark:text-white hover:text-blue-500" onClick={() => setMobileNavOpen(false)}>
                FAQ
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;