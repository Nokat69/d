import { GoogleGenAI } from "@google/genai";

export async function generatePerfumeImage() {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: 'A professional, high-end product photograph of a luxury perfume bottle. The bottle is elegant, clear glass with a dark emerald green cap. It is surrounded by fresh, delicate white jasmine flowers and deep green leaves. The lighting is bright, natural, and airy, as if in a sunlit garden or a high-end boutique. The background is a soft, blurred off-white or cream texture. The overall aesthetic is clean, floral, and sophisticated. 8k resolution, cinematic lighting.',
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      },
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
}
