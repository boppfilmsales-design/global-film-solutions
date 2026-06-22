import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ProductImage } from "@/components/ProductImage";
import { useI18n } from "@/lib/i18n";
import { findProduct, contact, type Category, type Product } from "@/data/site";
import { Check, Mail, MessageCircle, Phone, ArrowRight, Download, Sparkles, Thermometer, Tag } from "lucide-react";

// Default usage-environment guidance applied when a product doesn't specify its own.
const DEFAULT_ENV = {
  zh: [
    "存储温度 5 – 35 ℃，相对湿度 40 – 70%",
    "避免阳光直射、远离热源与腐蚀性气体",
    "原箱平放堆码，单堆高度 ≤ 5 层",
    "建议自生产之日起 12 个月内使用",
  ],
  en: [
    "Storage 5 – 35 ℃, relative humidity 40 – 70%",
    "Keep away from direct sunlight, heat and corrosive gas",
    "Stack flat in original cartons, max 5 layers per stack",
    "Best used within 12 months from production date",
  ],
};

function deriveKeywords(prod: Product, cat: Category) {
  if (prod.keywords) return prod.keywords;
  const base = (s: string) => s.split(/[·,/、，]/).map((t) => t.trim()).filter(Boolean);
  return {
    zh: Array.from(new Set([
      ...base(prod.name.zh),
      ...base(cat.short.zh),
      "厂家直供", "批发定制", "出口供应",
    ])).slice(0, 10),
    en: Array.from(new Set([
      ...base(prod.name.en),
      ...base(cat.short.en),
      "Factory direct", "Wholesale", "Export supplier",
    ])).slice(0, 10),
  };
}

