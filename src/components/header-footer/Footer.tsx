'use client';

import { Bot, ChartLine, ClipboardCheck, HouseIcon, Landmark, MapPinned, Target } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Dock from '../Dock';

const tabBar = [
  { icon: HouseIcon, title: 'Trang chủ', to: '/home' },
  { icon: Bot, title: 'AI', to: '/ai' },
  { icon: Target, title: 'Mục tiêu', to: '/target' },
  { icon: ClipboardCheck, title: 'Lời nhắc', to: '/reminder' },
  { icon: ChartLine, title: 'Thống kê', to: '/statistic' },
  { icon: Landmark, title: 'Giao dịch', to: '/transaction' },
  { icon: MapPinned, title: 'Bản đồ', to: '/map' },
];

export function Footer() {
  const pathName = usePathname();

  // Ẩn dock trong các route đặc biệt
  if (pathName.includes('game') || pathName.includes('info')) {
    return null;
  }

  // Map tabBar → cấu trúc items cho Dock
  const items = tabBar.map(({ icon: Icon, title, to }) => ({
    icon: (
      <Link
        href={to}
        className="flex items-center justify-center w-full h-full"
      >
        <Icon
          size={22}
          strokeWidth={2}
          className={`transition-all duration-300 ${
            pathName.startsWith(to)
              ? // Tab đang active
              'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.9)] scale-110'
              : // Tab bình thường
              'text-slate-200 opacity-80 hover:text-white hover:opacity-100 hover:drop-shadow-[0_0_6px_rgba(100,255,255,0.6)]'
          }`}
        />
      </Link>
    ),
    label: title,
  }));

  return (
    <footer
      className="
        fixed bottom-0 left-0 w-full
        flex justify-center
        z-50
        pb-[calc(env(safe-area-inset-bottom)+0.5rem)]
        pointer-events-none
      "
    >
      <div className="pointer-events-auto">
        <Dock
          items={items}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
          distance={200}
          dockHeight={256}
          spring={{ mass: 0.1, stiffness: 150, damping: 12 }}
        />
      </div>
    </footer>
  );
}
