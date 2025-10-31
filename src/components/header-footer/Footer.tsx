'use client';
import { Bot, ChartLine, ClipboardCheck, HouseIcon, Target } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabBar = [
  { icon: HouseIcon, title: 'Trang chủ', to: '/home' },
  { icon: Bot, title: 'AI', to: '/ai' },
  { icon: Target, title: 'Mục tiêu', to: '/target' },
  { icon: ClipboardCheck, title: 'Lời nhắc', to: '/reminder' },
  { icon: ChartLine, title: 'Thống kê', to: '/statistic' },

];

export function Footer() {
  const pathName = usePathname();
  if (pathName.includes('game') || pathName.includes('info')) {
    return null;
  }

  return (
    <footer
      className="absolute bottom-0 w-full  flex justify-center gap-4  space-x-4 mb-2" // cho z index cao hơn
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {tabBar.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            href={item.to}
            key={item.title}
            prefetch
            className={`flex flex-col gap-1 items-center ${pathName === item.to ? '' : 'opacity-50'}`}
          >
            <Icon className="text-white " />
            <span className="text-white font-[700] text-[0.5625rem]">
              {item.title}
            </span>
          </Link>
        );
      })}
    </footer>
  );
}
