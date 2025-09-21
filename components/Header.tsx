import React from 'react';
import { BananaIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-3 mb-2">
        <BananaIcon />
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
          AI Image Studio
        </h1>
      </div>
      <p className="text-lg text-gray-400">
        Turn your ideas into images with Gemini & share on X
      </p>
    </header>
  );
};
