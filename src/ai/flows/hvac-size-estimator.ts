'use server';

/**
 * @fileOverview An HVAC size estimator AI agent.
 *
 * - estimateHvacSize - A function that handles the HVAC size estimation process.
 * - HvacSizeEstimatorInput - The input type for the estimateHvacSize function.
 * - HvacSizeEstimatorOutput - The return type for the estimateHvacSize function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HvacSizeEstimatorInputSchema = z.object({
  squareFootage: z
    .number()
    .describe('The square footage of the home.'),
  insulationQuality: z
    .enum(['poor', 'average', 'good', 'excellent'])
    .describe('The quality of insulation in the home.'),
  geographicLocation: z
    .string()
    .describe('The geographic location of the home.'),
});
export type HvacSizeEstimatorInput = z.infer<typeof HvacSizeEstimatorInputSchema>;

const HvacSizeEstimatorOutputSchema = z.object({
  recommendedSizeTons: z
    .number()
    .describe('The recommended HVAC system size in tons.'),
  recommendedSizeBTUs: z
    .number()
    .describe('The recommended HVAC system size in BTUs.'),
  considerations: z
    .string()
    .describe('Other considerations for HVAC system size.'),
});
export type HvacSizeEstimatorOutput = z.infer<typeof HvacSizeEstimatorOutputSchema>;

export async function estimateHvacSize(
  input: HvacSizeEstimatorInput
): Promise<HvacSizeEstimatorOutput> {
  return hvacSizeEstimatorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'hvacSizeEstimatorPrompt',
  input: {schema: HvacSizeEstimatorInputSchema},
  output: {schema: HvacSizeEstimatorOutputSchema},
  prompt: `You are an expert HVAC technician specializing in sizing HVAC systems for homes.

You will use the following information about the home to estimate the appropriate HVAC system size.

Square footage: {{{squareFootage}}}
Insulation quality: {{{insulationQuality}}}
Geographic location: {{{geographicLocation}}}

Based on this information, provide the recommended HVAC system size in tons and BTUs. Also, include any other considerations for HVAC system size.

Make sure the 'recommendedSizeTons' and 'recommendedSizeBTUs' are numbers, and the 'considerations' field is a string.
`,
});

const hvacSizeEstimatorFlow = ai.defineFlow(
  {
    name: 'hvacSizeEstimatorFlow',
    inputSchema: HvacSizeEstimatorInputSchema,
    outputSchema: HvacSizeEstimatorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
