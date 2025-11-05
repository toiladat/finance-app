'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ReminderForm from './reminder-form';

type Reminder = {
  id: string;
  content: string;
  time: string;
};

export default function Page() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [open, setOpen] = useState(false);

  // === Fetch dữ liệu ban đầu ===
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://tdat9663.app.n8n.cloud/webhook/webhook-2', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'reminders' }),
        });
        const data: Reminder[] = await res.json();
        if (Array.isArray(data)) {
          setReminders(data);
        }
      } catch {
        toast.error('❌ Lỗi khi tải danh sách lời nhắc');
      }
    })();
  }, []);

  // === Thêm lời nhắc ===
  const handleAddGoal = async (reminder: Omit<Reminder, 'id'>) => {
    const newReminder = { ...reminder, id: crypto.randomUUID() };
    setReminders(prev => [...prev, newReminder]);
    try {
      await fetch('https://tdat9663.app.n8n.cloud/webhook/webhook-2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add-reminder',
          ...newReminder,
        }),
      });
      toast.success('✅ Lời nhắc mới đã được thêm!');
    } catch {
      toast.error('⚠️ Không thể thêm lời nhắc mới');
    } finally {
      setOpen(false);
    }
  };

  // === Xóa lời nhắc ===
  const handleDelete = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    toast.success('🗑️ Đã xóa lời nhắc');
  };

  // === UI ===
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090922] to-[#012A4A] text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold tracking-wide">
            📅 Lời nhắc của bạn
          </h1>
          <Button
            onClick={() => setOpen(true)}
            className="bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl px-6"
          >
            ➕ Tạo mục tiêu
          </Button>
        </header>

        {/* Dialog tạo mục tiêu */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-white/10 backdrop-blur-2xl border border-cyan-400/40 text-white max-w-lg rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl text-cyan-300">
                🪙 Tạo lời nhắc mới
              </DialogTitle>
            </DialogHeader>
            <ReminderForm onSubmitReminder={handleAddGoal} />
          </DialogContent>
        </Dialog>

        {/* Danh sách lời nhắc */}
        {reminders.length === 0 ? (
          <p className="text-center text-gray-400 mt-20 italic">
            Bạn chưa có lời nhắc nào. Hãy bắt đầu bằng một mục tiêu nhỏ ✨
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reminders.map((reminder) => {
              const now = new Date();
              const reminderDate = new Date(reminder.time);
              const isUpcoming = reminderDate > now;

              const statusLabel = isUpcoming ? 'Sắp đến hẹn' : 'Đã quá hẹn';
              const statusColor = isUpcoming
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                : 'bg-red-500/20 text-red-300 border border-red-400/40';

              const timeDiff = Math.abs(reminderDate.getTime() - now.getTime());
              const minutesDiff = Math.floor(timeDiff / 60000);
              const hoursDiff = Math.floor(minutesDiff / 60);
              const displayDiff
      = minutesDiff < 60
        ? `${minutesDiff} phút`
        : `${hoursDiff} giờ ${minutesDiff % 60} phút`;

              return (
                <Card
                  key={reminder.id}
                  className="relative bg-[#0B1120]/70 backdrop-blur-xl border border-cyan-400/20 shadow-[0_0_25px_-8px_rgba(0,255,255,0.2)] text-white rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-200"
                >
                  {/* Header */}
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-cyan-300 flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                      {reminder.content}
                    </CardTitle>
                  </CardHeader>

                  {/* Body */}
                  <CardContent className="pt-1 space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-300">
                      <span className="flex items-center gap-2">
                        <span className="text-cyan-400">⏰</span>
                        {reminderDate.toLocaleString('vi-VN')}
                      </span>
                    </div>

                    {/* Time difference indicator */}
                    <p className="text-xs text-gray-400 italic">
                      {isUpcoming
                        ? `Còn khoảng ${displayDiff} nữa`
                        : `Đã trễ ${displayDiff}`}
                    </p>

                    {/* Status badge */}
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
                    >
                      {statusLabel}
                    </div>

                    {/* Divider line */}
                    <div className="h-px bg-cyan-400/10 my-2" />

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-200 border border-cyan-400/40 rounded-xl transition-colors"
                        onClick={() => toast(`📅 ${statusLabel}: ${reminder.content}`)}
                      >
                        Xem chi tiết
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(reminder.id)}
                        className="flex-1 bg-red-500/40 hover:bg-red-500 text-white rounded-xl transition-colors"
                      >
                        🗑️ Xóa
                      </Button>
                    </div>
                  </CardContent>

                  {/* Accent gradient line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500" />
                </Card>
              );
            })}
          </div>

        )}
      </div>
    </div>
  );
}
