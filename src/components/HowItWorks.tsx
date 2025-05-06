import React from 'react';
import { Link, FileSearch, Download } from 'lucide-react';
import { theme as themeObj } from '../styles/theme';

interface HowItWorksProps {
  theme: 'light' | 'dark';
}

const HowItWorks: React.FC<HowItWorksProps> = ({ theme }) => {
  return (
    <section id="how-it-works" className={`py-10 px-2 sm:py-14 sm:px-4 md:py-16 md:px-6 ${themeObj.section[theme]}`}> 
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">How It Works</h2>
          <p className={`text-base sm:text-lg ${themeObj.text.tertiary} max-w-3xl mx-auto`}>
            Download your favorite videos in three simple steps:
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div className={`${themeObj.card[theme]} border ${themeObj.border[theme]} p-6 rounded-lg shadow-sm flex flex-col items-center text-center`}>
            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-500 text-white mb-4">
              <Link size={28} />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">1. Copy & Paste URL</h3>
            <p className={themeObj.text.tertiary}>
              Find a video you want to download and copy its URL from the address bar. Paste it into our search box.
            </p>
          </div>
          <div className={`${themeObj.card[theme]} border ${themeObj.border[theme]} p-6 rounded-lg shadow-sm flex flex-col items-center text-center`}>
            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-500 text-white mb-4">
              <FileSearch size={28} />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">2. Select Quality</h3>
            <p className={themeObj.text.tertiary}>
              Once the video is analyzed, you'll see a preview with various quality options. Choose the one that best suits your needs.
            </p>
          </div>
          <div className={`${themeObj.card[theme]} border ${themeObj.border[theme]} p-6 rounded-lg shadow-sm flex flex-col items-center text-center`}>
            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-500 text-white mb-4">
              <Download size={28} />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">3. Download</h3>
            <p className={themeObj.text.tertiary}>
              Click the download button and your video will begin downloading immediately. Save it to your preferred location.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;