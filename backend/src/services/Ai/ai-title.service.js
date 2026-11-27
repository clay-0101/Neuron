import { ChatGroq } from "@langchain/groq"
import { config } from "../../config/env.js"
import * as z from "zod"
import { SystemMessage , HumanMessage} from "langchain"

const model = new ChatGroq({
    model : "qwen/qwen3.8-27b",
    apiKey : config.groqApiKey
})

const structureModel = model.withStructuredOutput(z.object({
    title : z.string().min(1).max(60).describe("The title of the conversation on the basis of the user's message")
}))

export async function generateTitle(message) {
    
    let systemMessage = new SystemMessage(
        `
        You are an Ai assistant that generates a concise and relevant title for a conversation based on the user's message.

        #Follow these guidelines:
        - The title should be concise and relevent to the user's message.
        - The title should be no longer than 60 characters.
        - Avoid using generic titles like "chat" or "conversation".
        - Focus on the main topic or intent of the user's message.
        `
    )

    let humanMessage = new HumanMessage(message)

    let response = await structureModel.invoke([systemMessage, humanMessage])

    return response
}