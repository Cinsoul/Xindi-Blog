import React from 'react';

interface ArtheraLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

export const ArtheraLogo: React.FC<ArtheraLogoProps> = ({
  className = '',
  size = 56,
  showText = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Direct image asset replacement matching 41.JPG */}
      <img
        src="/arthera-logo.png"
        alt="Arthera"
        width={typeof size === 'number' ? size : undefined}
        height={typeof size === 'number' ? size : undefined}
        className="shrink-0 object-contain rounded-[24%] shadow-sm transition-transform duration-300 hover:scale-[1.02]"
        style={{
          width: size,
          height: size,
        }}
        loading="eager"
      />

      {showText && (
        <span className="font-semibold tracking-tight text-[#0B0F17] dark:text-white">
          Arthera
        </span>
      )}
    </div>
  );
};
