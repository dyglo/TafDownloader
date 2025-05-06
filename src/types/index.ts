export interface VideoMetadata {
  url: string;
  title: string;
  thumbnail: string;
  duration: string;
  platform: 'youtube' | 'twitter' | 'instagram' | 'tiktok' | 'facebook' | 'unknown';
  qualities: Quality[];
}

export interface Quality {
  label: string;
  value: string;
  format: string;
}

export interface DownloadProgress {
  progress: number;
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}