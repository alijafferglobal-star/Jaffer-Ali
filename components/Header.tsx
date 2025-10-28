
import React from 'react';
import { MagicWandIcon } from './icons/MagicWandIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-4">
        <MagicWandIcon className="w-10 h-10 text-purple-400" />
        <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          AI Pose Replicator
        </h1>
      </div>
      <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
        Upload a subject image and a reference image for the pose. Describe the background and environment, and let AI generate a new image with the transferred pose.
      </p>
    </header>
  );
};

export default Header;
