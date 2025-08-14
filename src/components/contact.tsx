"use client";

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

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type FormValues = z.infer<typeof formSchema>;

export function Contact() {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(values);
    toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">Contact Us</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">We're here to help. Reach out to us for consultations, quotes, or any questions you may have.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
              <blockquote className="border-l-4 border-accent pl-6 text-lg text-muted-foreground italic">
                Delivering affordable air conditioning solutions for both residential and commercial spaces, employing top-tier systems and adhering strictly to industry standards to establish a comfortable living and working environment.
              </blockquote>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">Our Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Office Address</h4>
                    <p className="text-muted-foreground">35 Aladelola Street, Ikosi, Ketu, LAGOS</p>
                    <Button variant="link" asChild className="p-0 h-auto">
                      <Link href="https://www.google.com/maps/search/?api=1&query=35+Aladelola+Street,+Ikosi,+Ketu,+LAGOS" target="_blank" rel="noopener noreferrer">
                        View on Google Maps
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Phone</h4>
                    <a href="tel:2349090904363" className="block text-muted-foreground hover:text-primary transition-colors">234 909 090 4363</a>
                    <a href="tel:2348162038620" className="block text-muted-foreground hover:text-primary transition-colors">234 816 203 8620</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Email</h4>
                    <a href="mailto:alpinetechhvac@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">alpinetechhvac@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form Section */}
          <div className="w-full">
            <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-headline text-primary">Send Us a Message</CardTitle>
                  <CardDescription>Have a question or ready to start a project? Fill out the form below.</CardDescription>
                </CardHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea rows={4} placeholder="Tell us how we can help..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Send Message
                      </Button>
                    </CardContent>
                  </form>
                </Form>
              </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
