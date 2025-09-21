import React from 'react';
import { WandIcon } from './icons';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!isLoading) {
        onSubmit();
      }
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-1.5 shadow-lg border border-gray-700/50 backdrop-blur-sm">
        <div className="relative">
            <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="A vibrant oil painting of a robot DJing at a futuristic neon-lit party..."
            className="w-full h-28 bg-transparent text-gray-200 placeholder-gray-500 p-4 pr-40 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none transition-shadow"
            disabled={isLoading}
            />
            <button
            onClick={onSubmit}
            disabled={isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
            >
            <WandIcon />
            {isLoading ? 'Generating...' : 'Generate'}
            </button>
        </div>
    </div>
  );
};
