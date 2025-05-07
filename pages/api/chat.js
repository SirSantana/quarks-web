// pages/api/chat.js

import { streamText } from 'ai'
import { google } from '@ai-sdk/google'

export default async function (req) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.body;

  // Get a language model
  const model = google('gemini-2.0-flash-001')

  // Call the language model with the prompt
  const result = streamText({
    model,
    messages,
    maxTokens: 8192,
    temperature: 0.7,
    topP: 0.4,
  })
  console.log(result);
  
  // Respond with a streaming response
  return result.toAIStreamResponse()
}
