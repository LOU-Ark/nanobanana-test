import React from 'react';
import { Spinner } from './Spinner';
import { DownloadIcon, XIcon, AlertIcon } from './icons';

interface ImageDisplayProps {
  image: string | null;
  isLoading: boolean;
  error: string | null;
  prompt: string;
}

const ActionButton: React.FC<{
  onClick?: () => void;
  href?: string;
  download?: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ onClick, href, download, children, className }) => {
  const commonClasses = `flex items-center justify-center gap-2 px-5 py-2.5 font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        download={download}
        className={commonClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={commonClasses}>
      {children}
    </button>
  );
};

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ image, isLoading, error, prompt }) => {
  const shareText = `Check out this image I created with the AI Image Studio! ✨\n\nPrompt: "${prompt}"\n\n#AIArt #Gemini`;
  const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  const getSanitizedFilename = () => {
    return prompt.slice(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase() + '_ai_art.png';
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <Spinner />
          <p className="mt-4 text-lg text-gray-400">Generating your masterpiece...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-red-400 p-4">
          <AlertIcon />
          <p className="mt-4 text-lg font-semibold">Generation Failed</p>
          <p className="text-center text-red-500">{error}</p>
        </div>
      );
    }
    if (image) {
      return (
        <div className="p-4 sm:p-6 space-y-6">
          <div className="aspect-square w-full max-w-lg mx-auto bg-black rounded-xl overflow-hidden shadow-2xl shadow-yellow-500/10 border-2 border-yellow-500/30">
            <img src={image} alt={prompt} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ActionButton
              href={image}
              download={getSanitizedFilename()}
              className="w-full sm:w-auto bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500"
            >
              <DownloadIcon />
              Download
            </ActionButton>
            <ActionButton
              href={twitterIntentUrl}
              className="w-full sm:w-auto bg-sky-500 text-white hover:bg-sky-400 focus:ring-sky-400"
            >
              <XIcon />
              Share on X
            </ActionButton>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <p className="text-xl">Your generated image will appear here.</p>
        <p>Let your creativity flow!</p>
      </div>
    );
  };

  return (
    <div className="mt-8 w-full min-h-[400px] sm:min-h-[500px] bg-gray-800/50 rounded-xl border border-dashed border-gray-700/50 flex items-center justify-center">
      {renderContent()}
    </div>
  );
};
