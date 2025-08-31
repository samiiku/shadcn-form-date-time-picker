'use client';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DateTimePicker from '@/components/ui/date-time-picker';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

// Simple date picker schema
const simpleSchema = z.object({
  date: z.date(),
});

type SimpleFormData = z.infer<typeof simpleSchema>;

// Start/end time schema
const rangeSchema = z
  .object({
    start: z.date(),
    end: z.date(),
  })
  .refine((data) => !data.start || !data.end || data.end > data.start, {
    message: 'End time must be after start time',
    path: ['end'],
  });

type RangeFormData = z.infer<typeof rangeSchema>;

export default function Page() {
  // Simple date picker form
  const simpleForm = useForm<SimpleFormData>({
    resolver: zodResolver(simpleSchema),
    defaultValues: { date: undefined },
  });

  // Start/end time form, defaultValues undefined to avoid hydration error
  const rangeForm = useForm<RangeFormData>({
    resolver: zodResolver(rangeSchema),
    defaultValues: {
      start: undefined,
      end: undefined,
    },
  });

  // Set initial values on client after mount
  useEffect(() => {
    rangeForm.reset({
      start: new Date(),
      end: new Date(new Date().setDate(new Date().getDate() - 1)),
    });
  }, [rangeForm]);

  function onSimpleSubmit(data: SimpleFormData) {
    alert('Selected: ' + data.date);
  }

  function onRangeSubmit(data: RangeFormData) {
    alert('Start: ' + data.start + '\nEnd: ' + data.end);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-12">
      <main className="w-full max-w-md flex flex-col gap-12">
        <section>
          <h2 className="text-xl font-bold mb-4">Basic DateTimePicker</h2>
          <p className="mb-2 text-muted-foreground">
            A simple date-time picker with no initial value.
          </p>
          <Form {...simpleForm}>
            <form onSubmit={simpleForm.handleSubmit(onSimpleSubmit)}>
              <FormField
                control={simpleForm.control}
                name="date"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Date and time</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        value={field.value}
                        onChange={field.onChange}
                        name={field.name}
                        invalid={!!fieldState.error}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-6 w-full">
                Submit
              </Button>
            </form>
          </Form>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">
            DateTimePicker with Error Handling
          </h2>
          <p className="mb-2 text-muted-foreground">
            End time must be after start time. Shows error if not.
          </p>
          <Form {...rangeForm}>
            <form onSubmit={rangeForm.handleSubmit(onRangeSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={rangeForm.control}
                  name="start"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>Start time</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          value={field.value}
                          onChange={field.onChange}
                          name={field.name}
                          invalid={!!fieldState.error}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={rangeForm.control}
                  name="end"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>End time</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          value={field.value}
                          onChange={field.onChange}
                          name={field.name}
                          invalid={!!fieldState.error}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="mt-2 w-full">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </section>
      </main>
      <footer>
        <div className="flex flex-col items-center">
          <span className="font-semibold">Github: </span>
          <a
            className="underline"
            target="_blank"
            href="https://github.com/samiiku/shadcn-form-date-time-picker"
          >
            https://github.com/samiiku/shadcn-form-date-time-picker
          </a>
        </div>
      </footer>
    </div>
  );
}
