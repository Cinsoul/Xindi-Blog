import React from 'react';
import { motion } from 'motion/react';
import { Plane, Camera, Dumbbell, Coffee, Gamepad2 } from 'lucide-react';
import { useAvatarImage } from './AvatarVisuals';

interface CareItem {
  id: string;
  title: string;
  subtitle: string;
  iconType: 'plane' | 'camera' | 'dumbbell' | 'coffee' | 'cat' | 'gamepad';
}

const careItems: CareItem[] = [
  {
    id: 'travel',
    title: 'Travel',
    subtitle: 'Explore the world',
    iconType: 'plane',
  },
  {
    id: 'photography',
    title: 'Photography',
    subtitle: 'Capture moments',
    iconType: 'camera',
  },
  {
    id: 'fitness',
    title: 'Fitness',
    subtitle: 'A clearer mind',
    iconType: 'dumbbell',
  },
  {
    id: 'coffee',
    title: 'Good Coffee',
    subtitle: 'Fuel for ideas',
    iconType: 'coffee',
  },
  {
    id: 'cats',
    title: 'Cats',
    subtitle: 'Taco 🐾',
    iconType: 'cat',
  },
  {
    id: 'games',
    title: 'Games',
    subtitle: 'Play to think',
    iconType: 'gamepad',
  },
];

const renderIcon = (type: CareItem['iconType']) => {
  const iconProps = {
    size: 22,
    className: 'text-[#1E293B] stroke-[1.8] transition-transform duration-200 group-hover:scale-110',
  };

  switch (type) {
    case 'plane':
      return <Plane {...iconProps} />;
    case 'camera':
      return <Camera {...iconProps} />;
    case 'dumbbell':
      return <Dumbbell {...iconProps} />;
    case 'coffee':
      return <Coffee {...iconProps} />;
    case 'cat':
      // Clean cat silhouette SVG matching icon in screenshot
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#1E293B] group-hover:scale-110 transition-transform"
        >
          <path d="M12 5c-3.5 0-6.5 2-8 5.5C3.3 12 3 13.5 3 15c0 4 4 6 9 6s9-2 9-6c0-1.5-.3-3-1-4.5C18.5 7 15.5 5 12 5z" />
          <path d="M4 10.5L3 4l5.5 3.5" />
          <path d="M20 10.5L21 4l-5.5 3.5" />
          <circle cx="9" cy="14" r="1" fill="currentColor" />
          <circle cx="15" cy="14" r="1" fill="currentColor" />
          <path d="M11 17h2" />
        </svg>
      );
    case 'gamepad':
      return <Gamepad2 {...iconProps} />;
  }
};

export const ThingsICareAbout: React.FC = () => {
  const [failedImages, setFailedImages] = React.useState<Record<string, boolean>>({});

  const coffeeImg = useAvatarImage('coffee');
  const photoImg = useAvatarImage('photo');
  const catImg = useAvatarImage('cat');
  const laptopImg = useAvatarImage('laptop');

  const avatarMap: Record<string, string | null> = {
    coffee: coffeeImg,
    photography: photoImg,
    cats: catImg,
    games: laptopImg,
  };

  const handleImgError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="interests" className="py-12 sm:py-16 relative">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Eyebrow & Title (lg: 3.5 cols) */}
          <div className="lg:col-span-4">
            <div className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-[#6B7280] mb-2 select-none">
              BEYOND WORK
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#0B0F17] leading-[1.12]">
              Things I <br />
              Care About.
            </h2>
          </div>

          {/* Right Column: 6 Minimalist Cards in a Row (lg: 8.5 cols) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {careItems.map((item, idx) => {
                const avatar = avatarMap[item.id];

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                    whileHover={{ y: -3 }}
                    className="group rounded-2xl bg-[#F4F6F9] border border-black/[0.03] p-4 flex flex-col items-center justify-center text-center h-[130px] hover:bg-[#EDF1F7] transition-all duration-200 relative overflow-hidden"
                  >
                    {/* Centered Outline Icon or 3D Avatar Sticker */}
                    <div className="mb-2 flex items-center justify-center h-9 w-9">
                      {avatar && !failedImages[item.id] ? (
                        <img
                          src={avatar}
                          alt={item.title}
                          onError={() => handleImgError(item.id)}
                          className="w-full h-full object-contain drop-shadow-sm group-hover:scale-115 transition-transform duration-200"
                        />
                      ) : (
                        renderIcon(item.iconType)
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xs sm:text-[13px] font-bold text-[#0B0F17] leading-tight mb-1">
                      {item.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-[11px] text-[#6B7280] leading-tight">
                      {item.subtitle}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
