import React, { useState } from 'react';
import './VideoPreview.css';
import { Clock, Download, CheckCircle } from 'lucide-react';
import { VideoMetadata, Quality, DownloadProgress } from '../types';
import { downloadVideoFromApi } from '../utils/videoUtils';
import { theme as themeObj } from '../styles/theme';

interface VideoPreviewProps {
  metadata: VideoMetadata;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ metadata }) => {
  const [selectedQuality, setSelectedQuality] = useState<Quality | null>(
    metadata.qualities.length > 0 ? metadata.qualities[0] : null
  );
  
  const [downloadState, setDownloadState] = useState<DownloadProgress>({
    progress: 0,
    status: 'idle',
  });

  const handleDownload = async () => {
    if (!selectedQuality) return;
    
    setDownloadState({ progress: 0, status: 'loading' });
    
    try {
      // Call backend to download video
      const blob = await downloadVideoFromApi(metadata.url, selectedQuality.value);
      // Trigger file download in browser
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${metadata.title || 'video'}_${selectedQuality.label}.mp4`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setDownloadState({ 
        progress: 100, 
        status: 'success', 
        message: 'Download complete!' 
      });
      setTimeout(() => {
        setDownloadState({ progress: 0, status: 'idle' });
      }, 3000);
    } catch (error) {
      setDownloadState({ 
        progress: 0, 
        status: 'error', 
        message: 'Download failed. Please try again.' 
      });
    }
  };

  const getPlatformText = () => {
    switch (metadata.platform) {
      case 'youtube':
        return 'YouTube';
      case 'twitter':
        return 'Twitter/X';
      case 'instagram':
        return 'Instagram';
      default:
        return 'Unknown';
    }
  };

  const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const quality = metadata.qualities.find(q => q.value === e.target.value);
    setSelectedQuality(quality || null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
      <div className="relative h-64 md:h-80 rounded-t-2xl overflow-hidden">
        <img 
          src={metadata.thumbnail} 
          alt={metadata.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <button 
            className="bg-white/20 hover:bg-white/30 rounded-full p-6 transition-all transform hover:scale-110 backdrop-blur-sm"
            aria-label="Play video"
          >
            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-16 border-l-white border-b-8 border-b-transparent ml-1" />
          </button>
        </div>
        <div className="absolute bottom-0 right-0 bg-black/70 backdrop-blur-sm px-4 py-2 m-4 rounded-full text-white flex items-center">
          <Clock size={14} className="mr-2" />
          <span className="text-sm">{metadata.duration}</span>
        </div>
      </div>
      
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-2 gradient-text line-clamp-2">{metadata.title}</h2>
        <p className="text-sm text-gray-500 mb-6">From {getPlatformText()}</p>
        
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex-1">
            <label htmlFor="quality" className={`block text-sm font-medium mb-2 ${themeObj.text.primary}`}>
              Select Quality
            </label>
            <select
              id="quality"
              value={selectedQuality?.value || ''}
              onChange={handleQualityChange}
              className={`block w-full rounded-full border border-gray-300 dark:border-neutral-800 shadow-sm py-3 px-4 bg-white dark:bg-black text-black dark:text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300`}
              disabled={metadata.qualities.length === 0 || downloadState.status === 'loading'}
            >
              {metadata.qualities.length === 0 ? (
                <option value="">No options available</option>
              ) : (
                metadata.qualities.map((quality) => (
                  <option key={quality.value} value={quality.value} className="text-black dark:text-white bg-white dark:bg-black">
                    {quality.label} ({quality.format})
                  </option>
                ))
              )}
            </select>
          </div>
          
          <button
            onClick={handleDownload}
            disabled={!selectedQuality || downloadState.status === 'loading'}
            className={`flex items-center justify-center gap-2 rounded-full px-8 py-3 text-white font-medium transition-all duration-500 ${
              !selectedQuality || downloadState.status === 'loading'
                ? 'bg-gray-300 cursor-not-allowed'
                : downloadState.status === 'success'
                ? 'bg-green-500 hover:bg-green-600 hover:shadow-lg'
                : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg'
            }`}
          >
            {downloadState.status === 'success' ? (
              <>
                <CheckCircle size={20} />
                <span>Downloaded</span>
              </>
            ) : downloadState.status === 'loading' ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <Download size={20} />
                <span>Download</span>
              </>
            )}
          </button>
        </div>
        
        {downloadState.status === 'loading' && (
          <div className="mb-4">
            <div className="progress-container">
              <div
                className="loading-bar"
                style={{ '--progress': `${downloadState.progress}%` } as React.CSSProperties}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-right">
              {downloadState.progress}% Complete
            </p>
          </div>
        )}
        
        {downloadState.status === 'error' && (
          <div className="text-red-500 text-sm mb-4">
            {downloadState.message}
          </div>
        )}

        <div className="mt-6 bg-yellow-50/80 backdrop-blur-sm border-l-4 border-yellow-400 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
          <p className="text-sm text-yellow-700">
            <strong>⚠️ Important Notice:</strong> This tool is for downloading videos for personal use only. 
            We do not support or encourage the download of copyrighted materials.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;