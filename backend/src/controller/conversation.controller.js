import { createConversation, findConversationById } from "../DAO/conversation.dao.js"
import { generateTitle } from "../services/Ai/ai-title.service.js"
import { AppError } from "../utils/AppError.js"
import { createMessage, findMessagesByConversationId } from "../DAO/message.dao.js"
import { AIMessage, HumanMessage } from "langchain"
import model from "../services/Ai/main.service.js"

export async function handleMessage(req , res , next) {
    
    const {content , conversation : conversationId} = req.body

    const user = req.user

    let conversation = null

    if(!conversationId){

        let {title} = await generateTitle(content)
        
        conversation = await createConversation({user: user.id , title})

    }else{
        conversation = await findConversationById(conversationId , user.id)

        if(!conversation){
            return next(new AppError(404, "Conversation not found"))
        }
    }

   

    const messages = (await findMessagesByConversationId(conversation.id))
    .map((msg) => {
        if(msg.role === "user"){
            return new HumanMessage(msg.content)

        }else if(msg.role === "assistant"){
            return new AIMessage(msg.content)
        }

        return null
    }).filter(Boolean)


    messages.push(new HumanMessage(content))

    await createMessage({
        role : "user",
        content : content ,
        conversation : conversation.id
    })

    let stream = await model.stream(messages)

    res.setHeader('Content-Type' , 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');


    res.write(`data: ${JSON.stringify({
        conversationId : conversation.id,
        title  : conversation.title
    })}\n\n`)

    let aiChunk = null
    for await (const chunk of stream){
       
        if(aiChunk === null) {
            aiChunk = chunk
        }else{
            aiChunk = aiChunk.concat(chunk)
        }

        res.write(`data: ${JSON.stringify({chunk : chunk.content})}\n\n`)
    }

    res.end();

        await createMessage({
        role : "assistant",
        content : aiChunk.content ,
        conversation : conversation.id
    })
}