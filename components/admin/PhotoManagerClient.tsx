/**
 * PhotoManagerClient - Client-Only Component
 * 
 * Build Process Documentation:
 * 1. This component only runs on the client side to avoid SSR issues
 * 2. Implements proper window object access checks
 * 3. Uses custom hooks for file management and drag/drop functionality
 * 4. Includes comprehensive error handling and loading states
 * 5. Follows accessibility guidelines for file uploads
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import {
  Upload,
  X,
  Download,
  Trash2,
  Grid,
  List,
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  ImageIcon,
  FolderOpen,
  Eye,
  Edit
} from 'lucide-react';
import { PhotoData, PhotoGridItem } from '@/app/admin/photo-manager/components/PhotoGrid';
import { FileUploadArea } from '@/app/admin/photo-manager/components/PhotoUpload';



/**
 * Custom hook for safe window object access
 * Prevents SSR issues by checking if window is available
 */
function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Custom hook for drag and drop functionality
 * Includes proper event handling and file validation
 */
export function useDragAndDrop(onFilesDropped: (files: File[]) => void) {
  const [isDragging, setIsDragging] = useState(false);
  const dragCounterRef = useRef(0);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounterRef.current = 0;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      onFilesDropped(files);
    }
  }, [onFilesDropped]);

  return {
    isDragging,
    dragHandlers: {
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
    },
  };
}

/**
 * Custom hook for photo management
 * Handles CRUD operations for photos with proper error handling
 */
