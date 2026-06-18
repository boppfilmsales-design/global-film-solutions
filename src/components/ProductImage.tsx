import type { Category, Product } from "@/data/site";

// Deterministic hash → hue for gradient background.
function hashHue(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 360;
}

const PALETTES = [
  ["#0ea5e9", "#6366f1"],
  ["#06b6d4", "#3b82f6"],
  ["#22d3ee", "#0ea5e9"],
  ["#6366f1", "#8b5cf6"],
  ["#10b981", "#0ea5e9"],
  ["#f59e0b", "#ef4444"],
  ["#14b8a6", "#3b82f6"],
  ["#a855f7", "#ec4899"],
  ["#0891b2", "#1e40af"],
];

export function ProductImage({
  product,
  category,
  className = "",
  showLabel = true,
}: {
  product: Product;
  category: Category;
  className?: string;
  showLabel?: boolean;
}) {
  const idx = hashHue(product.id + category.id) % PALETTES.length;
  const [c1, c2] = PALETTES[idx];
  const initials = product.name.en
    .replace(/[^A-Za-z0-9 ]/g, "")
    .split(/\s+/)
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
    >
      {/* Decorative rings */}
      <svg
        className="absolute inset-0 w-full h-full opacity-25"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <radialGradient id={`g-${product.id}`} cx="30%" cy="20%" r="80%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill={`url(#g-${product.id})`} />
        <circle cx="170" cy="180" r="90" fill="#ffffff" opacity="0.08" />
        <circle cx="40" cy="170" r="40" fill="#ffffff" opacity="0.10" />
        <g stroke="#ffffff" strokeOpacity="0.18" fill="none">
          <path d="M-20 140 Q 60 100 120 130 T 240 110" strokeWidth="1.2" />
          <path d="M-20 160 Q 60 120 120 150 T 240 130" strokeWidth="1.2" />
          <path d="M-20 180 Q 60 140 120 170 T 240 150" strokeWidth="1.2" />
        </g>
      </svg>

      {/* Category icon mega-watermark */}
      <div
        className="absolute -right-6 -top-6 text-[10rem] leading-none font-black text-white/15 select-none"
        aria-hidden
      >
        {category.icon}
      </div>

      {/* Foreground label */}
      {showLabel && (
        <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
          <div className="text-[10px] font-bold uppercase tracking-widest opacity-90">
            {category.short.en}
          </div>
          <div>
            <div className="text-3xl font-black tracking-tight drop-shadow-sm">
              {initials || "FILM"}
            </div>
            <div className="text-[11px] font-medium opacity-90 line-clamp-2">
              {product.name.en}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
