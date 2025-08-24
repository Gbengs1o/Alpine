'use server';
/**
 * @fileOverview A conversational AI flow for the site-wide chat widget.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';

// STEP 1: Define the schemas. These must exist before they are used.
// -------------------------------------------------------------------

// Define the structure for a single chat message
const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

// Define the input for the chat flow, which is a history of messages
const ChatInputSchema = z.object({
  history: z.array(ChatMessageSchema),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

// The output is simply the string response from the model
const ChatOutputSchema = z.string();
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

// -------------------------------------------------------------------


// Export an async wrapper function that calls the flow
export async function continueConversation(
  input: ChatInput,
): Promise<ChatOutput> {
  return chatFlow(input);
}

// STEP 2: Define the flow, which uses the schemas from Step 1.
// -------------------------------------------------------------------

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,     // Now this variable is defined
    outputSchema: ChatOutputSchema,   // And this one too
  },
  async (input) => {
    // Construct the full path to the prompt file
    const promptFilePath = path.join(process.cwd(), 'src', 'system-prompt.txt');

    // Read the file contents asynchronously
    const systemPrompt = await fs.readFile(promptFilePath, 'utf-8');
    
    const { text } = await ai.generate({
      model: 'googleai/gemini-2.0-flash',
      messages: input.history.map((msg) => ({
        role: msg.role,
        content: [{ text: msg.content }],
      })),
      // Use the variable holding the file content as your system prompt
      system: systemPrompt, 
    });

    return text;
  },
);