function usePhotoManager() {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load photos on component mount
  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // In a real implementation, this would fetch from your API
      // For now, we'll simulate with localStorage or a mock API
      if (typeof window !== 'undefined') {
        const savedPhotos = localStorage.getItem('adminPhotos');
        if (savedPhotos) {
          const parsedPhotos = JSON.parse(savedPhotos).map((photo: any) => ({
            ...photo,
            uploadedAt: new Date(photo.uploadedAt),
          }));
          setPhotos(parsedPhotos);
        }
      }
    } catch (err) {
      setError('Failed to load photos');
      console.error('Error loading photos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadPhotos = async (files: File[]) => {
    try {
      setIsUploading(true);
      setError(null);

      // Validate files
      const validFiles = files.filter(file => {
        const isValidType = file.type.startsWith('image/');
        const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
        
        if (!isValidType) {
          toast.error(`${file.name} is not a valid image file`);
          return false;
        }
        
        if (!isValidSize) {
          toast.error(`${file.name} is too large (max 10MB)`);
          return false;
        }
        
        return true;
      });

      if (validFiles.length === 0) {
        setIsUploading(false);
        return;
      }

      // Process each file
      const newPhotos: PhotoData[] = [];
      
      for (const file of validFiles) {
        // In a real implementation, you'd upload to your server/cloud storage
        // For demo purposes, we'll create object URLs
        const url = URL.createObjectURL(file);
        
        const photoData: PhotoData = {
          id: `photo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          url,
          size: file.size,
          type: file.type,
          uploadedAt: new Date(),
          category: 'general',
          alt: file.name.replace(/\.[^/.]+$/, ''),
          tags: [],
        };
        
        newPhotos.push(photoData);
      }

      // Update state and localStorage
      const updatedPhotos = [...photos, ...newPhotos];
      setPhotos(updatedPhotos);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminPhotos', JSON.stringify(updatedPhotos));
      }

      toast.success(`Successfully uploaded ${newPhotos.length} photo(s)`);
    } catch (err) {
      setError('Failed to upload photos');
      toast.error('Upload failed. Please try again.');
      console.error('Error uploading photos:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const deletePhoto = async (photoId: string) => {
    try {
      const photoToDelete = photos.find(p => p.id === photoId);
      if (!photoToDelete) return;

      // Revoke object URL to prevent memory leaks
      if (photoToDelete.url.startsWith('blob:')) {
        URL.revokeObjectURL(photoToDelete.url);
      }

      // Update state and localStorage
      const updatedPhotos = photos.filter(p => p.id !== photoId);
      setPhotos(updatedPhotos);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminPhotos', JSON.stringify(updatedPhotos));
      }

      toast.success('Photo deleted successfully');
    } catch (err) {
      toast.error('Failed to delete photo');
      console.error('Error deleting photo:', err);
    }
  };

  const updatePhoto = async (photoId: string, updates: Partial<PhotoData>) => {
    try {
      const updatedPhotos = photos.map(photo =>
        photo.id === photoId ? { ...photo, ...updates } : photo
      );
      
      setPhotos(updatedPhotos);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminPhotos', JSON.stringify(updatedPhotos));
      }

      toast.success('Photo updated successfully');
    } catch (err) {
      toast.error('Failed to update photo');
      console.error('Error updating photo:', err);
    }
  };

  return {
    photos,
    isLoading,
    isUploading,
    error,
    uploadPhotos,
    deletePhoto,
    updatePhoto,
    refetch: loadPhotos,
  };
}



/**
 * Main PhotoManagerClient Component
 */
export default function PhotoManagerClient() {
  const isClient = useIsClient();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingPhoto, setEditingPhoto] = useState<PhotoData | null>(null);

  const {
    photos,
    isLoading,
    isUploading,
    error,
    uploadPhotos,
    deletePhoto,
    updatePhoto,
    refetch,
  } = usePhotoManager();

  // Filter photos based on search and category
  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = photo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.alt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || photo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Don't render anything until we're on the client
  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#000000] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#F5F5F5] mb-2">
            Photo Manager
          </h1>
          <p className="text-[#A5ACAF]">
            Upload and manage images for your vending machine website
          </p>
        </div>

        {/* Upload Area */}
        <div className="mb-8">
          <FileUploadArea
            onFilesSelected={uploadPhotos}
            isUploading={isUploading}
          />
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A5ACAF] w-4 h-4" />
              <input
                type="text"
                placeholder="Search photos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#111111] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder-[#A5ACAF] focus:border-[#FD5A1E] focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-[#111111] border border-[#333333] rounded-lg text-[#F5F5F5] focus:border-[#FD5A1E] focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="machines">Machines</option>
              <option value="products">Products</option>
              <option value="logos">Logos</option>
              <option value="general">General</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Mode Toggle */}
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#FD5A1E] text-[#000000]'
                  : 'bg-[#111111] text-[#A5ACAF] hover:text-[#F5F5F5]'
              }`}
              aria-label="Grid view"
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#FD5A1E] text-[#000000]'
                  : 'bg-[#111111] text-[#A5ACAF] hover:text-[#F5F5F5]'
              }`}
              aria-label="List view"
            >
              <List size={16} />
            </button>

            {/* Refresh */}
            <button
              onClick={refetch}
              disabled={isLoading}
              className="p-2 bg-[#111111] text-[#A5ACAF] hover:text-[#F5F5F5] rounded-lg transition-colors disabled:opacity-50"
              aria-label="Refresh photos"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center text-red-400">
            <AlertCircle className="w-5 h-5 mr-3" />
            {error}
          </div>
        )}

        {/* Photos Grid/List */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-[#111111] rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-[#4d4d4d] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#F5F5F5] mb-2">
              {photos.length === 0 ? 'No photos uploaded yet' : 'No photos match your filters'}
            </h3>
            <p className="text-[#A5ACAF] mb-6">
              {photos.length === 0
                ? 'Upload your first photos using the upload area above'
                : 'Try adjusting your search or category filter'}
            </p>
            {photos.length === 0 && (
              <button
                onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement | null)?.click()}
                className="px-6 py-3 bg-[#FD5A1E] text-[#000000] rounded-lg hover:bg-[#FD5A1E]/90 transition-colors font-medium"
              >
                Upload Photos
              </button>
            )}
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'
              : 'space-y-4'
          }>
            {filteredPhotos.map((photo) => (
              <PhotoGridItem
                key={photo.id}
                photo={photo}
                onDelete={deletePhoto}
                onEdit={setEditingPhoto}
              />
            ))}
          </div>
        )}

        {/* Stats */}
        {photos.length > 0 && (
          <div className="mt-8 p-4 bg-[#111111] rounded-lg border border-[#333333]">
            <div className="flex items-center justify-between text-sm text-[#A5ACAF]">
              <span>
                Showing {filteredPhotos.length} of {photos.length} photos
              </span>
              <span>
                Total size: {(photos.reduce((acc, photo) => acc + photo.size, 0) / (1024 * 1024)).toFixed(1)} MB
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}