import React, { useState } from 'react';
import type { GeneratedImage } from '../types';

interface RemixModalProps {
  isOpen: boolean;
  panel: { index: number; image: GeneratedImage };
  isRemixing: boolean;
  error: string | null;
  onClose: () => void;
  onConfirm: (prompt: string) => void;
}

export const RemixModal: React.FC<RemixModalProps> = ({ isOpen, panel, isRemixing, error, onClose, onConfirm }) => {
  const [prompt, setPrompt] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleConfirmClick = () => {
    if (prompt.trim()) {
      onConfirm(prompt);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-slate-600 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-teal-300">Remix Panel {panel.index + 1}</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
        </div>
        
        <div className="p-6 flex-grow overflow-y-auto space-y-4">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-900">
                <img 
                    src={`data:${panel.image.mimeType};base64,${panel.image.data}`} 
                    alt={`Panel ${panel.index + 1} preview`}
                    className="w-full h-full object-contain"
                />
            </div>
            
            <div>
                <label htmlFor="remix-prompt" className="block text-lg font-medium mb-2">
                    Describe your changes:
                </label>
                <textarea
                    id="remix-prompt"
                    rows={2}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-shadow"
                    placeholder="e.g., Add a futuristic city in the background"
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                />
            </div>

            {error && <p className="text-red-400 text-center">{error}</p>}
        </div>

        <div className="p-4 border-t border-slate-700 flex justify-end gap-4">
            <button
                onClick={onClose}
                className="px-6 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors"
            >
                Cancel
            </button>
            <button
                onClick={handleConfirmClick}
                disabled={isRemixing || !prompt.trim()}
                className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isRemixing ? 'Remixing...' : 'Generate Remix'}
            </button>
        </div>
      </div>
    </div>
  );
};
