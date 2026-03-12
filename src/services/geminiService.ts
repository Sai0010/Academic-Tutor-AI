import { GoogleGenAI, Type } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export interface TutorResponse {
  concept_explanation: string;
  step_by_step_solution: string[];
  key_concepts: string[];
  practice_question: string;
}

export async function getTutorExplanation(userInput: string): Promise<TutorResponse> {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  
  const systemInstruction = `
ROLE:
You are an expert academic tutor helping university students understand technical and theoretical concepts clearly.

INPUT:
The student will give an assignment question or concept they want explained.

CONTEXT:
Your job is to break down the concept so the student understands it quickly and can also apply it in coding or exams.

CONSTRAINTS:
- Use simple language
- Provide structured explanation
- Avoid unnecessary long paragraphs
- Output must always be in JSON format
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `USER QUESTION: ${userInput}`,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          concept_explanation: { type: Type.STRING },
          step_by_step_solution: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          key_concepts: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          practice_question: { type: Type.STRING }
        },
        required: ["concept_explanation", "step_by_step_solution", "key_concepts", "practice_question"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("Empty response from AI");
  }

  try {
    return JSON.parse(text) as TutorResponse;
  } catch (e) {
    console.error("Failed to parse AI response:", text);
    throw new Error("Failed to parse tutor response");
  }
}
