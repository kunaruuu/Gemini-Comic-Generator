import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { StoryInput } from './components/StoryInput';
import { PanelCreator } from './components/PanelCreator';
import { ComicDisplay } from './components/ComicDisplay';
import { Loader } from './components/Loader';
import { Button } from './components/Button';
import { RemixModal } from './components/RemixModal';
import { generateComicPanels, remixComicPanel } from './services/geminiService';
import type { Panel, GeneratedImage } from './types';

interface EditingPanel {
  index: number;
  image: GeneratedImage;
}

const App: React.FC = () => {
  const [characterDesc, setCharacterDesc] = useState<string>('');
  const [comicStyle, setComicStyle] = useState<string>('');
  const [panels, setPanels] = useState<Panel[]>([{ id: 1, description: '' }]);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRemixing, setIsRemixing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingPanel, setEditingPanel] = useState<EditingPanel | null>(null);

  const addPanel = useCallback(() => {
    setPanels(prev => [...prev, { id: Date.now(), description: '' }]);
  }, []);

  const updatePanelDescription = useCallback((id: number, description: string) => {
    setPanels(prev => prev.map(p => (p.id === id ? { ...p, description } : p)));
  }, []);

  const removePanel = useCallback((id: number) => {
    setPanels(prev => prev.filter(p => p.id !== id));
  }, []);
  
  const handleGenerateComic = async () => {
    if (!characterDesc.trim() || !comicStyle.trim() || panels.some(p => !p.description.trim())) {
      setError('Please fill in all fields: character, style, and every panel description.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const images = await generateComicPanels(characterDesc, comicStyle, panels);
      setGeneratedImages(images);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred during comic generation.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartRemix = (index: number, image: GeneratedImage) => {
    setEditingPanel({ index, image });
  };

  const handleConfirmRemix = async (remixPrompt: string) => {
    if (!editingPanel || !remixPrompt.trim()) return;

    setIsRemixing(true);
    setError(null);
    
    try {
      const newImage = await remixComicPanel(editingPanel.image, remixPrompt);
      setGeneratedImages(prevImages => 
        prevImages.map((img, idx) => (idx === editingPanel.index ? newImage : img))
      );
      setEditingPanel(null); // Close modal on success
    } catch (e) {
      console.error(e);
      // Keep modal open to show error
      setError(e instanceof Error ? e.message : 'An unknown error occurred during remixing.');
    } finally {
      setIsRemixing(false);
    }
  };

  const handleCloseRemixModal = () => {
    setEditingPanel(null);
    setError(null); // Clear error when closing modal
  };

  const isGenerateDisabled = isLoading || !characterDesc.trim() || !comicStyle.trim() || panels.length === 0 || panels.some(p => !p.description.trim());

  return (
    <>
      <div className="min-h-screen bg-slate-900 text-gray-200 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <Header />
          <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col gap-8">
              <StoryInput
                characterDesc={characterDesc}
                onCharacterDescChange={setCharacterDesc}
                comicStyle={comicStyle}
                onComicStyleChange={setComicStyle}
              />
              <PanelCreator
                panels={panels}
                onAddPanel={addPanel}
                onUpdatePanelDescription={updatePanelDescription}
                onRemovePanel={removePanel}
              />
              <div className="mt-4">
                <Button onClick={handleGenerateComic} disabled={isGenerateDisabled}>
                  {isLoading ? 'Generating Your Masterpiece...' : 'Generate Comic'}
                </Button>
                {error && !editingPanel && <p className="text-red-400 mt-4 text-center">{error}</p>}
              </div>
            </div>
            
            <div className="lg:row-start-1 lg:col-start-2">
              <div className="sticky top-8 bg-slate-800/50 rounded-2xl p-6 border border-slate-700 min-h-[300px] lg:min-h-[calc(100vh-4rem)] flex items-center justify-center">
                {isLoading ? (
                  <Loader />
                ) : generatedImages.length > 0 ? (
                  <ComicDisplay images={generatedImages} onRemixPanel={handleStartRemix} />
                ) : (
                  <div className="text-center text-slate-400">
                    <p className="text-2xl font-medium">Your comic will appear here!</p>
                    <p className="mt-2">Fill out the details on the left and hit "Generate".</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
      {editingPanel && (
        <RemixModal
          isOpen={!!editingPanel}
          panel={editingPanel}
          isRemixing={isRemixing}
          error={error}
          onClose={handleCloseRemixModal}
          onConfirm={handleConfirmRemix}
        />
      )}
    </>
  );
};

export default App;
