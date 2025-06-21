import { Edit, Eye, RefreshCw, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";


/**
 * Interface for photo/image data
 */
export interface PhotoData {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: Date;
  category: 'machines' | 'products' | 'logos' | 'general';
  alt?: string;
  tags?: string[];
}

/**
 * Photo grid item component
 */
export function PhotoGridItem({ 
  photo, 
  onDelete, 
  onEdit 
}: { 
  photo: PhotoData; 
  onDelete: (id: string) => void;
  onEdit: (photo: PhotoData) => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${photo.name}"?`)) {
      setIsDeleting(true);
      await onDelete(photo.id);
      setIsDeleting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div
      className="group relative bg-[#111111] rounded-lg overflow-hidden border border-[#333333] hover:border-[#FD5A1E]/30 transition-all"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Image */}
      <div className="aspect-square relative">
        <Image
          src={photo.url}
          alt={photo.alt || photo.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover"
          onError={(e) => {
            // Handle broken images
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        
        {/* Overlay with actions */}
        <div
          className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity ${
            showActions ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex space-x-2">
            <button
              onClick={() => window.open(photo.url, '_blank')}
              className="p-2 bg-[#4d4d4d] text-[#F5F5F5] rounded-lg hover:bg-[#5d5d5d] transition-colors"
              aria-label={`View ${photo.name} in full size`}
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => onEdit(photo)}
              className="p-2 bg-[#FD5A1E] text-[#000000] rounded-lg hover:bg-[#FD5A1E]/90 transition-colors"
              aria-label={`Edit ${photo.name}`}
            >
              <Edit size={16} />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              aria-label={`Delete ${photo.name}`}
            >
              {isDeleting ? (
                <RefreshCw size={16} className="animate-spin" />
              ) : (
                <Trash2 size={16} />
              )}
            </button>
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 bg-[#FD5A1E] text-[#000000] text-xs font-medium rounded">
            {photo.category}
          </span>
        </div>
      </div>

      {/* Photo info */}
      <div className="p-3">
        <h4 className="text-[#F5F5F5] font-medium text-sm truncate mb-1">
          {photo.name}
        </h4>
        <div className="flex justify-between items-center text-xs text-[#A5ACAF]">
          <span>{formatFileSize(photo.size)}</span>
          <span>{photo.uploadedAt.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}