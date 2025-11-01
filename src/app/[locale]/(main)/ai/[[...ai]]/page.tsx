'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import clsx from 'clsx';
import React from 'react';

type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  action?: string;
};

const Page = () => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { role: 'assistant', content: 'Xin chào! Mình là AI, bạn muốn hỏi gì nè? 🤖' },
  ]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // auto-scroll xuống cuối khi có tin nhắn mới
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) {
      return;
    }
    setInput('');
    const next = [...messages, { role: 'user', content: text, action: 'chat' } as ChatMessage];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch('https://tdat9663.app.n8n.cloud/webhook/finance-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next[next.length - 1], action: 'chat' }),
      });

      const data = await res.json();
      const reply = (data?.data as string) ?? 'Xin lỗi, mình chưa hiểu.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Xin lỗi, mình chưa hiểu.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-3xl flex-col gap-4 p-4">
      <header className="sticky top-0 z-10 rounded-2xl bg-white/10 p-4 text-white backdrop-blur-xl border border-white/10 shadow">
        <h1 className="text-xl font-semibold">Chat AI</h1>
      </header>

      <div
        ref={listRef}
        className="flex-1 overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
      >
        <div className="space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={clsx(
                'max-w-[85%] rounded-2xl px-4 py-3',
                m.role === 'user'
                  ? 'ml-auto bg-cyan-500/20 text-cyan-50 border border-cyan-400/30'
                  : 'mr-auto bg-white/10 text-white border border-white/20'
              )}
            >
              <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="mr-auto max-w-[70%] animate-pulse rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white">
              AI đang soạn…
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-4 z-10 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 p-2 backdrop-blur-xl">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Nhập câu hỏi của bạn…"
          className="h-12 flex-1 bg-white/10 text-white placeholder-white/50 border-white/20 focus-visible:ring-cyan-400"
        />
        <Button
          onClick={() => void send()}
          disabled={loading}
          className="h-12 min-w-24 bg-cyan-500 text-white hover:bg-cyan-400 disabled:opacity-60"
        >
          {loading ? 'Đang gửi…' : 'Gửi'}
        </Button>
      </div>
    </div>
  );
};
export default Page;
