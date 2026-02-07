import { GoogleGenAI, Type } from "@google/genai";
import { MovieDetails } from "../types";

const parseGeminiResponse = (text: string): MovieDetails | null => {
  try {
    // Attempt to clean markdown code blocks if present
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return null;
  }
};

export const fetchMovieDetails = async (movieName: string): Promise<MovieDetails> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are a movie database expert fluent in Persian (Farsi).
    Provide detailed information about the movie "${movieName}".
    If the movie is not found, provide details for "Interstellar" instead but pretend it was the requested one or closest match.
    
    Return ONLY valid JSON with this exact schema:
    {
      "title": "Movie Title in Persian",
      "originalTitle": "Original Movie Title (English)",
      "year": "Release Year (Persian numbers if possible, e.g. ۲۰۲۴)",
      "runtime": "Runtime in Persian (e.g. ۲ ساعت و ۱۰ دقیقه)",
      "director": "Director Name in Persian",
      "rating": "IMDb Rating (e.g. ۸.۵/۱۰)",
      "genres": ["Genre1 in Persian", "Genre2 in Persian"],
      "plot": "A compelling plot summary in Persian (2-3 sentences).",
      "cast": [
        {"name": "Actor Name in Persian", "role": "Role Name in Persian"}
      ],
      "boxOffice": "Box office info in Persian or null",
      "awards": "Major awards in Persian or null"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            originalTitle: { type: Type.STRING },
            year: { type: Type.STRING },
            runtime: { type: Type.STRING },
            director: { type: Type.STRING },
            rating: { type: Type.STRING },
            genres: { type: Type.ARRAY, items: { type: Type.STRING } },
            plot: { type: Type.STRING },
            cast: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  role: { type: Type.STRING }
                }
              }
            },
            boxOffice: { type: Type.STRING },
            awards: { type: Type.STRING }
          }
        }
      }
    });

    const data = parseGeminiResponse(response.text || "{}");
    if (!data) throw new Error("Invalid data format");
    
    // Add a random ID for the poster image stability
    data.posterId = Math.floor(Math.random() * 1000);
    
    return data;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};