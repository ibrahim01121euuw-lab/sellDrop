export default function SellDropLogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top left chevron pointing right */}
      <path d="M 28 26 L 50 44 L 42 52 L 20 34 Z" fill="#FF5252" />

      {/* Top right corner piece */}
      <path d="M 52 28 L 80 28 L 58 50 L 50 50 Z" fill="#FF5252" />

      {/* Center diamond/square piece */}
      <path d="M 50 50 L 70 50 L 70 70 L 50 70 Z" fill="#FF5252" />

      {/* Bottom left chevron pointing right */}
      <path d="M 20 68 L 42 68 L 50 76 L 28 76 Z" fill="#FF5252" />

      {/* Bottom right chevron pointing left */}
      <path d="M 58 68 L 80 68 L 78 90 L 60 90 Z" fill="#FF5252" />
    </svg>
  );
}
