'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ChevronDownIcon, Clock2Icon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const isValidDate = (d?: Date) => !!d && !Number.isNaN(d.getTime());

type Props = {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
  name: string;
  invalid?: boolean;
};

export default function DateTimePicker({ value, onChange, name, invalid }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [tempDate, setTempDate] = useState<Date | undefined>(value);

  useEffect(() => {
    setTempDate(value);
  }, [value]);

  const timeInputValue = useMemo(() => {
    if (!isValidDate(tempDate)) return '';

    const h = tempDate!.getHours().toString().padStart(2, '0');
    const m = tempDate!.getMinutes().toString().padStart(2, '0');
    const s = tempDate!.getSeconds().toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }, [tempDate]);

  const handlePopoverOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      onChange(isValidDate(tempDate) ? tempDate : undefined);
    }
    setOpen(nextOpen);
  };

  const handleDateChange = (selectedValue: Date | undefined) => {
    if (selectedValue === undefined) {
      return;
    }

    if (tempDate === undefined) {
      setTempDate(selectedValue);
      return;
    }

    const valueHours = !Number.isNaN(tempDate.getHours()) ? tempDate.getHours() : 0;
    const valueMinutes = !Number.isNaN(tempDate.getMinutes()) ? tempDate.getMinutes() : 0;
    const valueSeconds = !Number.isNaN(tempDate.getSeconds()) ? tempDate.getSeconds() : 0;

    const selectedYear = selectedValue.getFullYear();
    const selectedMonth = selectedValue.getMonth();
    const selectedDate = selectedValue.getDate();

    const newDate = new Date(
      selectedYear,
      selectedMonth,
      selectedDate,
      valueHours,
      valueMinutes,
      valueSeconds
    );

    setTempDate(newDate);
  };

  const handleTimeChange = (selectedTime: string) => {
    if (selectedTime.length < 1) {
      return;
    }

    const [h, m, s] = selectedTime.split(':');

    const selectedHours = Number(h);
    const selectedMinutes = Number(m);
    const selectedSeconds = s ? Number(s) : 0; // Time input does not show seconds on iOS

    const valueYear = tempDate ? tempDate.getFullYear() : new Date().getFullYear();
    const valueMonth = tempDate ? tempDate.getMonth() : new Date().getMonth();
    const valueDate = tempDate ? tempDate.getDate() : new Date().getDate();

    const newDate = new Date(
      valueYear,
      valueMonth,
      valueDate,
      Number(selectedHours),
      Number(selectedMinutes),
      Number(selectedSeconds)
    );

    setTempDate(newDate);
  };

  return (
    <Popover open={open} onOpenChange={handlePopoverOpenChange}>
      <PopoverTrigger asChild>
        <Button
          id={name}
          aria-label="Open date and time picker"
          variant="outline"
          className={cn(
            'w-full justify-between font-normal',
            invalid && 'border-destructive'
          )}
        >
          {tempDate ? tempDate.toLocaleString() : 'Select date'}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="center">
        <Card className="w-fit py-2 gap-1">
          <CardContent className="px-2 pb-4">
            <Calendar
              mode="single"
              selected={tempDate}
              onSelect={(selected) => handleDateChange(selected)}
              className="bg-transparent p-0 [--cell-size:2rem] md:[--cell-size:2.25rem]"
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-6 border-t px-4 !py-3">
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="time-from">Time</Label>
              <div className="relative flex w-full items-center gap-2">
                <Clock2Icon className="text-muted-foreground pointer-events-none absolute left-2.5 size-4 select-none" />
                <Input
                  id="time-from"
                  type="time"
                  step={1}
                  value={timeInputValue}
                  onChange={(e) => {
                    e.preventDefault();
                    handleTimeChange(e.currentTarget.value);
                  }}
                  className="appearance-none pl-8 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
            </div>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
