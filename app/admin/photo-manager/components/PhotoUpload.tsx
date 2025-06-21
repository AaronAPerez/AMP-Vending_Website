import { useDragAndDrop } from "@/components/admin/PhotoManagerClient";
import { RefreshCw, Upload } from "lucide-react";
import { useRef } from "react";

/**
 * File upload component with drag and drop
 */
export function FileUploadArea({ onFilesSelected, isUploading }: {
  onFilesSelected: (files: File[]) => void;
  isUploading: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { isDragging, dragHandlers } = useDragAndDrop(onFilesSelected);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesSelected(Array.from(e.target.files));
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
        isDragging
          ? 'border-[#FD5A1E] bg-[#FD5A1E]/10'
          : 'border-[#333333] hover:border-[#FD5A1E]/50 hover:bg-[#4d4d4d]/10'
      } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      {...dragHandlers}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Upload photos by clicking or dragging files here"
      aria-disabled={isUploading}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        disabled={isUploading}
        aria-label="Select image files to upload"
      />

      <div className="flex flex-col items-center space-y-4">
        {isUploading ? (
          <RefreshCw className="w-12 h-12 text-[#FD5A1E] animate-spin" aria-hidden="true" />
        ) : (
          <Upload className="w-12 h-12 text-[#A5ACAF]" aria-hidden="true" />
        )}

        <div>
          <h3 className="text-lg font-semibold text-[#F5F5F5] mb-2">
            {isUploading ? 'Uploading Photos...' : 'Upload Photos'}
          </h3>
          <p className="text-[#A5ACAF] text-sm">
            {isUploading
              ? 'Please wait while your photos are being uploaded'
              : 'Drag and drop images here, or click to browse'}
          </p>
          <p className="text-[#A5ACAF] text-xs mt-2">
            Supports: JPG, PNG, WebP, AVIF (max 10MB each)
          </p>
        </div>
      </div>
    </div>
  );
}
