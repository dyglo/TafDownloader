import { VideoMetadata } from '../types';
import { fetchMetadata, downloadVideo } from './api';

export const detectPlatform = (url: string): VideoMetadata['platform'] => {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  } else if (url.includes('twitter.com') || url.includes('x.com')) {
    return 'twitter';
  } else if (url.includes('instagram.com')) {
    return 'instagram';
  } else if (url.includes('tiktok.com')) {
    return 'tiktok';
  } else if (url.includes('facebook.com') || url.includes('fb.watch')) {
    return 'facebook';
  }
  return 'unknown';
};

export const validateUrl = (url: string): boolean => {
  // This is a simple validation, in a real app you would want more robust validation
  const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|twitter\.com|x\.com|instagram\.com|tiktok\.com|facebook\.com|fb\.watch)\/.+$/;
  return pattern.test(url);
};

// Use fetchMetadata from api.ts instead of mockFetchMetadata
export const fetchMetadataFromApi = async (url: string): Promise<VideoMetadata> => {
  const metadata = await fetchMetadata(url);
  return { ...metadata, url };
};

// Use downloadVideo from api.ts instead of mockDownloadVideo
export const downloadVideoFromApi = async (
  url: string,
  quality: string
): Promise<Blob> => {
  return await downloadVideo(url, quality);
};