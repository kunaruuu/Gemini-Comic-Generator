
import React from 'react';

interface StoryInputProps {
  characterDesc: string;
  onCharacterDescChange: (value: string) => void;
  comicStyle: string;
  onComicStyleChange: (value: string) => void;
}

const stylePresets = ["American Superhero", "Japanese Manga", "Vintage Newspaper Strip", "Indie Comic", "Dark Noir", "Cartoonish"];

export const StoryInput: React.FC<StoryInputProps> = ({
  characterDesc,
  onCharacterDescChange,
  comicStyle,
  onComicStyleChange
}) => {
  return (
    <div className="space-y-6 bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
      <div>
        <label htmlFor="character-desc" className="block text-xl font-semibold mb-2 text-teal-300">
          1. Describe Your Character
        </label>
        <textarea
          id="character-desc"
          rows={3}
          className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-shadow"
          placeholder="e.g., A grizzled space detective with a cybernetic eye and a trench coat that has seen better days."
          value={characterDesc}
          onChange={(e) => onCharacterDescChange(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="comic-style" className="block text-xl font-semibold mb-2 text-teal-300">
          2. Define The Comic Style
        </label>
        <input
          id="comic-style"
          type="text"
          className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-shadow"
          placeholder="e.g., Gritty black-and-white noir with sharp shadows."
          value={comicStyle}
          onChange={(e) => onComicStyleChange(e.target.value)}
        />
        <div className="flex flex-wrap gap-2 mt-3">
            {stylePresets.map(preset => (
                <button
                    key={preset}
                    type="button"
                    onClick={() => onComicStyleChange(preset)}
                    className="px-3 py-1 text-sm bg-slate-700 hover:bg-teal-600 rounded-full transition-colors"
                >
                    {preset}
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};