export const Route = createFileRoute("/products/$categoryId/$productId")({
  loader: ({ params }) => {
    const data = findProduct(params.categoryId, params.productId);
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => {
    const p = loaderData?.prod;
    const c = loaderData?.cat;
    const kw = p && c ? deriveKeywords(p, c).en.join(", ") : "";
    return {
      meta: [
        { title: `${p?.name.en ?? "Product"} | ${c?.name.en ?? ""} | BOPP Film Sale` },
        { name: "description", content: p?.desc?.en ?? c?.desc.en ?? "" },
        { name: "keywords", content: kw },
        { property: "og:image", content: p?.img ?? "" },
      ],
    };
  },
  notFoundComponent: () => (
    <Layout>
      <div className="container-x py-32 text-center">
        <h1 className="text-3xl font-bold">404</h1>
        <Link to="/products" className="text-brand hover:underline mt-4 inline-block">← Back</Link>
      </div>
    </Layout>
  ),
  errorComponent: ({ reset }) => (
    <Layout>
      <div className="container-x py-32 text-center">
        <p>Something went wrong.</p>
        <button onClick={reset} className="mt-4 px-4 py-2 rounded-md bg-primary text-primary-foreground">Retry</button>
      </div>
    </Layout>
  ),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { cat, prod } = Route.useLoaderData() as { cat: Category; prod: Product };
  const { lang, tr } = useI18n();
  const related = cat.products.filter((p) => p.id !== prod.id).slice(0, 4);
  const env = prod.environment ?? DEFAULT_ENV;
  const kws = deriveKeywords(prod, cat);

  return (
    <Layout>
      {/* HERO / SHOWCASE */}
      <section className="relative bg-gradient-to-br from-secondary/40 via-background to-background border-b border-border">
        <div className="container-x py-10 md:py-14">
          <div className="text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
            <Link to="/" className="hover:text-foreground">{tr.nav.home}</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-foreground">{tr.nav.products}</Link>
            <span>/</span>
            <Link to="/products/$categoryId" params={{ categoryId: cat.id }} className="hover:text-foreground">{cat.short[lang]}</Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate">{prod.name[lang]}</span>
          </div>

          <div className="mt-6 grid lg:grid-cols-2 gap-10 items-start">
            {/* Image stage */}
            <div className="relative">
              <div className="absolute -inset-4 gradient-brand opacity-20 blur-3xl rounded-full" />
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border bg-card shadow-elegant">
                <ProductImage product={prod} category={cat} className="w-full h-full" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur text-[11px] font-medium border border-border">
                  <span className="text-brand">{cat.icon}</span> {cat.short[lang]}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {[prod, ...related.slice(0, 3)].map((r, i) => (
                  <div key={r.id} className={`aspect-square rounded-xl overflow-hidden border ${i === 0 ? "border-brand ring-2 ring-brand/30" : "border-border"} bg-muted`}>
                    <ProductImage product={r} category={cat} className="w-full h-full" showLabel={false} />
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-[11px] font-medium">
                <Sparkles className="h-3 w-3 text-brand" /> {cat.name[lang]}
              </div>
              <h1 className="mt-4 text-3xl md:text-4xl font-bold font-display leading-tight">{prod.name[lang]}</h1>
              {prod.tagline && <p className="mt-2 text-base text-brand font-medium">{prod.tagline[lang]}</p>}
              {prod.desc && <p className="mt-4 text-muted-foreground leading-relaxed">{prod.desc[lang]}</p>}

              {prod.features && (
                <ul className="mt-5 grid grid-cols-2 gap-2">
                  {prod.features[lang].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-brand mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-brand text-brand-foreground font-semibold text-sm shadow-elegant">
                  {tr.inquireNow} <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={`mailto:${contact.email}?subject=${encodeURIComponent(prod.name.en)}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-secondary font-semibold text-sm">
                  <Download className="h-4 w-4" /> {tr.downloadDatasheet}
                </a>
              </div>

              {/* Quick contact strip */}
              <div className="mt-6 grid grid-cols-3 gap-2">
                <a href={`tel:${contact.mobile}`} className="rounded-xl border border-border p-3 hover:bg-secondary transition">
                  <Phone className="h-4 w-4 text-brand" />
                  <div className="text-[10px] text-muted-foreground mt-1.5">Phone</div>
                  <div className="text-xs font-semibold truncate">{contact.mobile}</div>
                </a>
                <a href={`mailto:${contact.email}`} className="rounded-xl border border-border p-3 hover:bg-secondary transition">
                  <Mail className="h-4 w-4 text-brand" />
                  <div className="text-[10px] text-muted-foreground mt-1.5">Email</div>
                  <div className="text-xs font-semibold truncate">{contact.email}</div>
                </a>
                <a href={`https://wa.me/${contact.whatsapp}`} className="rounded-xl border border-border p-3 hover:bg-secondary transition">
                  <MessageCircle className="h-4 w-4 text-brand" />
                  <div className="text-[10px] text-muted-foreground mt-1.5">WhatsApp</div>
                  <div className="text-xs font-semibold truncate">{contact.whatsapp}</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="container-x py-14 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-12">
          {/* Overview */}
          <div>
            <h2 className="text-2xl font-bold font-display flex items-center gap-2">
              <span className="h-7 w-1.5 gradient-brand rounded-full" /> {tr.detailOverview}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{prod.desc?.[lang]}</p>
            {prod.features && (
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {prod.features[lang].map((f) => (
                  <div key={f} className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-secondary/40 to-card border border-border">
                    <div className="h-8 w-8 rounded-lg gradient-brand grid place-items-center text-brand-foreground text-xs font-bold shrink-0">✓</div>
                    <span className="text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Specs */}
          <div>
            <h2 className="text-2xl font-bold font-display flex items-center gap-2">
              <span className="h-7 w-1.5 gradient-brand rounded-full" /> {tr.detailSpecs}
            </h2>
            {prod.specs && prod.specs.length > 0 && (
              <div className="mt-5 rounded-2xl border border-border overflow-hidden shadow-card">
                <table className="w-full text-sm">
                  <tbody>
                    {prod.specs.map((s, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-secondary/30"}>
                        <td className="px-5 py-3 font-medium text-muted-foreground w-1/3 border-b border-border">{s.label[lang]}</td>
                        <td className="px-5 py-3 font-semibold border-b border-border">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Applications */}
          {prod.applications && (
            <div>
              <h2 className="text-2xl font-bold font-display flex items-center gap-2">
                <span className="h-7 w-1.5 gradient-brand rounded-full" /> {tr.detailApps}
              </h2>
              <div className="mt-5 grid sm:grid-cols-2 gap-3">
                {prod.applications[lang].map((a) => (
                  <div key={a} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border shadow-card">
                    <div className="h-8 w-8 rounded-lg gradient-brand grid place-items-center text-brand-foreground text-xs font-bold">★</div>
                    <span className="font-medium text-sm">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Packaging & Shipping */}
          {prod.packaging && (
            <div>
              <h2 className="text-2xl font-bold font-display flex items-center gap-2">
                <span className="h-7 w-1.5 gradient-brand rounded-full" /> {tr.detailPackaging}
              </h2>
              <ul className="mt-5 space-y-2">
                {prod.packaging[lang].map((p, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                    <span className="h-6 w-6 rounded-md bg-brand/10 text-brand grid place-items-center text-xs font-bold shrink-0">{i + 1}</span>
                    <span className="text-sm">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quality */}
          {prod.quality && (
            <div>
              <h2 className="text-2xl font-bold font-display flex items-center gap-2">
                <span className="h-7 w-1.5 gradient-brand rounded-full" /> {tr.detailQuality}
              </h2>
              <div className="mt-5 grid sm:grid-cols-2 gap-3">
                {prod.quality[lang].map((q) => (
                  <div key={q} className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-brand/5 to-card border border-brand/20">
                    <Check className="h-5 w-5 text-brand mt-0.5 shrink-0" />
                    <span className="text-sm font-medium">{q}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Usage Environment */}
          <div>
            <h2 className="text-2xl font-bold font-display flex items-center gap-2">
              <span className="h-7 w-1.5 gradient-brand rounded-full" /> {tr.detailEnvironment}
            </h2>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              {env[lang].map((e) => (
                <div key={e} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                  <Thermometer className="h-5 w-5 text-brand mt-0.5 shrink-0" />
                  <span className="text-sm">{e}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div>
            <h2 className="text-2xl font-bold font-display flex items-center gap-2">
              <span className="h-7 w-1.5 gradient-brand rounded-full" /> {tr.detailKeywords}
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {kws[lang].map((k) => (
                <span key={k} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-xs font-medium border border-border">
                  <Tag className="h-3 w-3 text-brand" /> {k}
                </span>
              ))}
            </div>
          </div>



          {/* Trade info */}
          {prod.trade && (
            <div>
              <h2 className="text-2xl font-bold font-display flex items-center gap-2">
                <span className="h-7 w-1.5 gradient-brand rounded-full" /> {tr.detailTrade}
              </h2>
              <div className="mt-5 grid sm:grid-cols-2 gap-3">
                {prod.trade[lang].map((row) => (
                  <div key={row.k} className="p-4 rounded-xl border border-border bg-card flex flex-col">
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{row.k}</span>
                    <span className="mt-1 font-semibold">{row.v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ */}
          {prod.faq && (
            <div>
              <h2 className="text-2xl font-bold font-display flex items-center gap-2">
                <span className="h-7 w-1.5 gradient-brand rounded-full" /> {tr.detailFAQ}
              </h2>
              <div className="mt-5 space-y-3">
                {prod.faq[lang].map((f, i) => (
                  <details key={i} className="group rounded-xl border border-border bg-card overflow-hidden">
                    <summary className="cursor-pointer list-none p-4 flex items-center justify-between gap-4 hover:bg-secondary/40 transition">
                      <span className="font-semibold text-sm flex items-center gap-3">
                        <span className="h-6 w-6 rounded-md gradient-brand text-brand-foreground grid place-items-center text-xs font-bold">Q</span>
                        {f.q}
                      </span>
                      <span className="text-brand text-xl group-open:rotate-45 transition">+</span>
                    </summary>
                    <div className="px-4 pb-4 text-sm text-muted-foreground pl-13 border-t border-border pt-3">
                      {f.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky inquiry card */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-28 rounded-2xl border border-border bg-card shadow-card overflow-hidden">
            <div className="gradient-hero text-white p-5">
              <div className="text-xs opacity-80">{cat.short[lang]}</div>
              <div className="font-display font-bold text-lg mt-1 line-clamp-2">{prod.name[lang]}</div>
              {prod.tagline && <div className="text-xs opacity-90 mt-1">{prod.tagline[lang]}</div>}
            </div>
            <div className="p-5 space-y-3 text-sm">
              <Row label={lang === "zh" ? "公司" : "Company"} value={contact.company[lang]} />
              <Row label="Email" value={contact.email} href={`mailto:${contact.email}`} />
              <Row label={lang === "zh" ? "手机/WhatsApp" : "Mobile/WhatsApp"} value={contact.mobile} href={`tel:${contact.mobile}`} />
              <Row label="QQ" value={contact.qq} />
              <Row label={lang === "zh" ? "微信" : "WeChat"} value={contact.wechat} />
              <Row label={lang === "zh" ? "网址" : "Website"} value={contact.website} />
              <Link to="/contact" className="block mt-4 text-center px-4 py-2.5 rounded-lg gradient-brand text-brand-foreground font-semibold">
                {tr.inquireNow}
              </Link>
              <a href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Inquiry: " + prod.name.en)}`} className="block text-center px-4 py-2.5 rounded-lg border border-border font-semibold hover:bg-secondary">
                WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </section>


      {/* RELATED */}
      {related.length > 0 && (
        <section className="container-x py-12 border-t border-border">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold font-display">{tr.relatedTitle}</h2>
            <Link to="/products/$categoryId" params={{ categoryId: cat.id }} className="text-sm text-brand font-medium hover:underline">
              {tr.viewAll}
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p) => (
              <Link
                key={p.id}
                to="/products/$categoryId/$productId"
                params={{ categoryId: cat.id, productId: p.id }}
                className="group rounded-2xl bg-card border border-border overflow-hidden shadow-card hover:shadow-elegant hover:-translate-y-1 transition"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <ProductImage product={p} category={cat} className="w-full h-full group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-3">
                  <div className="text-[10px] text-brand font-semibold uppercase">{cat.short.en}</div>
                  <div className="mt-1 text-sm font-semibold line-clamp-2">{p.name[lang]}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}

function Row({ label, value, href }: { label: string; value: string; href?: string }) {
  const Inner = (
    <div className="flex justify-between gap-3">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="font-medium text-right truncate">{value}</span>
    </div>
  );
  return href ? <a href={href} className="block hover:text-brand">{Inner}</a> : Inner;
}
