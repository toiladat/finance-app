// type Props = {
//   searchParams: Promise<{ invitedBy: string | null; spillover: string | null }>;

import MagicBento from '@/components/MagicBento';

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
      color: '#060010',
      title: 'Analytics',
      description: 'Track user behavior',
      label: 'Insights'
    },
    {
      color: '#060010',
      title: 'Dashboard',
      description: 'Centralized data view',
      label: 'Overview'
    },
    {
      color: '#060010',
      title: 'Collaboration',
      description: 'Work together seamlessly',
      label: 'Teamwork'
    },
    {
      color: '#060010',
      title: 'Automation',
      description: 'Streamline workflows',
      label: 'Efficiency'
    },
    {
      color: '#060010',
      title: 'Integration',
      description: 'Connect favorite tools',
      label: 'Connectivity'
    },
    {
      color: '#060010',
      title: 'Security',
      description: 'Enterprise-grade protection',
      label: 'Protection'
    },

  ];

  return (
    <div className="flex flex-col items-center relative pt-20">
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
