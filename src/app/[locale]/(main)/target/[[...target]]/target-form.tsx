'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type FormValues = {
  target_name: string;
  target_amount: number;
  saved_amount: number;
  saving_time: number;
};

export default function TargetForm({
  onSubmitGoal,
}: {
  onSubmitGoal: (goal: FormValues) => void;
}) {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    onSubmitGoal(data);
    toast.success('✅ Mục tiêu mới đã được thêm!');
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid sm:grid-cols-2 gap-4 bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-cyan-400/30"
    >
      <div className="sm:col-span-2">
        <Label className="text-sm text-gray-300 mb-2">Tên mục tiêu</Label>
        <Input {...register('target_name')} className="bg-white/10 text-white border-white/30" />
      </div>

      <div>
        <Label className="text-sm text-gray-300 mb-2">Số tiền mục tiêu</Label>
        <Input
          type="number"
          {...register('target_amount', { valueAsNumber: true })}
          className="bg-white/10 text-white border-white/30"
        />
      </div>
      <div>
        <Label className="text-sm text-gray-300 mb-2">Đã tiết kiệm</Label>
        <Input
          type="number"
          {...register('saved_amount', { valueAsNumber: true })}
          className="bg-white/10 text-white border-white/30"
        />
      </div>

      <div className="sm:col-span-2">
        <Label className="text-sm text-gray-300 mb-2">Thời gian (tháng)</Label>
        <Input
          type="number"
          {...register('saving_time', { valueAsNumber: true })}
          className="bg-white/10 text-white border-white/30"
        />
      </div>

      <div className="sm:col-span-2">
        <Button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl mt-2"
        >
          Lưu mục tiêu
        </Button>
      </div>
    </form>
  );
}
