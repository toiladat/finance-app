'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Loader2, UploadCloud } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function TransactionPage() {
  const [data, setData] = useState<any[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);

  // Lấy dữ liệu từ webhook n8n
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://tdat9663.app.n8n.cloud/webhook/webhook-2', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'transaction-detail' }),
        });
        const json = await res.json();
        console.log(json);
        setData(json);
      } catch (err) {
        console.error('❌ Lỗi khi fetch:', err);
      }
    };
    fetchData();
  }, []);

  // Gửi file Excel lên n8n
  const handleFile = async (file: File) => {
    setLoading(true);
    const form = new FormData();
    form.append('file', file);
    form.append('action', 'update-transaction');

    try {
      toast('⏳ Hệ thống đang xử lý...');

      fetch('https://tdat9663.app.n8n.cloud/webhook/webhook-2', {
        method: 'POST',
        body: form,
      })
        .then(res => res.json())
        .then(() => {
          toast('✅ Đồng bộ thành công');
        })
        .catch(() => toast('❌ Lỗi đồng bộ'))
        .finally(() => setLoading(false));
    } catch (err) {
      toast('❌ Lỗi upload!');
      console.error(err);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div
      className={cn(
        'min-h-screen w-full bg-gradient-to-br from-[#030712] via-[#061529] to-[#0b2035]',
        'text-white flex flex-col items-center px-6 py-10'
      )}
    >
      {/* --- Upload Zone --- */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          'w-full max-w-4xl rounded-2xl border-2 border-dashed transition-all',
          dragOver ? 'border-cyan-400 bg-cyan-400/10' : 'border-cyan-600/40 bg-white/5',
          'p-10 mb-10 flex flex-col items-center justify-center text-center backdrop-blur-xl shadow-[0_0_20px_rgba(0,255,255,0.1)]'
        )}
      >
        {loading ? (
          <Loader2 className="h-10 w-10 text-cyan-300 animate-spin mb-3" />
        ) : (
          <UploadCloud className="h-10 w-10 text-cyan-300 mb-3" />
        )}
        <p className="text-lg font-semibold text-cyan-200">
          Kéo file
          {' '}
          <span className="text-cyan-400">Excel (.xlsx)</span>
          {' '}
          vào đây
        </p>
        <p className="text-sm text-slate-400 mt-1">
          hoặc click để chọn file để đồng bộ dữ liệu giao dịch
        </p>
        <input
          type="file"
          accept=".xlsx"
          onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
          className="absolute opacity-0 w-full h-full cursor-pointer"
        />
      </div>

      {/* --- Table Zone --- */}
      <div
        className="w-full max-w-6xl bg-white/5 rounded-2xl border border-cyan-400/20
        backdrop-blur-md p-6 shadow-[0_0_20px_rgba(0,255,255,0.1)] overflow-hidden"
      >
        <h2 className="text-xl font-semibold text-cyan-300 mb-4">
          💠 Danh sách giao dịch gần đây
        </h2>
        <div className="overflow-x-auto max-h-[60vh]">
          <Table>
            <TableCaption>Biểu ghi thu chi được đồng bộ từ Google Sheet</TableCaption>
            <TableHeader>
              <TableRow className="bg-cyan-950/40">
                <TableHead className="w-[120px] text-cyan-300">Ngày</TableHead>
                <TableHead className="text-cyan-300">Số tiền</TableHead>
                <TableHead className="text-cyan-300">Loại giao dịch</TableHead>
                <TableHead className="text-cyan-300 text-center">Nội dung</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.length ? (
                data.map((item, i) => (
                  <TableRow
                    key={i}
                    className="hover:bg-cyan-900/30 transition-colors border-cyan-800/40"
                  >
                    <TableCell className="font-medium">{item['Ngày giao dịch']}</TableCell>
                    <TableCell className={cn(item['Loại'] === 'Tiền ra' ? 'text-red-400' : 'text-green-400')}>
                      {Number(item['Số tiền'] || 0).toLocaleString()}
                    </TableCell>
                    <TableCell className={cn(item['Loại'] === 'Tiền ra' ? 'text-red-400' : 'text-green-400')}>
                      {item['Loại'] || '-'}
                    </TableCell>
                    <TableCell className="text-center text-slate-200">
                      {item['Nội dung thanh toán'] || '-'}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-slate-400 py-6">
                    Chưa có dữ liệu hiển thị
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow className="bg-cyan-950/40">
                <TableCell colSpan={3}>Tổng thu/chi</TableCell>
                <TableCell className="text-right font-semibold text-cyan-300">
                  {data.length
                    ? `${data.reduce((a, b) => a + (b.income || 0) - (b.outcome || 0), 0).toLocaleString()} đ`
                    : '—'}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
}
