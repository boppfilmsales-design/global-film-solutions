import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, X, Globe, Phone, ArrowRight, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { categories, contact } from "@/data/site";
import { ProductImage } from "@/components/ProductImage";

export function Header() {
  const { lang, setLang, tr } = useI18n();
  const [open, setOpen] = useState(false);
  const [mobileProd, setMobileProd] = useState(false);
  const [hoverCat, setHoverCat] = useState<string>(categories[0].id);

  const activeCat = categories.find((c) => c.id === hoverCat) ?? categories[0];

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
            <span className="hidden md:inline opacity-70">QQ {contact.qq}</span>
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
          <NavLink to="/catalog">{lang === "zh" ? "全部目录" : "Catalog"}</NavLink>

          <div className="relative group">
            <button className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground inline-flex items-center gap-1 rounded-md hover:bg-secondary transition">
              {tr.nav.products} <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />
            </button>
            {/* MEGA MENU */}
            <div className="absolute right-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="w-[960px] max-w-[92vw] rounded-2xl border border-border bg-popover shadow-elegant overflow-hidden">
                <div className="grid grid-cols-12">
                  {/* Category list */}
                  <ul className="col-span-4 bg-secondary/40 py-3 max-h-[480px] overflow-y-auto">
                    {categories.map((c) => (
                      <li key={c.id}>
                        <Link
                          to="/products/$categoryId"
                          params={{ categoryId: c.id }}
                          onMouseEnter={() => setHoverCat(c.id)}
                          className={`flex items-center justify-between gap-2 px-4 py-2.5 text-sm transition border-l-2 ${
                            hoverCat === c.id
                              ? "bg-popover text-brand font-semibold border-brand"
                              : "border-transparent text-foreground/80 hover:text-foreground hover:bg-popover/60"
                          }`}
                        >
                          <span className="flex items-center gap-2.5 min-w-0">
                            <span className="text-base">{c.icon}</span>
                            <span className="truncate">{c.short[lang]}</span>
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-60" />
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* Featured panel */}
                  <div className="col-span-8 p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="min-w-0 pr-4">
                        <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-brand uppercase tracking-wider">
                          <Sparkles className="h-3 w-3" /> {activeCat.products.length} {tr.productsIn}
                        </div>
                        <div className="font-display font-bold text-base mt-1 truncate">{activeCat.name[lang]}</div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{activeCat.desc[lang]}</p>
                      </div>
                      <Link
                        to="/products/$categoryId"
                        params={{ categoryId: activeCat.id }}
                        className="shrink-0 text-xs font-medium text-brand hover:underline whitespace-nowrap"
                      >
                        {tr.viewAll}
                      </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-2.5">
                      {activeCat.products.slice(0, 6).map((p) => (
                        <Link
                          key={p.id}
                          to="/products/$categoryId/$productId"
                          params={{ categoryId: activeCat.id, productId: p.id }}
                          className="group/card rounded-lg border border-border bg-card overflow-hidden hover:shadow-elegant hover:-translate-y-0.5 transition"
                        >
                          <div className="aspect-[4/3] overflow-hidden bg-muted">
                            <ProductImage product={p} category={activeCat} className="w-full h-full group-hover/card:scale-105 transition duration-500" />
                          </div>
                          <div className="p-2">
                            <div className="text-[11px] font-semibold line-clamp-2 leading-tight">{p.name[lang]}</div>
                          </div>
                        </Link>
                      ))}
                      {activeCat.products.length === 0 && (
                        <div className="col-span-3 text-center text-xs text-muted-foreground py-8 border border-dashed border-border rounded-lg">
                          {lang === "zh" ? "更多产品请来电咨询" : "Contact us for more"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
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
        <div className="lg:hidden border-t border-border bg-background max-h-[80vh] overflow-y-auto">
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
              <div className="pl-2 space-y-2 pb-2">
                {categories.map((c) => (
                  <details key={c.id} className="rounded-lg border border-border bg-card">
                    <summary className="px-3 py-2.5 text-sm font-semibold cursor-pointer flex items-center justify-between">
                      <span className="flex items-center gap-2"><span>{c.icon}</span>{c.short[lang]}</span>
                      <span className="text-[10px] text-muted-foreground">{c.products.length}</span>
                    </summary>
                    <div className="border-t border-border p-2 grid grid-cols-2 gap-2">
                      {c.products.slice(0, 6).map((p) => (
                        <Link
                          key={p.id}
                          to="/products/$categoryId/$productId"
                          params={{ categoryId: c.id, productId: p.id }}
                          onClick={() => setOpen(false)}
                          className="text-[11px] p-1.5 rounded hover:bg-secondary line-clamp-2"
                        >
                          {p.name[lang]}
                        </Link>
                      ))}
                      <Link
                        to="/products/$categoryId"
                        params={{ categoryId: c.id }}
                        onClick={() => setOpen(false)}
                        className="col-span-2 text-center text-[11px] text-brand py-1.5 font-medium"
                      >
                        {tr.viewAll}
                      </Link>
                    </div>
                  </details>
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
