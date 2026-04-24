'use client';

import React, { useRef, useEffect, useState } from 'react';

interface VideoThumbnailProps {
  videoUrl: string;
  alt: string;
  className?: string;
  seekTime?: number; // Time in seconds to seek to (default: 1 second or 10% of duration)
  onThumbnailGenerated?: (thumbnailUrl: string) => void;
}

/**
 * VideoThumbnail component that extracts a frame from a specific time in the video
 * (not the first frame, which is often black) and uses it as a thumbnail.
 * 
 * Best practices implemented:
 * - Extracts frame from a specific time (default: 1 second or 10% of duration)
 * - Caches the thumbnail to avoid re-extraction
 * - Lazy loads the video only when needed
 * - Graceful fallback if extraction fails
 * - Performance optimized (only extracts once)
 */
export default function VideoThumbnail({
  videoUrl,
  alt,
  className = '',
  seekTime,
  onThumbnailGenerated,
}: VideoThumbnailProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const thumbnailGeneratedRef = useRef(false);

  useEffect(() => {
    if (!videoRef.current || thumbnailGeneratedRef.current) return;

    const video = videoRef.current;
    let timeoutId: NodeJS.Timeout;

    const generateThumbnail = () => {
      try {
        // Check if video metadata is loaded
        if (video.readyState < 2) {
          // Wait for metadata to load
          video.addEventListener('loadedmetadata', generateThumbnail, { once: true });
          return;
        }

        // Determine seek time: use provided time, or 1 second, or 10% of duration (whichever is smaller)
        const duration = video.duration || 0;
        let targetTime = seekTime;
        
        if (targetTime === undefined) {
          // Default: use 1 second or 10% of duration, whichever is smaller
          targetTime = duration > 0 ? Math.min(1, duration * 0.1) : 1;
        }
        
        // Ensure we don't seek beyond video duration
        targetTime = Math.min(targetTime, duration > 0 ? duration - 0.1 : 1);

        // Seek to the target time
        video.currentTime = targetTime;

        // Wait for the video to seek and decode the frame
        const seekedHandler = () => {
          try {
            const canvas = canvasRef.current;
            if (!canvas) {
              throw new Error('Canvas element not found');
            }
            
            // Set canvas dimensions to match video
            canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 360;
            
            const ctx = canvas.getContext('2d');

            if (!ctx) {
              throw new Error('Could not get canvas context');
            }

            // Draw the video frame to canvas
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Convert canvas to data URL (thumbnail)
            const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
            setThumbnailUrl(dataUrl);
            setIsLoading(false);
            thumbnailGeneratedRef.current = true;

            // Callback if provided
            if (onThumbnailGenerated) {
              onThumbnailGenerated(dataUrl);
            }

            // Clean up: remove event listeners and reset video
            video.removeEventListener('seeked', seekedHandler);
            video.currentTime = 0; // Reset to beginning
          } catch (error) {
            console.error('Error generating thumbnail:', error);
            setHasError(true);
            setIsLoading(false);
          }
        };

        video.addEventListener('seeked', seekedHandler, { once: true });

        // Timeout fallback in case seeked event doesn't fire
        timeoutId = setTimeout(() => {
          if (!thumbnailGeneratedRef.current) {
            console.warn('Thumbnail generation timeout');
            setHasError(true);
            setIsLoading(false);
          }
        }, 5000);

      } catch (error) {
        console.error('Error in generateThumbnail:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    // Set up video loading
    const loadedDataHandler = () => {
      generateThumbnail();
    };

    const errorHandler = () => {
      console.error('Video load error');
      setHasError(true);
      setIsLoading(false);
    };

    video.addEventListener('loadeddata', loadedDataHandler, { once: true });
    video.addEventListener('error', errorHandler, { once: true });

    // Start loading the video
    video.load();

    // Cleanup
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      video.removeEventListener('loadeddata', loadedDataHandler);
      video.removeEventListener('error', errorHandler);
    };
  }, [videoUrl, seekTime, isLoading, onThumbnailGenerated]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Hidden video element for frame extraction */}
      <video
        ref={videoRef}
        src={videoUrl}
        crossOrigin="anonymous"
        preload="metadata"
        style={{ display: 'none' }}
      />
      
      {/* Hidden canvas for frame extraction */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Show thumbnail if available */}
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        /* Loading/Error state */
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          {isLoading && !hasError && (
            <div className="animate-pulse text-gray-500">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          {hasError && (
            <div className="text-center text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Video</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
