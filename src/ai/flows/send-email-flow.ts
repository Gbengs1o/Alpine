'use server';
/**
 * @fileOverview A flow for sending emails using Resend.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Resend } from 'resend';

const SendEmailInputSchema = z.object({
  from: z.string().describe('The email address of the sender.'),
  to: z.array(z.string()).describe('A list of email addresses for the recipients.'),
  subject: z.string().describe('The subject line of the email.'),
  html: z.string().describe('The HTML content of the email.'),
});
export type SendEmailInput = z.infer<typeof SendEmailInputSchema>;

const SendEmailOutputSchema = z.object({
  id: z.string().optional().describe('The ID of the sent email.'),
  error: z.string().optional().describe('Any error that occurred while sending the email.'),
});
export type SendEmailOutput = z.infer<typeof SendEmailOutputSchema>;

export async function sendEmail(
  input: SendEmailInput
): Promise<SendEmailOutput> {
  return sendEmailFlow(input);
}

const sendEmailFlow = ai.defineFlow(
  {
    name: 'sendEmailFlow',
    inputSchema: SendEmailInputSchema,
    outputSchema: SendEmailOutputSchema,
  },
  async (input) => {
    // This is where you would initialize your email client.
    // For this example, we'll use the Resend SDK.
    // Ensure your RESEND_API_KEY is set in your environment variables.
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    try {
      const { data, error } = await resend.emails.send(input);

      if (error) {
        console.error({ error });
        return { error: error.message };
      }

      console.log({ data });
      return { id: data?.id };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error(message);
      return { error: message };
    }
  }
);
