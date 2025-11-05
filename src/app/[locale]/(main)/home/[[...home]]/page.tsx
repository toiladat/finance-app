// type Props = {
//   searchParams: Promise<{ invitedBy: string | null; spillover: string | null }>;

import MagicBento from '@/components/MagicBento';
import TextType from '@/components/TextType';
import { CardTitle } from '@/components/ui/card';

// };
const register = async () => {
  interface BentoCardProps {
    color?: string;
    title?: string;
    description?: string;
    label?: string;
    textAutoHide?: boolean;
    disableAnimations?: boolean;
    content?: React.ReactNode; // 👈 thêm dòng này

  }

  const cardData: BentoCardProps[] = [
    {
      color: '#0A1E2A',
      title: 'Thu nhập',
      description: 'Theo dõi lương, thưởng và nguồn thu phụ',
      label: 'Income',
    },
    {
      color: '#2A0A0A',
      title: 'Chi tiêu',
      description: 'Phân loại chi tiêu theo nhóm và cảnh báo vượt hạn mức',
      label: 'Expenses',
    },
    {
      color: '#06120D',
      title: 'Mục tiêu',
      description: 'Đặt mục tiêu tài chính và theo dõi tiến độ tiết kiệm',
      label: 'Goals',
    },
    {
      color: '#101010',
      title: 'Phân tích',
      description: 'AI nhận diện xu hướng chi tiêu, dự báo dòng tiền tương lai',
      label: 'Insights',
    },
    {
      color: '#1B0020',
      title: 'Cảnh báo',
      description: 'Thông báo khi bạn chi quá tay hoặc có biến động lớn',
      label: 'Alerts',
    },
    {
      color: '#000A14',
      title: 'Báo cáo',
      description: 'Tự động tạo báo cáo chi tiết theo tháng hoặc quý',
      label: 'Reports',
    },
  ];

  return (
    <div className="flex flex-col items-center relative pt-10">
      <div className="grid flex-1 gap-1">
        <CardTitle className="text-cyan-300 text-xl font-semibold tracking-wide">
          <TextType
            text={[
              '📊 Tổng quan thu – chi tài chính',
              'Tiêu tiền ít thôi',
              'Phân tích xu hướng chi tiêu và nguồn thu của bạn',
              'AI giúp bạn quản lý tài chính hiệu quả',
              'Đặt mục tiêu tài chính, theo dõi tiến trình và nhận thông báo',
              'Tự động tạo báo cáo tài chính hàng tháng',

            ]}
            typingSpeed={70}
            pauseDuration={1800}
            showCursor={true}
            cursorCharacter="|"
          />
        </CardTitle>
      </div>
      <MagicBento
        textAutoHide={true}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        spotlightRadius={300}
        particleCount={12}
        glowColor="132, 0, 255"
        cardData={cardData}
      />
    </div>
  );
};

export default register;
