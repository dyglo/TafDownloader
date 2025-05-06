import React, { useState } from 'react';
import { Youtube, Twitter, Instagram, Link } from 'lucide-react';
import { VideoMetadata } from '../types';
import { theme } from '../styles/theme';

interface VideoUrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
  platform: VideoMetadata['platform'];
  error?: string; // Add error prop
}

const VideoUrlInput: React.FC<VideoUrlInputProps> = ({ onSubmit, isLoading, platform, error }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  const getPlatformIcon = () => {
    switch (platform) {
      case 'youtube':
        return <Youtube size={20} className="text-red-500" />;
      case 'twitter':
        return <Twitter size={20} className="text-blue-400" />;
      case 'instagram':
        return <Instagram size={20} className="text-pink-500" />;
      default:
        return <Link size={20} className="text-gray-500" />;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
        <div className={`flex flex-col sm:flex-row gap-2 sm:gap-0 rounded-2xl sm:rounded-full ${theme.shadow.light} ring-1 ring-inset ${theme.border.light} focus-within:ring-2 focus-within:ring-blue-500 ${theme.card.light} backdrop-blur-sm overflow-hidden transition-all duration-300 hover:${theme.shadow.light}`}> 
          {url && (
            <div className="flex items-center justify-center pl-4 pb-2 sm:pb-0 pt-2 sm:pt-0">
              {getPlatformIcon()}
            </div>
          )}
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your video URL here (YouTube, Twitter, Instagram)"
            className={`block flex-1 border-0 bg-transparent py-4 px-4 text-base sm:text-lg ${theme.text.primary} placeholder:text-gray-400 focus:ring-0 w-full`}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className={`w-full sm:w-auto px-8 py-4 text-base sm:text-lg font-medium rounded-2xl sm:rounded-full transition-all duration-500 mt-2 sm:mt-0 sm:ml-2 ${
              isLoading || !url.trim() 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              'Get Video'
            )}
          </button>
        </div>
        {isLoading && (
          <div className="mt-4 text-center text-gray-600 animate-pulse">
            🎥 Fetching your video details... Just a moment!
          </div>
        )}
      </form>
      {error && (
        <div className="mt-4 text-center text-red-600 bg-red-50 border border-red-200 rounded-lg py-2 px-4">
          {error}
        </div>
      )}
    </>
  );
};

export default VideoUrlInput;