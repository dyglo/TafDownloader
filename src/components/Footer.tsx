import React from 'react';
import { theme as themeObj } from '../styles/theme';
import ThemeToggle from './ThemeToggle';

interface FooterProps {
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

const Footer: React.FC<FooterProps> = ({ theme = 'light', onToggleTheme }) => {
  return (
    <footer className={`${themeObj.background[theme]} ${themeObj.text.primary} py-8 px-2 sm:px-4 md:px-6`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-start">
          <div>
            <h3 className="text-lg font-semibold mb-4">Taf Downloader</h3>
            <p className={`${themeObj.text.tertiary} text-sm`}>
              Taf Downloader is a simple and efficient way to download videos from popular platforms. For personal use only. <br/>
              <span className="block mt-2 text-yellow-400 font-semibold">⚠️ We do not encourage or support the use of copyrighted content. Downloading copyrighted videos without permission is prohibited.</span>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`${themeObj.text.tertiary} hover:text-white text-sm transition-colors`}>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className={`${themeObj.text.tertiary} hover:text-white text-sm transition-colors`}>
                  About
                </a>
              </li>
              <li>
                <a href="#how-it-works" className={`${themeObj.text.tertiary} hover:text-white text-sm transition-colors`}>
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className={`${themeObj.text.tertiary} hover:text-white text-sm transition-colors`}>
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`${themeObj.text.tertiary} hover:text-white text-sm transition-colors`}>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className={`${themeObj.text.tertiary} hover:text-white text-sm transition-colors`}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className={`${themeObj.text.tertiary} hover:text-white text-sm transition-colors`}>
                  Copyright Information
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Theme toggle for desktop only */}
        <div className="hidden md:flex justify-end mt-6">
          {onToggleTheme && (
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          )}
        </div>
        <div className={`border-t ${themeObj.border[theme]} mt-8 pt-6`}>
          <p className={`${themeObj.text.tertiary} text-sm sm:text-base text-center`}>
            &copy; {new Date().getFullYear()} Taf Downloader. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;