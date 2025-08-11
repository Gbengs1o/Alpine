"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { estimateHvacSize, type HvacSizeEstimatorOutput } from '@/ai/flows/hvac-size-estimator';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Zap } from 'lucide-react';

const formSchema = z.object({
  squareFootage: z.coerce.number().min(100, "Must be at least 100 sq ft.").max(20000, "Must be 20,000 sq ft or less."),
  insulationQuality: z.enum(['poor', 'average', 'good', 'excellent']),
  geographicLocation: z.string().min(2, "Please enter a valid location."),
});

type FormValues = z.infer<typeof formSchema>;

export function HvacEstimator() {
  const [result, setResult] = useState<HvacSizeEstimatorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      squareFootage: 1500,
      insulationQuality: 'average',
      geographicLocation: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const estimation = await estimateHvacSize(values);
      setResult(estimation);
    } catch (e) {
      setError("An error occurred while estimating. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="estimator" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/40">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <div className="inline-block rounded-lg bg-accent/20 px-3 py-1 text-sm text-accent-foreground">AI Powered</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">HVAC Size Estimator</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            Not sure what size system you need? Use our AI-powered tool to get a quick estimate.
          </p>
        </div>
        <div className="mx-auto w-full max-w-2xl">
          <Card>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <CardHeader>
                  <CardTitle>Home Details</CardTitle>
                  <CardDescription>Enter your home's information to get a recommendation.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-left">
                  <FormField
                    control={form.control}
                    name="squareFootage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Square Footage (sq. ft.)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 1500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="insulationQuality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Insulation Quality</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select insulation quality" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="poor">Poor</SelectItem>
                            <SelectItem value="average">Average</SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="excellent">Excellent</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="geographicLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City & State, or Zip Code</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Denver, CO" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                    Estimate Size
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>

          {result && (
            <Card className="mt-8 text-left animate-in fade-in-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Zap className="text-primary"/> AI Recommendation</CardTitle>
                <CardDescription>Based on the information provided, here is our suggestion.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary/40 rounded-lg">
                        <p className="text-sm text-muted-foreground">Recommended Size (Tons)</p>
                        <p className="text-2xl font-bold text-primary">{result.recommendedSizeTons} tons</p>
                    </div>
                    <div className="p-4 bg-secondary/40 rounded-lg">
                        <p className="text-sm text-muted-foreground">Recommended Size (BTUs)</p>
                        <p className="text-2xl font-bold text-primary">{result.recommendedSizeBTUs.toLocaleString()} BTU/hr</p>
                    </div>
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Additional Considerations:</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.considerations}</p>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">This is an estimate. For an exact quote, please contact us for an in-home consultation.</p>
              </CardFooter>
            </Card>
          )}

          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
        </div>
      </div>
    </section>
  );
}
