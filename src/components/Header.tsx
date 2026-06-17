import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, X, Globe, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { categories, contact } from "@/data/site";

export function Header() {
  const { lang, setLang, tr } = useI18n();
  const [open, setOpen] = useState(false);
  const [mobileProd, setMobileProd] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="bg-primary text-primary-foreground/90 text-xs">
        <div className="container-x flex h-9 items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">{contact.company[lang]}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${contact.mobile}`} className="flex items-center gap-1.5 hover:text-white">
              <Phone className="h-3 w-3" /> {contact.mobile}
            </a>
            <a href={`mailto:${contact.email}`} className="hidden sm:inline hover:text-white">
              {contact.email}
            </a>
          </div>
        </div>
      </div>
      <div className="container-x flex h-18 items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-lg gradient-brand shadow-elegant grid place-items-center text-brand-foreground font-bold font-display">
            AEC
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-lg text-foreground">BOPP Film Sale</div>
            <div className="text-[11px] text-muted-foreground">{lang === "zh" ? "安徽东渐 · 软包装薄膜" : "Anhui Dongjian · Films"}</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <NavLink to="/">{tr.nav.home}</NavLink>
          <NavLink to="/about">{tr.nav.about}</NavLink>

          <div className="relative group">
            <button className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground inline-flex items-center gap-1 rounded-md hover:bg-secondary transition">
              {tr.nav.products} <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="w-[720px] grid grid-cols-2 gap-1 p-3 rounded-xl border border-border bg-popover shadow-elegant">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    to="/products/$categoryId"
                    params={{ categoryId: c.id }}
                    className="group/item flex items-start gap-3 rounded-lg p-3 hover:bg-secondary transition"
                  >
                    <div className="h-9 w-9 rounded-md gradient-brand/80 shrink-0 grid place-items-center text-brand-foreground text-xs font-bold">
                      {c.products.length || "·"}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-foreground truncate">{c.name[lang]}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2">{c.desc[lang]}</div>
                    </div>
                  </Link>
                ))}
                <Link to="/products" className="col-span-2 mt-1 text-center text-sm font-medium text-brand hover:underline py-2">
                  {tr.viewAll}
                </Link>
              </div>
            </div>
          </div>

          <NavLink to="/contact">{tr.nav.contact}</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition"
          >
            <Globe className="h-4 w-4" />
            {lang === "zh" ? "EN" : "中文"}
          </button>
          <Link
            to="/contact"
            className="hidden md:inline-flex px-4 py-2 rounded-md gradient-brand text-brand-foreground text-sm font-medium shadow-elegant hover:opacity-90 transition"
          >
            {tr.heroCta2}
          </Link>
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-x py-3 space-y-1">
            <MobileLink to="/" onClick={() => setOpen(false)}>{tr.nav.home}</MobileLink>
            <MobileLink to="/about" onClick={() => setOpen(false)}>{tr.nav.about}</MobileLink>
            <button
              onClick={() => setMobileProd(!mobileProd)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium hover:bg-secondary"
            >
              {tr.nav.products}
              <ChevronDown className={`h-4 w-4 transition ${mobileProd ? "rotate-180" : ""}`} />
            </button>
            {mobileProd && (
              <div className="pl-3 space-y-1">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    to="/products/$categoryId"
                    params={{ categoryId: c.id }}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md"
                  >
                    {c.name[lang]}
                  </Link>
                ))}
              </div>
            )}
            <MobileLink to="/contact" onClick={() => setOpen(false)}>{tr.nav.contact}</MobileLink>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary rounded-md transition"
      activeProps={{ className: "px-4 py-2 text-sm font-semibold text-brand bg-secondary rounded-md" }}
      activeOptions={{ exact: true }}
    >
      {children}
    </Link>
  );
}
function MobileLink({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link to={to} onClick={onClick} className="block px-3 py-2.5 rounded-md text-sm font-medium hover:bg-secondary">
      {children}
    </Link>
  );
}
