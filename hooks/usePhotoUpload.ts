/**
 * usePhotoUpload Hook - Fixed TypeScript Compatibility
 * 
 * Build Process Documentation:
 * 1. Fixed TypeScript iteration issues with Set spreading
 * 2. Implements proper type-safe array operations
 * 3. Uses Array.from() for Set iteration compatibility
 * 4. Maintains all original functionality with better type safety
 * 5. Compatible with both ES5 and modern targets
 */

'use client';

import { useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';

// Photo category type definition
export type PhotoCategory = 'machines' | 'products' | 'logos' | 'general';

// Photo interface
export interface Photo {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  category: PhotoCategory;
  uploadedAt: Date;
  alt?: string;
  tags?: string[];
}

// Upload progress interface
export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

// Hook return type
export interface UsePhotoUploadReturn {
  photos: Photo[];
  isUploading: boolean;
  uploadProgress: UploadProgress | null;
  error: string | null;
  uploadPhotos: (files: FileList | File[]) => Promise<void>;
  deletePhoto: (photoId: string) => Promise<void>;
  updatePhoto: (photoId: string, updates: Partial<Photo>) => Promise<void>;
  getPhotosByCategory: (category: PhotoCategory) => Photo[];
  getTotalSize: () => number;
  getCategories: () => PhotoCategory[];
  clearError: () => void;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for photo upload and management
 * Fixed TypeScript compatibility issues with Set spreading
 */
export function usePhotoUpload(): UsePhotoUploadReturn {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Validate file before upload
   */
  const validateFile = useCallback((file: File): boolean => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];

    if (!allowedTypes.includes(file.type)) {
      toast.error(`${file.name}: Invalid file type. Please use JPG, PNG, WebP, or AVIF.`);
      return false;
    }

    if (file.size > maxSize) {
      toast.error(`${file.name}: File too large. Maximum size is 10MB.`);
      return false;
    }

    return true;
  }, []);

  /**
   * Create photo object from file
   */
  const createPhotoFromFile = useCallback((file: File): Photo => {
    return {
      id: `photo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      url: URL.createObjectURL(file),
      size: file.size,
      type: file.type,
      category: 'general' as PhotoCategory,
      uploadedAt: new Date(),
      alt: file.name.replace(/\.[^/.]+$/, ''),
      tags: [],
    };
  }, []);

  /**
   * Upload photos with progress tracking
   */
  const uploadPhotos = useCallback(async (files: FileList | File[]) => {
    try {
      setIsUploading(true);
      setError(null);
      setUploadProgress({ loaded: 0, total: 0, percentage: 0 });

      // Convert FileList to Array if needed
      const fileArray = Array.from(files);
      
      // Validate all files first
      const validFiles = fileArray.filter(validateFile);
      
      if (validFiles.length === 0) {
        toast.error('No valid files to upload');
        return;
      }

      // Create abort controller for cancellation
      abortControllerRef.current = new AbortController();

      const totalSize = validFiles.reduce((sum, file) => sum + file.size, 0);
      let loadedSize = 0;

      const newPhotos: Photo[] = [];

      // Process files sequentially for better progress tracking
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        
        // Check if upload was cancelled
        if (abortControllerRef.current?.signal.aborted) {
          throw new Error('Upload cancelled');
        }

        try {
          // Simulate upload progress (replace with actual upload logic)
          const photo = createPhotoFromFile(file);
          
          // Simulate API upload with progress
          await new Promise<void>((resolve, reject) => {
            const uploadSimulation = setInterval(() => {
              loadedSize += file.size / 10; // Simulate progress
              
              const currentProgress = {
                loaded: Math.min(loadedSize, totalSize),
                total: totalSize,
                percentage: Math.min((loadedSize / totalSize) * 100, 100)
              };
              
              setUploadProgress(currentProgress);
              
              if (loadedSize >= file.size * (i + 1)) {
                clearInterval(uploadSimulation);
                resolve();
              }
            }, 100);

            // Simulate potential upload failure
            if (Math.random() < 0.05) { // 5% chance of failure for demo
              clearInterval(uploadSimulation);
              reject(new Error(`Failed to upload ${file.name}`));
            }
          });

          newPhotos.push(photo);
          toast.success(`Uploaded: ${file.name}`);
          
        } catch (fileError) {
          console.error(`Error uploading ${file.name}:`, fileError);
          toast.error(`Failed to upload: ${file.name}`);
        }
      }

      if (newPhotos.length > 0) {
        setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
        toast.success(`Successfully uploaded ${newPhotos.length} photo(s)`);
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
      abortControllerRef.current = null;
    }
  }, [validateFile, createPhotoFromFile]);

  /**
   * Delete a photo
   */
  const deletePhoto = useCallback(async (photoId: string) => {
    try {
      const photoToDelete = photos.find(p => p.id === photoId);
      if (!photoToDelete) {
        throw new Error('Photo not found');
      }

      // Revoke object URL to prevent memory leaks
      if (photoToDelete.url.startsWith('blob:')) {
        URL.revokeObjectURL(photoToDelete.url);
      }

      setPhotos(prevPhotos => prevPhotos.filter(p => p.id !== photoId));
      toast.success('Photo deleted successfully');
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete photo';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }, [photos]);

  /**
   * Update photo metadata
   */
  const updatePhoto = useCallback(async (photoId: string, updates: Partial<Photo>) => {
    try {
      setPhotos(prevPhotos =>
        prevPhotos.map(photo =>
          photo.id === photoId ? { ...photo, ...updates } : photo
        )
      );
      toast.success('Photo updated successfully');
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update photo';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }, []);

  /**
   * Get photos by category
   */
  const getPhotosByCategory = useCallback((category: PhotoCategory): Photo[] => {
    return photos.filter(photo => photo.category === category);
  }, [photos]);

  /**
   * Get total size of all photos
   */
  const getTotalSize = useCallback((): number => {
    return photos.reduce((total, photo) => total + photo.size, 0);
  }, [photos]);

  /**
   * Get all unique categories - FIXED TypeScript compatibility
   */
  const getCategories = useCallback((): PhotoCategory[] => {
    // Fixed: Use Array.from() instead of spread operator for Set iteration
    const categorySet = new Set(photos.map(p => p.category));
    return Array.from(categorySet);
  }, [photos]);

  /**
   * Refetch/reload photos (placeholder for API integration)
   */
  const refetch = useCallback(async () => {
    try {
      setError(null);
      // In a real implementation, this would fetch from API
      // For now, we'll just clear any errors
      toast.success('Photos refreshed');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh photos';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }, []);

  return {
    photos,
    isUploading,
    uploadProgress,
    error,
    uploadPhotos,
    deletePhoto,
    updatePhoto,
    getPhotosByCategory,
    getTotalSize,
    getCategories,
    clearError,
    refetch,
  };
}

export default usePhotoUpload;