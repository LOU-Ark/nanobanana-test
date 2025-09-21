import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available, otherwise throw an error.
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates an image based on a text prompt using the Imagen model.
 * @param prompt The text prompt to generate an image from.
 * @returns A promise that resolves to a base64 data URL of the generated image.
 */
export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    } else {
      throw new Error("Image generation failed: No images were returned.");
    }
  } catch (error) {
    console.error("Error generating image with Gemini API:", error);
    throw new Error("Failed to generate image. Please check your prompt or API key.");
  }
};
