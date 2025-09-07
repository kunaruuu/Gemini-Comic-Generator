import { GoogleGenAI, Modality } from "@google/genai";
import type { Panel, GeneratedImage } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generateContentWithImage = async (prompt: string, image?: GeneratedImage) => {
  const parts: ({ text: string } | { inlineData: { data: string; mimeType: string } })[] = [{ text: prompt }];
  
  if (image) {
    parts.unshift({ // Add image first for context
      inlineData: {
        data: image.data,
        mimeType: image.mimeType,
      },
    });
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image-preview',
    contents: { parts },
    config: {
      responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  if (response.candidates && response.candidates.length > 0) {
    const candidate = response.candidates[0];
    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        return {
          data: part.inlineData.data,
          mimeType: part.inlineData.mimeType,
        };
      }
    }
  }
  throw new Error('Image generation failed. No image data found in response.');
};


export const generateComicPanels = async (
  characterDesc: string,
  comicStyle: string,
  panels: Panel[]
): Promise<GeneratedImage[]> => {
  const generationPromises = panels.map(panel => {
    const prompt = `
      Generate a single comic book panel, focusing only on the visual art.
      **Style:** ${comicStyle}.
      **Main Character Description:** ${characterDesc}.
      **Panel Scene Description:** ${panel.description}.
      
      **Crucial Instructions:**
      1.  **Art Only:** The output must be a clean image of the scene. Do NOT include any text, speech bubbles, captions, sound effects, or panel borders in the image itself.
      2.  **Character Consistency:** Maintain a consistent appearance for the main character(s) based on their description.
      3.  **Single Panel Focus:** Create only the scene described for this specific panel.
    `;
    return generateContentWithImage(prompt);
  });

  return Promise.all(generationPromises);
};

export const remixComicPanel = async (
  originalImage: GeneratedImage,
  remixPrompt: string
): Promise<GeneratedImage> => {
  const prompt = `
    Edit the provided image based on the following instruction.
    **Instruction:** ${remixPrompt}.
    
    **Crucial Instructions:**
    1.  **Apply Edit:** Modify the image according to the instruction.
    2.  **Maintain Style:** Preserve the original art style as much as possible unless the instruction is to change it.
    3.  **Output Image Only:** The output must be only the modified image.
  `;
  return generateContentWithImage(prompt, originalImage);
};
