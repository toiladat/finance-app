'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type FormValues = {
  content: string;
  time: Date;
};

export default function ReminderForm({

  onSubmitReminder,
}: {
  onSubmitReminder: (reminder: { content: string; time: string }) => void;
}) {
  const { control, register, handleSubmit, reset } = useForm<FormValues>();
  const [open, setOpen] = useState(false);

  const onSubmit = (data: FormValues) => {
    // format về dạng string ISO trước khi gửi ra ngoài
    onSubmitReminder({
      content: data.content,
      time: data.time.toISOString(),
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-cyan-400/30"
    >
      {/* --- Nội dung --- */}
      <div>
        <Label className="text-sm text-gray-300 mb-2 block">Nội dung lời nhắc</Label>
        <Input
          {...register('content', { required: true })}
          placeholder="Ví dụ: Thanh toán hóa đơn, gửi tiết kiệm..."
          className="bg-white/10 text-white border-white/30"
        />
      </div>

      {/* --- Date Picker --- */}
      <div>
        <Label className="text-sm text-gray-300 mb-2 block">Thời gian thực hiện</Label>
        <Controller
          control={control}
          name="time"
          rules={{ required: true }}
          render={({ field }) => (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal bg-[#0c0c1a]/10 border-white/30 text-white hover:bg-white/20',
                    !field.value && 'text-gray-400',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-cyan-300" />
                  {field.value
                    ? format(field.value, 'EEEE, dd/MM/yyyy \'lúc\' HH:mm', { locale: vi })
                    : 'Chọn ngày và giờ'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#0c0c1a]/10 border border-cyan-400/30 rounded-xl">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    setOpen(false);
                  }}
                  locale={vi}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />
      </div>

      {/* --- Submit --- */}
      <Button
        type="submit"
        className="w-full bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl mt-3"
      >
        🕒 Đặt lời nhắc
      </Button>
    </form>
  );
}
