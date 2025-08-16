'use server';
/**
 * @fileOverview A conversational AI flow for the site-wide chat widget.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

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

// Export an async wrapper function that calls the flow
export async function continueConversation(
  input: ChatInput,
): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { text } = await ai.generate({
      model: 'googleai/gemini-2.0-flash',
      prompt: input.history.map((msg) => ({
        role: msg.role,
        content: [{ text: msg.content }],
      })),
      system: `You are a friendly and helpful AI assistant for Alpine Comfort Solutions, an HVAC company. Your goal is to answer user questions about the company, its services (sourcing, installation, maintenance), and general HVAC topics. Be concise and helpful.`,
    });

    return text;
  },
);
