import {ChatOpenAI} from "@langchain/openai"
import "dotenv/config"
import { HumanMessage, SystemMessage } from "langchain"
import { SYSTEM_PROMPTS } from "../prompts/systemPrompts.js"
import { DIFFICULTY_INSTRUCTIONS } from "../prompts/difficultyInstruction.js"

const model = new ChatOpenAI({
    model:process.env.AI_MODEL,
    configuration:{baseURL: process.env.AI_ENDPOINT},
    apiKey: process.env.AI_API_KEY
})



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