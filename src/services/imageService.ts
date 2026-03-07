import { GoogleGenAI } from "@google/genai";

export async function generatePerfumeImage() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-image-preview',
    contents: {
      parts: [
        {
          text: 'A hyper-realistic professional product shot of a luxury perfume bottle. The bottle is square with thick, high-quality clear glass, containing a rich, glowing amber-colored perfume liquid. The cap is a large, sophisticated black octagonal shape with a polished rose-gold or bronze metallic neck. On the front of the bottle, there is a prominent circular dark green logo with a white serif "S" in the center, and the words "SOBEL PERFUME" in elegant white lettering below it. The bottle sits on a premium dark leather surface. The background is dark, moody, and atmospheric with subtle warm lighting and a hint of mist. Cinematic lighting, 8k resolution, ultra-detailed.',
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
        imageSize: "1K"
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
