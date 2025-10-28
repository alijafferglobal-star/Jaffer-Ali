
import { GoogleGenAI, Modality } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface ImageData {
  base64: string;
  mimeType: string;
}

export async function generateImageWithPose(
  modelImage: ImageData,
  poseImage: ImageData,
  prompt: string
): Promise<string> {
  if (!prompt.trim()) {
    prompt = "A neutral, studio background."
  }

  const generationPrompt = `Recreate the person from the first image with the exact pose from the second image. The background, environment, and clothing should be: ${prompt}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: modelImage.base64,
              mimeType: modelImage.mimeType,
            },
          },
          {
            inlineData: {
              data: poseImage.base64,
              mimeType: poseImage.mimeType,
            },
          },
          {
            text: generationPrompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }

    throw new Error("No image was generated. The model might have refused the prompt. Try a different prompt or images.");
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the API.");
  }
}
