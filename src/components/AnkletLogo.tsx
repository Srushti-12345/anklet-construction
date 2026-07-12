import React from "react";

interface AnkletLogoProps {
  className?: string;
  showText?: boolean;
  lightText?: boolean; // If true, make the auxiliary text white/slate for dark backgrounds
  height?: number | string;
  align?: "center" | "left";
}

export const AnkletLogo: React.FC<AnkletLogoProps> = ({
  className = "",
  showText = true,
  lightText = false,
  height = 64,
  align = "center",
}) => {
  const navyColor = "#000000";
  const orangeColor = "#F97316";
  const textPrimary = lightText ? "#FFFFFF" : "#111827";
  const textSecondary = lightText ? "#9CA3AF" : "#4B5563";
  const innerLight = lightText ? "#FFFFFF" : "#CBD5E1"; // Slate-300 line for visibility on light mode
  const innerBg = lightText ? "#FFFFFF" : "#F1F5F9"; // Slate-100 window background on light mode

  // Dynamic height for the SVG portion
  const parsedHeight = typeof height === "number" ? height : parseInt(height as string) || 64;
  const svgHeight = Math.max(parsedHeight * 0.5, 18);

  return (
    <div 
      className={`flex flex-col justify-center select-none ${align === "left" ? "items-start text-left" : "items-center text-center"} ${className}`}
      style={{ height: parsedHeight }}
    >
      {/* Precision Vector SVG Logo Icon */}
      <svg
        viewBox="110 22 85 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: svgHeight, width: "auto" }}
        className="shrink-0"
      >
        {/* --- CRANE (NAVY BLUE) --- */}
        {/* Mast */}
        <path
          d="M136 78V35M140 78V35"
          stroke={navyColor}
          strokeWidth="1.5"
        />
        {/* Lattice inside mast */}
        <path
          d="M136 35L140 43M136 43L140 35M136 43L140 51M136 51L140 43M136 51L140 59M136 59L140 51M136 59L140 67M136 67L140 59M136 67L140 75M136 75L140 67"
          stroke={navyColor}
          strokeWidth="0.8"
        />
        {/* Jib / Boom */}
        <path
          d="M112 35H180"
          stroke={navyColor}
          strokeWidth="2"
        />
        {/* Jib structure details */}
        <path
          d="M125 35L136 24L140 24L151 35"
          stroke={navyColor}
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M138 24V35"
          stroke={navyColor}
          strokeWidth="1"
        />
        {/* Pendant / Tie lines */}
        <path
          d="M112 35L136 24"
          stroke={navyColor}
          strokeWidth="1"
        />
        <path
          d="M180 35L140 24"
          stroke={navyColor}
          strokeWidth="1"
        />
        {/* Trolley and hook line */}
        <rect x="165" y="35" width="4" height="2" fill={navyColor} />
        <line x1="167" y1="37" x2="167" y2="52" stroke={navyColor} strokeWidth="0.8" />

        {/* --- ORANGE SKYSCRAPER (CONSTRUCTION ORANGE) --- */}
        {/* Main tall tower */}
        <path
          d="M151 86H173V49H151V86Z"
          fill={orangeColor}
          opacity="0.95"
        />
        {/* Tower horizontal glass stripes / windows */}
        <path d="M154 53H170" stroke="#FFFFFF" strokeWidth="1.5" />
        <path d="M154 58H170" stroke="#FFFFFF" strokeWidth="1.5" />
        <path d="M154 63H170" stroke="#FFFFFF" strokeWidth="1.5" />
        <path d="M154 68H170" stroke="#FFFFFF" strokeWidth="1.5" />
        <path d="M154 73H170" stroke="#FFFFFF" strokeWidth="1.5" />
        <path d="M154 78H170" stroke="#FFFFFF" strokeWidth="1.5" />
        <path d="M154 83H170" stroke="#FFFFFF" strokeWidth="1.5" />

        {/* Adjacent orange building section */}
        <path
          d="M132 86H151V68H132V86Z"
          fill={orangeColor}
          opacity="0.8"
        />
        <path d="M136 72H147" stroke="#FFFFFF" strokeWidth="1.5" />
        <path d="M136 77H147" stroke="#FFFFFF" strokeWidth="1.5" />
        <path d="M136 82H147" stroke="#FFFFFF" strokeWidth="1.5" />

        {/* --- HOUSE ROOFS (NAVY AND ORANGE) --- */}
        {/* Outer Orange Roof Frame (Left side) */}
        <path
          d="M112 110L138 72L174 110"
          stroke={orangeColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M115 110L138 77L168 110"
          stroke={innerLight}
          strokeWidth="1.5"
        />
        
        {/* Solid Navy Overlapping Roof (Right side/Center) */}
        <path
          d="M133 83L173 110H144L133 83Z"
          fill={navyColor}
        />
        <path
          d="M133 83L173 110"
          stroke={navyColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M149 110H190L175 99L149 110Z"
          fill={orangeColor}
          opacity="0.85"
        />
        <path
          d="M175 99L193 110"
          stroke={orangeColor}
          strokeWidth="2.5"
        />

        {/* --- WINDOWS AND HOUSE DETAILS --- */}
        {/* Window for Left House (Orange roofed) */}
        <rect x="131" y="93" width="14" height="14" fill={innerBg} rx="1" />
        <rect x="133" y="95" width="4" height="4" fill={navyColor} />
        <rect x="139" y="95" width="4" height="4" fill={navyColor} />
        <rect x="133" y="101" width="4" height="4" fill={navyColor} />
        <rect x="139" y="101" width="4" height="4" fill={navyColor} />

        {/* Window for Right House (Orange extension) */}
        <rect x="179" y="104" width="6" height="6" fill={innerBg} rx="0.5" />
        <rect x="180" y="105" width="1.8" height="1.8" fill={navyColor} />
        <rect x="182.8" y="105" width="1.8" height="1.8" fill={navyColor} />
        <rect x="180" y="107.8" width="1.8" height="1.8" fill={navyColor} />
        <rect x="182.8" y="107.8" width="1.8" height="1.8" fill={navyColor} />

        {/* --- BASE SWOOSH CURVE --- */}
        <path
          d="M118 108C135 120 165 121 193 109"
          stroke={navyColor}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>

      {/* --- BRAND TYPOGRAPHY --- */}
      {showText && (
        <div className={`flex flex-col select-none mt-1 leading-none ${align === "left" ? "items-start" : "items-center"}`}>
          <span
            className="text-[11px] sm:text-[12px] xl:text-[13px] font-black tracking-[0.25em] leading-none font-display"
            style={{ color: textPrimary }}
          >
            ANKLET
          </span>
          <span
            className="text-[5.5px] sm:text-[6px] xl:text-[6.5px] font-bold tracking-[0.16em] leading-none mt-1"
            style={{ color: textSecondary, fontFamily: "'Inter', sans-serif" }}
          >
            CONSTRUCTION & INFRASTRUCTURE
          </span>
          <div
            className="h-[1px] w-10 xl:w-12 mt-1"
            style={{ backgroundColor: orangeColor }}
          />
          <span
            className="text-[4.5px] sm:text-[5px] xl:text-[5.5px] font-semibold tracking-[0.14em] mt-1"
            style={{ color: orangeColor, fontFamily: "'Inter', sans-serif" }}
          >
            WE BUILD WHAT YOU IMAGINE
          </span>
        </div>
      )}
    </div>
  );
};
