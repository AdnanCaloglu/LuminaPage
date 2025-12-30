import { GoogleGenAI, Modality } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found via process.env.API_KEY");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateBookIntro = async (title: string, author: string): Promise<string> => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are the author of the book "${title}" by ${author}. 
      Write a short, engaging, 1st-person introduction script (max 80 words) welcoming a reader who just scanned the physical book. 
      Mention the key emotional theme. Do not use asterisks or formatting.`,
    });
    return response.text || "Welcome to the world of this book.";
  } catch (error) {
    console.error("Gemini Text Error:", error);
    return `Welcome to ${title}. We hope you enjoy this journey.`;
  }
};

export const generateSpeech = async (text: string): Promise<ArrayBuffer | null> => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // Deep, storytelling voice
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) return null;

    // Decode base64 to ArrayBuffer
    const binaryString = atob(base64Audio);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  } catch (error) {
    console.error("Gemini TTS Error:", error);
    return null;
  }
};

export const analyzeSecurityThreat = async (scanData: any): Promise<string> => {
    // Simulating a security analysis feature using Gemini
    try {
        const ai = getClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Analyze this scan pattern for fraud: ${JSON.stringify(scanData)}. Return a one sentence risk assessment.`
        });
        return response.text || "Low risk detected.";
    } catch (e) {
        return "Analysis unavailable.";
    }
}
