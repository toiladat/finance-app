'use client';

import TextType from '@/components/TextType';
import { CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import React from 'react';

const register = async () => {
  interface BentoCardProps {
    color?: string;
    title?: string;
    description?: string;
    label?: string;
    content?: React.ReactNode;
  }

  // mini sparkline (biểu đồ giả)
  const Sparkline = ({ data }: { data: number[] }) => {
    const width = 120;
    const height = 40;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const points = data
      .map(
        (v, i) =>
          `${(i / (data.length - 1)) * width},${height - ((v - min) / (max - min)) * height}`
      )
      .join(' ');

    return (
      <svg width={width} height={height} className="mt-2">
        <polyline
          fill="none"
          stroke="#00ffff"
          strokeWidth="2"
          points={points}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  // fake data cho card
  const cardData: BentoCardProps[] = [
    {
      color: 'linear-gradient(135deg,#0A1E2A 0%,#102C3F 100%)',
      title: 'Thu nhập',
      description: 'Theo dõi lương, thưởng và nguồn thu phụ',
      label: 'Income',
      content: <Sparkline data={[60, 90, 120, 100, 150, 140, 200]} />,
    },
    {
      color: 'linear-gradient(135deg,#2A0A0A 0%,#3F1010 100%)',
      title: 'Chi tiêu',
      description: 'Phân loại chi tiêu theo nhóm và cảnh báo vượt hạn mức',
      label: 'Expenses',
      content: (
        <div className="text-sm text-gray-300 mt-2">
          💳 Tổng chi tháng này:
          {' '}
          <span className="text-cyan-300">8.450.000₫</span>
        </div>
      ),
    },
    {
      color: 'linear-gradient(135deg,#06120D 0%,#0C241A 100%)',
      title: 'Mục tiêu',
      description: 'Đặt mục tiêu tiết kiệm và theo dõi tiến độ',
      label: 'Goals',
      content: (
        <div className="w-full h-3 bg-white/10 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-cyan-400 transition-all duration-700"
            style={{ width: '60%' }}
          />
        </div>
      ),
    },
    {
      color: 'linear-gradient(135deg,#101010 0%,#1A1A2A 100%)',
      title: 'Phân tích',
      description: 'AI nhận diện xu hướng chi tiêu, dự báo dòng tiền tương lai',
      label: 'Insights',
      content: (
        <div className="text-xs text-gray-400 mt-2">
          🔍 Xu hướng chi tiêu giảm
          {' '}
          <span className="text-cyan-400">12%</span>
          {' '}
          so với tháng trước
        </div>
      ),
    },
    {
      color: 'linear-gradient(135deg,#1B0020 0%,#2A0030 100%)',
      title: 'Cảnh báo',
      description: 'Thông báo khi bạn chi quá tay hoặc có biến động lớn',
      label: 'Alerts',
      content: (
        <div className="text-xs text-red-300 mt-2">
          ⚠️ Bạn đã chi vượt 20% ngân sách ăn uống
        </div>
      ),
    },
    {
      color: 'linear-gradient(135deg,#000A14 0%,#00243B 100%)',
      title: 'Báo cáo',
      description: 'Tự động tạo báo cáo chi tiết theo tháng hoặc quý',
      label: 'Reports',
      content: (
        <div className="flex items-center gap-3 mt-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135706.png"
            alt="report"
            className="w-8 h-8"
          />
          <span className="text-xs text-gray-300">Báo cáo tháng 11 đã sẵn sàng</span>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#060d14]">
      {/* Khối nội dung trung tâm */}
      <div className="flex flex-col items-center w-full max-w-6xl px-6 py-12 space-y-10">

        {/* Tiêu đề gõ chữ động */}
        <div className="text-center">
          <CardTitle className="text-cyan-300 text-2xl md:text-3xl font-semibold tracking-wide leading-snug">
            <TextType
              text={[
                '📊 Tổng quan thu – chi tài chính cá nhân',
                '💰 Theo dõi thu nhập và chi tiêu thông minh',
                '🎯 Đặt mục tiêu tiết kiệm và theo dõi tiến độ',
                '🤖 AI dự báo dòng tiền giúp bạn kiểm soát tài chính',
                '📈 Báo cáo tự động, cảnh báo và gợi ý chi tiêu',
              ]}
              typingSpeed={70}
              pauseDuration={2000}
              showCursor
              cursorCharacter="|"
            />
          </CardTitle>
        </div>

        {/* Lưới Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {cardData.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl p-6 text-left border border-cyan-400/20 hover:border-cyan-400/60
                       transition-all hover:scale-[1.025] shadow-[0_0_20px_rgba(0,255,255,0.08)]
                       backdrop-blur-sm"
              style={{
                background: card.color,
              }}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg md:text-xl font-semibold text-cyan-200">
                  {card.title}
                </h3>
                <span className="text-xs px-2 py-1 rounded-full bg-cyan-400/10 text-cyan-200 border border-cyan-400/20">
                  {card.label}
                </span>
              </div>
              <p className="text-gray-300 text-sm mt-2 mb-4 leading-relaxed">
                {card.description}
              </p>
              {card.content && <div>{card.content}</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default register;
