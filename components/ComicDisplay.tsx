import React from 'react';
import type { GeneratedImage } from '../types';
import { MagicWandIcon } from './icons/MagicWandIcon';

interface ComicDisplayProps {
  images: GeneratedImage[];
  onRemixPanel: (index: number, image: GeneratedImage) => void;
}

export const ComicDisplay: React.FC<ComicDisplayProps> = ({ images, onRemixPanel }) => {
  return (
    <div className="w-full h-full overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1">
        {images.map((image, index) => (
            <div key={index} className="group relative aspect-[4/3] bg-slate-900 rounded-lg shadow-lg overflow-hidden border-2 border-slate-600">
            <img
                src={`data:${image.mimeType};base64,${image.data}`}
                alt={`Comic panel ${index + 1}`}
                className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-slate-900/80 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center border-2 border-white/50 z-10">
                {index + 1}
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                    onClick={() => onRemixPanel(index, image)}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-full transition-transform transform hover:scale-105"
                    aria-label={`Remix panel ${index + 1}`}
                >
                    <MagicWandIcon />
                    Remix
                </button>
            </div>
            </div>
        ))}
        </div>
    </div>
  );
};
