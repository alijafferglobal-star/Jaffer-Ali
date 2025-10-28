
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface PromptControlsProps {
  prompt: string;
  onPromptChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onGenerate: () => void;
  isDisabled: boolean;
}

const PromptControls: React.FC<PromptControlsProps> = ({ prompt, onPromptChange, onGenerate, isDisabled }) => {
  return (
    <div className="w-full space-y-2">
      <label htmlFor="prompt-input" className="text-sm font-medium text-gray-400">
        3. Describe Background & Environment
      </label>
      <textarea
        id="prompt-input"
        rows={4}
        value={prompt}
        onChange={onPromptChange}
        placeholder={isDisabled ? "Upload both images first" : "e.g., 'A futuristic city at night, neon lights'"}
        disabled={isDisabled}
        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed resize-none"
      />
      <button
        onClick={onGenerate}
        disabled={isDisabled}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:transform-none"
      >
        <SparklesIcon className="w-5 h-5" />
        <span>Generate Image</span>
      </button>
    </div>
  );
};

export default PromptControls;
