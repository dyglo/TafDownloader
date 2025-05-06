import React from 'react';
import { Youtube, Instagram, Clock, Download, Shield } from 'lucide-react';
import { theme as themeObj } from '../styles/theme';

interface AboutSectionProps {
  theme: 'light' | 'dark';
}

const AboutSection: React.FC<AboutSectionProps> = ({ theme }) => {
  return (
    <section id="about" className={`py-10 px-2 sm:py-14 sm:px-4 md:py-16 md:px-6 ${themeObj.section[theme]} backdrop-blur-sm`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 gradient-text">What is Taf Downloader?</h2>
          <p className={`text-base sm:text-lg ${themeObj.text.secondary} max-w-3xl mx-auto`}>
            Taf Downloader is one of the most popular video downloader tools on the internet. Here's why you should use it:
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div className={`${themeObj.card[theme]} backdrop-blur-sm p-6 rounded-2xl ${themeObj.shadow[theme]} hover:${themeObj.shadow[theme]} transition-all duration-500 glow-card pulse-hover`}>
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-500 mb-4 mx-auto transform transition-transform hover:scale-110">
              <Download size={32} />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-center mb-2">Fast Downloads</h3>
            <p className={`text-center ${themeObj.text.secondary}`}>
              High-speed, reliable video downloads with multiple quality options for the best experience.
            </p>
          </div>
          
          <div className={`${themeObj.card[theme]} backdrop-blur-sm p-6 rounded-2xl ${themeObj.shadow[theme]} hover:${themeObj.shadow[theme]} transition-all duration-500 glow-card pulse-hover`}>
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-500 mb-4 mx-auto transform transition-transform hover:scale-110">
              <Shield size={32} />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-center mb-2">Safe & Secure</h3>
            <p className={`text-center ${themeObj.text.secondary}`}>No registration required, no personal data collected, and no annoying ads or popups.</p>
          </div>
          
          <div className={`${themeObj.card[theme]} backdrop-blur-sm p-6 rounded-2xl ${themeObj.shadow[theme]} hover:${themeObj.shadow[theme]} transition-all duration-500 glow-card pulse-hover`}>
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-500 mb-4 mx-auto transform transition-transform hover:scale-110">
              <Clock size={32} />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-center mb-2">Save Time</h3>
            <p className={`text-center ${themeObj.text.secondary}`}>Quickly download videos for offline viewing without complicated steps or software.</p>
          </div>
        </div>
        
        <div className="mt-12 sm:mt-14 md:mt-16 text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 gradient-text">Supported Platforms</h3>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mt-4 sm:mt-6">
            <div className={`${themeObj.card[theme]} flex items-center gap-3 min-w-[120px] sm:min-w-[160px] px-4 py-2 sm:py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300`}>
              <Youtube size={24} className="text-red-500" />
              <span className="font-medium">YouTube</span>
            </div>
            <div className={`${themeObj.card[theme]} flex items-center gap-3 min-w-[120px] sm:min-w-[160px] px-4 py-2 sm:py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300`}>
              {/* X (Twitter) SVG */}
              <span className="w-6 h-6 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 30 30"><path d="M 6 4 C 4.895 4 4 4.895 4 6 L 4 24 C 4 25.105 4.895 26 6 26 L 24 26 C 25.105 26 26 25.105 26 24 L 26 6 C 26 4.895 25.105 4 24 4 L 6 4 z M 8.6484375 9 L 13.259766 9 L 15.951172 12.847656 L 19.28125 9 L 20.732422 9 L 16.603516 13.78125 L 21.654297 21 L 17.042969 21 L 14.056641 16.730469 L 10.369141 21 L 8.8945312 21 L 13.400391 15.794922 L 8.6484375 9 z M 10.878906 10.183594 L 17.632812 19.810547 L 19.421875 19.810547 L 12.666016 10.183594 L 10.878906 10.183594 z"></path></svg></span>
              <span className="font-medium">X (Twitter)</span>
            </div>
            <div className={`${themeObj.card[theme]} flex items-center gap-3 min-w-[120px] sm:min-w-[160px] px-4 py-2 sm:py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300`}>
              <Instagram size={24} className="text-pink-500" />
              <span className="font-medium">Instagram</span>
            </div>
            <div className={`${themeObj.card[theme]} flex items-center gap-3 min-w-[120px] sm:min-w-[160px] px-4 py-2 sm:py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300`}>
              {/* TikTok SVG */}
              <span className="w-6 h-6 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 3v2.25A3.75 3.75 0 0020.25 9h2.25" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6v9a3 3 0 11-3-3" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="font-medium">TikTok</span>
            </div>
            <div className={`${themeObj.card[theme]} flex items-center gap-3 min-w-[120px] sm:min-w-[160px] px-4 py-2 sm:py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300`}>
              {/* Facebook SVG */}
              <span className="w-6 h-6 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 2.5h-2.5A4.5 4.5 0 0010 7v3H7v4h3v8h4v-8h3l1-4h-4V7a1.5 1.5 0 011.5-1.5H17V2.5z" stroke="#1877F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="font-medium">Facebook</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;