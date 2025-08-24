"use server";

import { Resend } from 'resend';
import { z } from 'zod';

// THIS IS THE CRITICAL LINE:
// It securely loads the API key from your .env.local file.
// If process.env.RESEND_API_KEY is missing, Resend will throw an error.
const resend = new Resend(process.env.RESEND_API_KEY);

const EmailSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function sendEmail(formData: { name: string, email: string, message: string }) {
  const validatedFields = EmailSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid fields provided.",
    };
  }
  
  const { name, email, message } = validatedFields.data;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Website Contact Form <onboarding@resend.dev>',
      to: ['alpinetechhvac@gmail.com'], // Your destination email
      subject: `New Message from ${name} (from your website)`,
      reply_to: email,
      html: `
        <p>You have received a new message from your website contact form.</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p> 
      `,
    });

    if (error) {
      // Log the detailed error from Resend to the server console
      console.error("Resend API Error:", error);
      return { success: false, error: "Failed to send email." };
    }

    console.log("Email sent successfully:", data);
    return { success: true, data };

  } catch (exception) {
    // This catches errors like a missing API key
    console.error("Server Exception:", exception);
    return {
      success: false,
      error: "An unexpected error occurred. Please check server logs.",
    };
  }
}