// API abstraction for backend endpoints
import { VideoMetadata } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export async function fetchMetadata(url: string): Promise<VideoMetadata> {
  const response = await fetch(`${BASE_URL}/metadata`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Failed to fetch metadata');
  }
  return await response.json();
}

export async function downloadVideo(url: string, quality: string): Promise<Blob> {
  const response = await fetch(`${BASE_URL}/download`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, quality }),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Failed to download video');
  }
  // Download as blob
  const blob = await response.blob();
  return blob;
}
