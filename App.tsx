
import React, { useState, useCallback } from 'react';
import { generateImageWithPose } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ImageDisplay from './components/ImageDisplay';
import PromptControls from './components/PromptControls';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [modelImageBase64, setModelImageBase64] = useState<string | null>(null);
  const [poseImage, setPoseImage] = useState<File | null>(null);
  const [poseImageBase64, setPoseImageBase64] = useState<string | null>(null);

  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (
    file: File, 
    setImage: React.Dispatch<React.SetStateAction<File | null>>,
    setBase64: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    setImage(file);
    setError(null);
    try {
      const base64 = await fileToBase64(file);
      setBase64(base64);
    } catch (err) {
      setError('Failed to read an image file. Please try another one.');
      setImage(null);
      setBase64(null);
    }
  }, []);

  const handleModelImageUpload = (file: File) => handleImageUpload(file, setModelImage, setModelImageBase64);
  const handlePoseImageUpload = (file: File) => handleImageUpload(file, setPoseImage, setPoseImageBase64);

  const handleGenerate = useCallback(async () => {
    if (!modelImageBase64 || !poseImageBase64) {
      setError('Please upload both a model image and a pose reference image.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const modelData = extractBase64Data(modelImageBase64);
      const poseData = extractBase64Data(poseImageBase64);

      const newImageBase64 = await generateImageWithPose(modelData, poseData, prompt);
      // Use a consistent mimeType for the output, or derive from input if needed
      setGeneratedImage(`data:image/jpeg;base64,${newImageBase64}`);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [modelImageBase64, poseImageBase64, prompt]);

  const extractBase64Data = (dataUrl: string) => {
    const parts = dataUrl.split(',');
    if (parts.length !== 2) {
      throw new Error('Invalid base64 string');
    }
    const mimeType = parts[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
    const base64 = parts[1];
    return { base64, mimeType };
  };
  
  const isGenerateDisabled = !modelImage || !poseImage || isLoading;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls Column */}
          <div className="flex flex-col gap-6">
            <ImageUploader 
              title="1. Upload Model Image"
              onImageUpload={handleModelImageUpload} 
              previewUrl={modelImage ? URL.createObjectURL(modelImage) : null}
            />
            <ImageUploader 
              title="2. Upload Pose Reference"
              onImageUpload={handlePoseImageUpload} 
              previewUrl={poseImage ? URL.createObjectURL(poseImage) : null}
            />
            <PromptControls
              prompt={prompt}
              onPromptChange={(e) => setPrompt(e.target.value)}
              onGenerate={handleGenerate}
              isDisabled={isGenerateDisabled}
            />
            {error && <ErrorMessage message={error} />}
          </div>

          {/* Output Column */}
          <div className="relative w-full h-full min-h-[50vh] lg:min-h-0">
             {isLoading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 rounded-lg">
                <Loader />
              </div>
            )}
            <ImageDisplay 
              title="Generated Image" 
              imageUrl={generatedImage} 
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
