'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Loader2, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import TargetForm from './target-form';

type Goal = {
  id: string;
  target_name: string;
  target_amount: number;
  saved_amount: number;
  saving_time: number;
};

const TargetPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [open, setOpen] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);
  const [consult, setConsult] = useState('');
  const [loading, setLoading] = useState(false);

  // === Fetch mục tiêu ===
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch('https://tdat9663.app.n8n.cloud/webhook/finance-webhook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'targets' }),
        });
        const data = await result.json();
        if (data) {
          setGoals(data);
        }
      // eslint-disable-next-line unused-imports/no-unused-vars
      } catch (err) {
        toast.error('Lỗi khi tải danh sách mục tiêu');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  // === Thêm mục tiêu ===
  const handleAddGoal = async (goal: Omit<Goal, 'id'>) => {
    const newGoal = { ...goal, id: crypto.randomUUID() };
    setGoals(prev => [...prev, newGoal]);
    const body = {
      action: 'add-target',
      target_name: goal.target_name,
      target_amount: goal.target_amount,
      saved_amount: goal.saved_amount,
      saving_time: goal.saving_time,
      id: newGoal.id,
    };
    try {
      fetch('https://tdat9663.app.n8n.cloud/webhook/finance-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then(res => res.json())
        .then((data) => {
          toast.success(data.message || 'Tạo mục tiêu thành công!');
        })
        .catch(() => {
          toast.error('Không thể thêm mục tiêu mới');
        });
    } catch {
      toast.error('Không thể thêm mục tiêu mới');
    }
    setOpen(false);
  };

  // === Xóa mục tiêu ===
  const handleDelete = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
    toast.success('Đã xóa mục tiêu');
  };

  // === Tư vấn AI ===
  const handleConsult = async (id: string) => {
    setConsult('');
    setLoading(true);
    setConsultOpen(true);

    const body = {
      action: 'consult-target',
      id,
    };
    try {
      const result = await fetch('https://tdat9663.app.n8n.cloud/webhook/webhook-2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await result.json();
      setConsult(data?.data || 'Không nhận được phản hồi từ AI');
    } catch {
      setConsult('⚠️ Lỗi kết nối đến AI. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // === Giao diện ===
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] to-[#001F3F] text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">🎯 Mục tiêu tài chính của bạn</h1>
          <Button
            onClick={() => setOpen(true)}
            className="bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl px-6 py-2"
          >
            ➕ Tạo mục tiêu
          </Button>
        </div>

        {/* Dialog tạo mục tiêu */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-white/10 backdrop-blur-2xl border border-cyan-400/40 text-white max-w-lg rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl text-cyan-300">
                🪙 Tạo mục tiêu mới
              </DialogTitle>
            </DialogHeader>
            <TargetForm onSubmitGoal={handleAddGoal} />
          </DialogContent>
        </Dialog>

        {/* Dialog tư vấn AI */}
        <Dialog open={consultOpen} onOpenChange={setConsultOpen}>
          <DialogContent className="bg-white/10 backdrop-blur-2xl border border-cyan-400/30 text-white max-w-lg rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-center text-cyan-300 flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-300" />
                Lời khuyên từ AI
              </DialogTitle>
            </DialogHeader>
            <div className="p-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center text-center text-gray-300 py-6">
                  <Loader2 className="w-8 h-8 animate-spin mb-3 text-cyan-300" />
                  <p>Đang phân tích dữ liệu tài chính của bạn...</p>
                </div>
              ) : (
                <p className="text-sm leading-relaxed text-gray-200 whitespace-pre-wrap">
                  {consult}
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Danh sách mục tiêu */}
        {goals.length === 0 ? (
          <p className="text-center text-gray-400 mt-20">
            Bạn chưa có mục tiêu nào. Hãy tạo mục tiêu đầu tiên nhé ✨
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => {
              const progress = Math.min((goal.saved_amount / goal.target_amount) * 100, 100);
              return (
                <Card
                  key={goal.id}
                  className="bg-white/10 backdrop-blur-xl border border-cyan-400/30 shadow-[0_0_30px_-5px_rgba(0,255,255,0.3)] text-white rounded-2xl"
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">{goal.target_name}</CardTitle>
                    <p className="text-sm text-gray-300">
                      {goal.saved_amount.toLocaleString()}
                      {' '}
                      /
                      {' '}
                      {goal.target_amount.toLocaleString()}
                      {' '}
                      VNĐ
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Progress value={progress} className="h-3 bg-white/70" />
                    <p className="mt-2 text-cyan-300 text-sm">
                      {progress.toFixed(1)}
                      % hoàn thành
                    </p>
                    <p className="mt-2 text-xs text-gray-400">
                      Thời gian:
                      {' '}
                      {goal.saving_time}
                      {' '}
                      tháng
                    </p>
                    <Button
                      onClick={() => handleConsult(goal.id)}
                      className="mt-4 w-full bg-cyan-500/60 hover:bg-cyan-500 text-white"
                    >
                      💬 Lời khuyên từ AI
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(goal.id)}
                      className="mt-3 w-full bg-red-500/60 hover:bg-red-500 text-white"
                    >
                      🗑️ Xóa
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TargetPage;
