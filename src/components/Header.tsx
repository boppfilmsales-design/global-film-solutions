import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, X, Globe, Phone, ArrowRight, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { contact } from "@/data/site";
import { taxonomy, productsByCat, productsBySub, allClassified } from "@/data/taxonomy";

export function Header() {
  const { lang, setLang, tr } = useI18n();
  const [open, setOpen] = useState(false);
  const [mobileProd, setMobileProd] = useState(false);
  const [hoverCat, setHoverCat] = useState<string>(taxonomy[0].id);

  const activeCat = taxonomy.find((c) => c.id === hoverCat) ?? taxonomy[0];
  const activeCatCount = productsByCat[activeCat.id]?.length ?? 0;
  const activeCatName = { zh: activeCat.zh, en: activeCat.en };

  // Source-site (boppfilmsale.com) 7 product groupings — quick filters into /catalog
  const sourceGroups: { zh: string; en: string; q: string }[] = [
    { zh: "胶带 & 胶水", en: "Packing Tape & Adhesive Glue", q: "tape" },
    { zh: "原料药 & 医药中间体", en: "API & Pharmaceutical Intermediates", q: "pharma" },
    { zh: "BOPS / CPP / BOPA 膜", en: "BOPS, CPP & BOPA Film", q: "cpp" },
    { zh: "拉线 / 碳带 / 标签 / 条码机", en: "Tear Tape · Ribbons · Label · Printers", q: "ribbon" },
    { zh: "POF / PE / PVC 膜及袋子", en: "POF · PE · PVC Film & Bags", q: "pof" },
    { zh: "机械设备 & 电子产品", en: "Machine Equipment & Electronics", q: "machine" },
    { zh: "轮毂 & 口罩", en: "Wheel Rims & Mask", q: "mask" },
  ];

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
            <div className="text-[11px] text-muted-foreground">{lang === "zh" ? "安徽东渐 · 软包装薄膜" : "Anhui Eastern Communication · Films"}</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <NavLink to="/">{tr.nav.home}</NavLink>

          {/* COMPANY dropdown */}
          <DropdownMenu label={lang === "zh" ? "公司" : "Company"} items={[
            { to: "/about", t: { zh: "关于我们", en: "About Us" }, d: { zh: "公司简介与团队", en: "Profile & team" } },
            { to: "/about", t: { zh: "公司简介", en: "Company Profile" }, d: { zh: "安徽东渐进出口", en: "Anhui Eastern Communication I/E" } },
            { to: "/factory", t: { zh: "工厂与生产线", en: "Factory & Production" }, d: { zh: "挤出 / 涂布 / 分切", en: "Extrusion · coating · slitting" } },
            { to: "/quality", t: { zh: "品质控制", en: "Quality Control" }, d: { zh: "QC 与实验室检测", en: "QC & lab testing" } },
            { to: "/certifications", t: { zh: "认证体系", en: "Certifications" }, d: { zh: "ISO / FDA / REACH", en: "ISO / FDA / REACH" } },
            { to: "/contact", t: { zh: "客户反馈", en: "Feedback" }, d: { zh: "留言与询价", en: "Leave a message" } },
          ]} lang={lang} />

          {/* PRODUCTS mega menu */}
          <div className="relative group">
            <button className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground inline-flex items-center gap-1 rounded-md hover:bg-secondary transition">
              {tr.nav.products} <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="w-[960px] max-w-[92vw] rounded-2xl border border-border bg-popover shadow-elegant overflow-hidden">
                <div className="grid grid-cols-12">
                  <ul className="col-span-5 bg-secondary/40 py-3 max-h-[520px] overflow-y-auto">
                    {taxonomy.map((c) => {
                      const n = productsByCat[c.id]?.length ?? 0;
                      return (
                        <li key={c.id}>
                          <Link
                            to="/products"
                            onMouseEnter={() => setHoverCat(c.id)}
                            className={`flex items-center justify-between gap-2 px-4 py-2.5 text-sm transition border-l-2 ${
                              hoverCat === c.id
                                ? "bg-popover text-brand font-semibold border-brand"
                                : "border-transparent text-foreground/80 hover:text-foreground hover:bg-popover/60"
                            }`}
                          >
                            <span className="flex items-center gap-2.5 min-w-0">
                              <span className="text-base">{c.icon}</span>
                              <span className="truncate">{lang === "zh" ? c.zh : c.en}</span>
                            </span>
                            <span className="text-[10px] text-muted-foreground shrink-0">{n}</span>
                          </Link>
                        </li>
                      );
                    })}
                    <li className="border-t border-border mt-2 pt-2">
                      <Link to="/products" className="block px-4 py-2.5 text-sm font-semibold text-brand hover:underline">
                        {lang === "zh" ? `→ 全部 ${allClassified.length} 款产品` : `→ All ${allClassified.length} products`}
                      </Link>
                    </li>
                  </ul>
                  <div className="col-span-7 p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="min-w-0 pr-4">
                        <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-brand uppercase tracking-wider">
                          <Sparkles className="h-3 w-3" /> {activeCatCount} {tr.productsIn}
                        </div>
                        <div className="font-display font-bold text-base mt-1 truncate">{activeCatName[lang]}</div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                          {lang === "zh" ? "点击子分类进入产品中心浏览" : "Click a sub-category to browse products"}
                        </p>
                      </div>
                      <Link to="/products" className="shrink-0 text-xs font-medium text-brand hover:underline whitespace-nowrap">
                        {tr.viewAll}
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 max-h-[420px] overflow-y-auto pr-1">
                      {activeCat.subs
                        .filter((s) => (productsBySub[s.id]?.length ?? 0) > 0)
                        .map((s) => {
                          const n = productsBySub[s.id]?.length ?? 0;
                          return (
                            <Link
                              key={s.id}
                              to="/products"
                              className="group/card flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-border bg-card hover:border-brand hover:bg-brand/5 transition"
                            >
                              <span className="text-[12px] font-medium line-clamp-2 leading-tight">
                                {lang === "zh" ? s.zh : s.en}
                              </span>
                              <span className="flex items-center gap-1 shrink-0">
                                <span className="text-[10px] text-muted-foreground">{n}</span>
                                <ArrowRight className="h-3 w-3 text-brand opacity-0 group-hover/card:opacity-100 transition" />
                              </span>
                            </Link>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* SOLUTIONS dropdown */}
          <DropdownMenu label={lang === "zh" ? "解决方案" : "Solutions"} items={[
            { to: "/solutions", t: { zh: "全部行业方案", en: "All Industries" }, d: { zh: "总览", en: "Overview" } },
            { to: "/solutions/food", t: { zh: "食品包装", en: "Food Packaging" }, d: { zh: "糖果 / 烘焙 / 冷冻", en: "Candy · bakery · frozen" } },
            { to: "/solutions/pharma", t: { zh: "医药包装", en: "Pharmaceutical" }, d: { zh: "USP / EP / ChP", en: "USP / EP / ChP" } },
            { to: "/solutions/electronics", t: { zh: "电子电气", en: "Electronics" }, d: { zh: "电容器 / 太阳能", en: "Capacitor · solar" } },
            { to: "/solutions/industrial", t: { zh: "工业胶带", en: "Industrial & Tape" }, d: { zh: "胶带 / 保护膜", en: "Tape & protective" } },
          ]} lang={lang} />

          {/* RESOURCES dropdown */}
          <DropdownMenu label={lang === "zh" ? "资源" : "Resources"} items={[
            { to: "/catalog", t: { zh: "全部产品目录", en: "Full Catalog" }, d: { zh: "540+ 款产品搜索", en: "Search 540+ items" } },
            { to: "/news", t: { zh: "新闻动态", en: "News" }, d: { zh: "公司与行业动态", en: "Company & industry" } },
            { to: "/faq", t: { zh: "常见问题 FAQ", en: "FAQ" }, d: { zh: "订购 / 物流 / 付款", en: "MOQ · shipping · payment" } },
            { to: "/downloads", t: { zh: "资料下载", en: "Downloads" }, d: { zh: "规格书 / 证书", en: "Datasheets & certs" } },
          ]} lang={lang} extras={
            <a href="/sitemap.xml" className="block text-xs text-muted-foreground hover:text-brand">
              {lang === "zh" ? "🗺️ Sitemap.xml (SEO)" : "🗺️ Sitemap.xml (SEO)"}
            </a>
          } />

          {/* CONTACT dropdown */}
          <DropdownMenu label={tr.nav.contact} items={[
            { to: "/contact", t: { zh: "在线询价", en: "Inquiry Form" }, d: { zh: "提交需求获取报价", en: "Submit and get a quote" } },
            { to: "/contact", t: { zh: "客户反馈", en: "Customer Feedback" }, d: { zh: "建议与售后", en: "Suggestions & after-sales" } },
          ]} lang={lang} extras={
            <div className="border-t border-border pt-3 mt-1 space-y-1.5 text-xs">
              <a href={`mailto:${contact.email}`} className="block hover:text-brand">✉️ {contact.email}</a>
              <a href={`mailto:${contact.email2}`} className="block hover:text-brand">✉️ {contact.email2}</a>
              <a href={`tel:${contact.mobile}`} className="block hover:text-brand">📞 {contact.mobile}</a>
              <a href={`https://wa.me/${contact.whatsapp}`} className="block hover:text-brand">💬 WhatsApp {contact.whatsapp}</a>
              <div className="text-muted-foreground">QQ {contact.qq} · WeChat {contact.wechat}</div>
            </div>
          } />
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
            <MobileGroup label={lang === "zh" ? "公司" : "Company"}>
              <MobileLink to="/about" onClick={() => setOpen(false)}>{tr.nav.about}</MobileLink>
              <MobileLink to="/about" onClick={() => setOpen(false)}>{lang === "zh" ? "公司简介" : "Company Profile"}</MobileLink>
              <MobileLink to="/factory" onClick={() => setOpen(false)}>{lang === "zh" ? "工厂与生产线" : "Factory & Production"}</MobileLink>
              <MobileLink to="/quality" onClick={() => setOpen(false)}>{lang === "zh" ? "品质控制" : "Quality Control"}</MobileLink>
              <MobileLink to="/certifications" onClick={() => setOpen(false)}>{lang === "zh" ? "认证体系" : "Certifications"}</MobileLink>
              <MobileLink to="/contact" onClick={() => setOpen(false)}>{lang === "zh" ? "客户反馈" : "Feedback"}</MobileLink>
            </MobileGroup>
            <button
              onClick={() => setMobileProd(!mobileProd)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium hover:bg-secondary"
            >
              {tr.nav.products}
              <ChevronDown className={`h-4 w-4 transition ${mobileProd ? "rotate-180" : ""}`} />
            </button>
            {mobileProd && (
              <div className="pl-2 space-y-2 pb-2">
                <div className="px-2 pt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {lang === "zh" ? "源站分类" : "Source Categories"}
                </div>
                <div className="px-2 flex flex-wrap gap-1.5">
                  {sourceGroups.map((g) => (
                    <a
                      key={g.q}
                      href={`/catalog?q=${encodeURIComponent(g.q)}`}
                      onClick={() => setOpen(false)}
                      className="text-[11px] px-2 py-1 rounded-md border border-border bg-secondary/50 hover:bg-brand hover:text-brand-foreground transition"
                    >
                      {g[lang]}
                    </a>
                  ))}
                </div>
                <div className="px-2 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {lang === "zh" ? "薄膜分类" : "Film Categories"}
                </div>
                {taxonomy.map((c) => {
                  const total = productsByCat[c.id]?.length ?? 0;
                  return (
                    <details key={c.id} className="rounded-lg border border-border bg-card">
                      <summary className="px-3 py-2.5 text-sm font-semibold cursor-pointer flex items-center justify-between">
                        <span className="flex items-center gap-2"><span>{c.icon}</span>{lang === "zh" ? c.zh : c.en}</span>
                        <span className="text-[10px] text-muted-foreground">{total}</span>
                      </summary>
                      <div className="border-t border-border p-2 grid grid-cols-1 gap-1">
                        {c.subs
                          .filter((s) => (productsBySub[s.id]?.length ?? 0) > 0)
                          .map((s) => (
                            <Link
                              key={s.id}
                              to="/products"
                              onClick={() => setOpen(false)}
                              className="flex items-center justify-between text-[11px] p-1.5 rounded hover:bg-secondary"
                            >
                              <span className="line-clamp-1">{lang === "zh" ? s.zh : s.en}</span>
                              <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{productsBySub[s.id]?.length ?? 0}</span>
                            </Link>
                          ))}
                        <Link
                          to="/products"
                          onClick={() => setOpen(false)}
                          className="col-span-2 text-center text-[11px] text-brand py-1.5 font-medium"
                        >
                          {tr.viewAll}
                        </Link>
                      </div>
                    </details>
                  );
                })}
                <MobileLink to="/products" onClick={() => setOpen(false)}>{lang === "zh" ? `→ 全部 ${allClassified.length} 款产品` : `→ All ${allClassified.length} products`}</MobileLink>
              </div>
            )}
            <MobileGroup label={lang === "zh" ? "解决方案" : "Solutions"}>
              <MobileLink to="/solutions" onClick={() => setOpen(false)}>{lang === "zh" ? "全部行业方案" : "All Industries"}</MobileLink>
              <MobileLink to="/solutions/food" onClick={() => setOpen(false)}>{lang === "zh" ? "食品包装" : "Food Packaging"}</MobileLink>
              <MobileLink to="/solutions/pharma" onClick={() => setOpen(false)}>{lang === "zh" ? "医药包装" : "Pharmaceutical"}</MobileLink>
              <MobileLink to="/solutions/electronics" onClick={() => setOpen(false)}>{lang === "zh" ? "电子电气" : "Electronics"}</MobileLink>
              <MobileLink to="/solutions/industrial" onClick={() => setOpen(false)}>{lang === "zh" ? "工业胶带" : "Industrial & Tape"}</MobileLink>
            </MobileGroup>
            <MobileGroup label={lang === "zh" ? "资源" : "Resources"}>
              <MobileLink to="/catalog" onClick={() => setOpen(false)}>{lang === "zh" ? "全部产品目录" : "Full Catalog"}</MobileLink>
              <MobileLink to="/news" onClick={() => setOpen(false)}>{lang === "zh" ? "新闻动态" : "News"}</MobileLink>
              <MobileLink to="/faq" onClick={() => setOpen(false)}>{lang === "zh" ? "常见问题 FAQ" : "FAQ"}</MobileLink>
              <MobileLink to="/downloads" onClick={() => setOpen(false)}>{lang === "zh" ? "资料下载" : "Downloads"}</MobileLink>
              <a href="/sitemap.xml" className="block px-3 py-2.5 rounded-md text-sm font-medium hover:bg-secondary">🗺️ Sitemap.xml</a>
            </MobileGroup>
            <MobileGroup label={tr.nav.contact}>
              <MobileLink to="/contact" onClick={() => setOpen(false)}>{lang === "zh" ? "在线询价" : "Inquiry Form"}</MobileLink>
              <MobileLink to="/contact" onClick={() => setOpen(false)}>{lang === "zh" ? "客户反馈" : "Customer Feedback"}</MobileLink>
              <a href={`mailto:${contact.email}`} className="block px-3 py-2.5 text-sm hover:bg-secondary rounded-md">✉️ {contact.email}</a>
              <a href={`mailto:${contact.email2}`} className="block px-3 py-2.5 text-sm hover:bg-secondary rounded-md">✉️ {contact.email2}</a>
              <a href={`tel:${contact.mobile}`} className="block px-3 py-2.5 text-sm hover:bg-secondary rounded-md">📞 {contact.mobile}</a>
              <a href={`https://wa.me/${contact.whatsapp}`} className="block px-3 py-2.5 text-sm hover:bg-secondary rounded-md">💬 WhatsApp</a>
            </MobileGroup>
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

function MobileGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <details className="rounded-md">
      <summary className="cursor-pointer list-none flex items-center justify-between px-3 py-2.5 text-sm font-medium hover:bg-secondary rounded-md">
        {label} <ChevronDown className="h-4 w-4" />
      </summary>
      <div className="pl-3 mt-1 space-y-0.5">{children}</div>
    </details>
  );
}

type DropdownItem = {
  to: string;
  t: { zh: string; en: string };
  d: { zh: string; en: string };
};

function DropdownMenu({
  label,
  items,
  lang,
  extras,
}: {
  label: string;
  items: DropdownItem[];
  lang: "zh" | "en";
  extras?: React.ReactNode;
}) {
  return (
    <div className="relative group">
      <button className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground inline-flex items-center gap-1 rounded-md hover:bg-secondary transition">
        {label} <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="w-72 rounded-2xl border border-border bg-popover shadow-elegant overflow-hidden p-2">
          {items.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className="block px-3 py-2.5 rounded-lg hover:bg-secondary transition"
            >
              <div className="text-sm font-semibold">{it.t[lang]}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{it.d[lang]}</div>
            </Link>
          ))}
          {extras && <div className="px-3 py-2">{extras}</div>}
        </div>
      </div>
    </div>
  );
}

