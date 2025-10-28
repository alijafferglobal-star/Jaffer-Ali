
import React, { useRef, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  previewUrl: string | null;
  title: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, previewUrl, title }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="w-full">
      <label className="text-sm font-medium text-gray-400 mb-2 block">{title}</label>
      <div 
        onClick={handleUploadClick}
        className="relative group w-full aspect-video bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:border-purple-500 hover:bg-gray-700 transition-all duration-300 overflow-hidden"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-contain" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
              <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Change Image</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-gray-500 group-hover:text-purple-400 transition-colors">
            <UploadIcon className="w-12 h-12 mb-2" />
            <span className="font-semibold">Click to upload</span>
            <span className="text-sm">PNG, JPG, WEBP, etc.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
