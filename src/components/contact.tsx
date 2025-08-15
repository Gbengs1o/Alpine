"use client";

// --- IMPORTS ---
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { sendEmail } from '@/ai/flows/send-email-flow';

// --- FORM SCHEMA ---
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type FormValues = z.infer<typeof formSchema>;

// --- COMPONENT ---
export function Contact() {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  // --- SUBMIT HANDLER ---
  async function onSubmit(values: FormValues) {
    try {
      const response = await sendEmail({
        from: 'Website Contact Form <onboarding@resend.dev>',
        to: ['alpinetechhvac@gmail.com'],
        subject: `New Message from ${values.name} (from site)`,
        html: `
          <p>You have received a new message from your website contact form.</p>
          <p><strong>Name:</strong> ${values.name}</p>
          <p><strong>Email:</strong> ${values.email}</p>
          <p><strong>Message:</strong></p>
          <p>${values.message}</p>
        `,
      });
      console.log(response);
      toast({
          title: "Message Sent!",
          description: "Thank you for your inquiry. An expert will be in touch with you shortly.",
      });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive",
      });
    }
  }

  // --- JSX ---
  return (
    <section 
      id="contact" 
      className="w-full py-24 lg:py-32 bg-gray-50 text-gray-800"
    >
      <main className="container mx-auto px-4 md:px-6 max-w-7xl flex flex-col items-center">
        {/* Consistent "Breadcrumb" Link */}
        <a href="#contact" className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-gray-900 mb-6">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          GET IN TOUCH
        </a>
        
        {/* Impactful Title & Subtitle */}
        <h1 className="text-4xl md:text-5xl font-bold text-center leading-tight mb-6">
          Ready to Start Your Project?
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-3xl mb-16">
          Whether you have a question, need a quote, or are ready to discuss your project, 
          we’re here to provide clear, honest answers and expert guidance.
        </p>

        <div className="grid lg:grid-cols-5 gap-12 w-full">
          {/* Info Section (Left Side) */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to You</h2>
              <p className="text-gray-600 leading-relaxed">
                We believe in building lasting relationships based on the principles of reliability, professionalism, and integrity. When you contact us, you're not just getting a service; you're gaining a partner dedicated to ensuring your complete satisfaction and comfort.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Direct Contact Information</h3>
              <div className="space-y-6">
                <InfoItem icon={<MapPin className="w-6 h-6" />} title="Office Address">
                  <p>35 Aladelola Street, Ikosi, Ketu, LAGOS</p>
                  <Button variant="link" asChild className="p-0 h-auto text-blue-600">
                    <Link href="https://www.google.com/maps/search/?api=1&query=35+Aladelola+Street,+Ikosi,+Ketu,+LAGOS" target="_blank" rel="noopener noreferrer">
                      View on Google Maps
                    </Link>
                  </Button>
                </InfoItem>
                <InfoItem icon={<Phone className="w-6 h-6" />} title="Phone">
                  <a href="tel:2349090904363" className="block hover:text-blue-600 transition-colors">234 909 090 4363</a>
                  <a href="tel:2348162038620" className="block hover:text-blue-600 transition-colors">234 816 203 8620</a>
                </InfoItem>
                <InfoItem icon={<Mail className="w-6 h-6" />} title="Email">
                  <a href="mailto:alpinetechhvac@gmail.com" className="hover:text-blue-600 transition-colors">alpinetechhvac@gmail.com</a>
                </InfoItem>
              </div>
            </div>
          </div>
          
          {/* Form Section (Right Side) */}
          <div className="lg:col-span-3">
            <Card className="shadow-xl border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Send Your Inquiry</CardTitle>
                <CardDescription>Fill out the form below, and one of our experts will get back to you promptly.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel>How can we help?</FormLabel>
                        <FormControl><Textarea rows={5} placeholder="Please describe your needs or question..." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Send Message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </section>
  );
}

// Helper component for consistent info item styling
const InfoItem = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="flex items-start gap-4">
    <div className="bg-blue-100 text-blue-600 p-3 rounded-full flex-shrink-0">
      {icon}
    </div>
    <div className="text-gray-600">
      <h4 className="font-semibold text-lg text-gray-900 mb-1">{title}</h4>
      {children}
    </div>
  </div>
);
