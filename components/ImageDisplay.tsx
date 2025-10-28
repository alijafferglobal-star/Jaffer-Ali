
import React from 'react';
import { PhotoIcon } from './icons/PhotoIcon';

interface ImageDisplayProps {
  title: string;
  imageUrl: string | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ title, imageUrl }) => {
  return (
    <div className="w-full h-full bg-gray-800 rounded-lg p-4 flex flex-col border border-gray-700">
      <h3 className="text-lg font-semibold text-gray-300 mb-2 flex-shrink-0">{title}</h3>
      <div className="flex-grow w-full h-full bg-gray-900/50 rounded-md flex items-center justify-center min-h-[200px]">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="max-w-full max-h-full object-contain rounded-md" />
        ) : (
          <div className="text-gray-600 flex flex-col items-center">
            <PhotoIcon className="w-16 h-16" />
            <span className="mt-2 text-sm text-center">Your generated image will appear here.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageDisplay;
