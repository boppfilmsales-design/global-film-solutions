import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  desc,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  crumbs?: { label: string; to?: string }[];
}) {
  return (
    <section className="relative overflow-hidden gradient-hero text-white">
      <div className="absolute inset-0 opacity-25 [background:radial-gradient(circle_at_20%_30%,white,transparent_40%),radial-gradient(circle_at_80%_70%,var(--brand-glow),transparent_50%)]" />
      <div className="container-x relative py-16 md:py-24">
        {crumbs && (
          <nav className="flex items-center gap-1.5 text-xs opacity-80 mb-4">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {c.to ? (
                  <Link to={c.to} className="hover:underline">
                    {c.label}
                  </Link>
                ) : (
                  <span>{c.label}</span>
                )}
                {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3" />}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <div className="text-xs font-semibold uppercase tracking-[0.3em] opacity-80">{eyebrow}</div>
        )}
        <h1 className="mt-2 text-3xl md:text-5xl font-bold font-display">{title}</h1>
        {desc && <p className="mt-4 max-w-2xl text-base md:text-lg opacity-85">{desc}</p>}
      </div>
    </section>
  );
}
