
import React from 'react';
import type { Panel } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';

interface PanelCreatorProps {
  panels: Panel[];
  onAddPanel: () => void;
  onUpdatePanelDescription: (id: number, description: string) => void;
  onRemovePanel: (id: number) => void;
}

export const PanelCreator: React.FC<PanelCreatorProps> = ({
  panels,
  onAddPanel,
  onUpdatePanelDescription,
  onRemovePanel
}) => {
  return (
    <div className="space-y-6 bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-teal-300">3. Create Your Panels</h2>
        <div className="space-y-4">
          {panels.map((panel, index) => (
            <div key={panel.id} className="flex items-start gap-4 p-4 bg-slate-900/70 rounded-lg">
              <span className="text-lg font-bold text-slate-400 mt-2">{index + 1}</span>
              <textarea
                rows={3}
                className="flex-grow bg-slate-800 border border-slate-600 rounded-lg p-2 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-shadow resize-y"
                placeholder={`Describe what happens in panel ${index + 1}...`}
                value={panel.description}
                onChange={(e) => onUpdatePanelDescription(panel.id, e.target.value)}
              />
              <button
                onClick={() => onRemovePanel(panel.id)}
                className="p-2 text-slate-400 hover:text-red-400 bg-slate-800 hover:bg-red-900/50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Remove panel"
                disabled={panels.length <= 1}
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={onAddPanel}
          className="mt-4 flex items-center justify-center gap-2 w-full py-2 px-4 border-2 border-dashed border-slate-600 hover:border-teal-400 text-slate-400 hover:text-teal-300 rounded-lg transition-colors"
        >
          <PlusIcon />
          Add Another Panel
        </button>
      </div>
    </div>
  );
};
