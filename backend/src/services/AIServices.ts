import {ChatOpenAI} from "@langchain/openai"
import "dotenv/config"
import { HumanMessage, SystemMessage } from "langchain"
import { SYSTEM_PROMPTS } from "../prompts/systemPrompts.js"

const model = new ChatOpenAI({
    model:process.env.AI_MODEL,
    configuration:{baseURL: process.env.AI_ENDPOINT},
    apiKey: process.env.AI_API_KEY
})

const DIFFICULTY_INSTRUCTIONS: Record<string, string> = {
  beginner: `
DIFFICULTY LEVEL: BEGINNER (A1-A2 English Proficiency).
Constraints to follow strictly for this level:
- Use very simple, everyday conversational vocabulary.
- Keep sentences extremely short (under 8-10 words).
- Use basic grammar structures and easy-to-pronounce words.
- Focus on clear, simple ideas with a slow, relaxed speaking pace.
- Strictly avoid complex, obscure, or multi-syllable professional terms.
`,
  intermediate: `
DIFFICULTY LEVEL: INTERMEDIATE (B1-B2 English Proficiency).
Constraints to follow strictly for this level:
- Use moderate, natural vocabulary and transitions.
- Sentences can be medium length (under 12-15 words).
- Provide richer descriptions and balanced grammar.
- Use a natural, conversational speaking pace suitable for interview and presentation prep.
`,
  advanced: `
DIFFICULTY LEVEL: ADVANCED (C1-C2 English Proficiency).
Constraints to follow strictly for this level:
- Use advanced, rich vocabulary and sophisticated transitions.
- Sentences can have longer structures and rhetorical style.
- Maintain a highly professional, persuasive public-speaking tone (e.g., TED-style talk).
- Integrate natural idioms, storytelling devices, and complex concepts appropriate for leaders and conference presenters.
`
};

export const  GnerateScriptService = async (topic:string, difficulty?: string)=>{
    try {
        const diffKey = (difficulty || 'beginner').toLowerCase();
        const diffInstruction = DIFFICULTY_INSTRUCTIONS[diffKey] || DIFFICULTY_INSTRUCTIONS.beginner;

        const message = [
            new SystemMessage(SYSTEM_PROMPTS + "\n" + diffInstruction),
            new HumanMessage(topic)
        ]

        const response = await model.invoke(message)
        return response;
    } catch (error) {
      console.error("AI service generation error:", error);
      throw error;
    }
}