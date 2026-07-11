import {ChatOpenAI} from "@langchain/openai"
import "dotenv/config"

const model = new ChatOpenAI({
    model:process.env.AI_MODEL,
    configuration:{baseURL: process.env.AI_ENDPOINT},
    apiKey: process.env.AI_API_KEY
})