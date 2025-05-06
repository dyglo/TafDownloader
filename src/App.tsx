import React, { useState } from 'react';
import './styles/darkMode.css';
import { VideoMetadata } from './types';
import { validateUrl, fetchMetadataFromApi, detectPlatform } from './utils/videoUtils';
import { theme as themeObj } from './styles/theme';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import VideoUrlInput from './components/VideoUrlInput';
import VideoPreview from './components/VideoPreview';
import AboutSection from './components/AboutSection';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';


function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const onToggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [platform, setPlatform] = useState<VideoMetadata['platform']>('unknown');

  const handleUrlSubmit = async (inputUrl: string) => {
    setError(null);
    
    if (!validateUrl(inputUrl)) {
      setError('Please enter a valid URL from YouTube, Twitter, or Instagram.');
      return;
    }
    
    const detectedPlatform = detectPlatform(inputUrl);
    setPlatform(detectedPlatform);
    
    setIsLoading(true);
    
    try {
      const videoMetadata = await fetchMetadataFromApi(inputUrl);
      setMetadata(videoMetadata);
    } catch (err) {
      setError('Failed to fetch video information. Please try again.');
      setMetadata(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${themeObj.background[theme]} ${themeObj.text.primary}`}>
      <div className={themeObj.background[theme]}>
        <Header theme={theme} onToggleTheme={onToggleTheme} />
      </div>
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className={`py-16 px-6 ${themeObj.section[theme]} backdrop-blur-sm`}>
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">
                Taf Video Downloader
              </span>
            </h1>
            <p className={`text-xl ${themeObj.text.tertiary} mb-10 max-w-3xl mx-auto`}>
              The fast, simple tool for quick, hassle-free downloads from 
              YouTube. Transform your offline video collection with this 
              reliable and efficient downloader.
            </p>
            
            <div className="mb-8">
              <VideoUrlInput 
                onSubmit={handleUrlSubmit} 
                isLoading={isLoading}
                platform={platform}
              />
              
              {error && (
                <div className="mt-4 text-red-500 text-sm bg-red-50/80 backdrop-blur-sm p-4 rounded-lg">
                  ⚠️ {error}
                </div>
              )}
            </div>
            
            <div className="bg-gray-900/90 backdrop-blur-sm text-white py-4 px-8 rounded-full inline-block shadow-lg hover:shadow-xl transition-all duration-300">
              <p className="text-sm uppercase font-medium tracking-wider">
                We do not allow/support the download of copyrighted material!
              </p>
            </div>
          </div>
        </section>
        
        {/* Video Preview Section */}
        {isLoading && (
          <section className="py-12 px-6">
            <div className="max-w-7xl mx-auto flex justify-center">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                <p className={`${themeObj.text.tertiary} animate-pulse`}>Fetching video information...</p>
              </div>
            </div>
          </section>
        )}
        
        {!isLoading && metadata && (
          <section className="py-12 px-6">
            <VideoPreview metadata={metadata} />
          </section>
        )}
        
        {/* Additional Sections */}
        <AboutSection theme={theme} />
        <HowItWorks theme={theme} />
        <FAQ theme={theme} />
      </main>
      
      <Footer theme={theme} onToggleTheme={onToggleTheme} />
    </div>
  );
}

export default App;