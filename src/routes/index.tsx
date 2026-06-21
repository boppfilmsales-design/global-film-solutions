import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Factory, Globe2, Sparkles, Award, Mail, Phone, MessageCircle, Layers } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductImage } from "@/components/ProductImage";
import { useI18n } from "@/lib/i18n";
import { categories, contact } from "@/data/site";
import { catalog } from "@/data/catalog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BOPP Film Sale — Anhui Dongjian | 安徽东渐 软包装薄膜供应商" },
      { name: "description", content: "BOPP, BOPET, POF, coated films, adhesive tapes, ribbons and labels. Global flexible packaging supplier from Anhui Dongjian." },
      { property: "og:title", content: "BOPP Film Sale — Anhui Dongjian" },
      { property: "og:description", content: "High-performance films and one-stop flexible packaging solutions." },
    ],
  }),
  component: Index,
});

function Index() {
  const { lang, tr } = useI18n();
  const bopp = categories[0];
  const bopet = categories[1];
  const featured = bopp.products.slice(0, 8);
  const catalogPicks = catalog.filter((p) => p.images && p.images.length > 0).slice(0, 16);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden gradient-hero text-white">
        <div className="absolute inset-0 opacity-25 [background:radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_60%,var(--brand-glow),transparent_50%)]" />
        <div className="container-x relative py-24 md:py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-medium border border-white/20">
              <Sparkles className="h-3 w-3" /> {tr.heroEyebrow}
            </div>
            <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-[1.05]">{tr.heroTitle}</h1>
            <p className="mt-5 text-lg opacity-85 max-w-xl">{tr.heroDesc}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-white/90 transition shadow-elegant">
                {tr.heroCta1} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/30 backdrop-blur hover:bg-white/10 font-semibold transition">
                {tr.heroCta2}
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-4 gap-4 max-w-xl">
              {tr.stats.map((s) => (
                <div key={s.v}>
                  <div className="text-2xl md:text-3xl font-bold font-display">{s.k}</div>
                  <div className="text-xs opacity-75 mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {featured.slice(0, 4).map((p, i) => (
                <div
                  key={p.id}
                  className={`rounded-2xl overflow-hidden bg-white/10 backdrop-blur border border-white/20 shadow-elegant ${i % 2 ? "translate-y-8" : ""}`}
                >
                  <ProductImage product={p} category={categories[0]} className="w-full h-44" />
                  <div className="p-3 text-xs font-medium">{p.name[lang]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="container-x py-20">
        <div className="grid md:grid-cols-4 gap-6">
          {tr.why.map((w, i) => {
            const Icon = [Factory, Globe2, Award, CheckCircle2][i];
            return (
              <div key={w.t} className="p-6 rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 group">
                <div className="h-12 w-12 rounded-xl gradient-brand grid place-items-center text-brand-foreground mb-4 group-hover:scale-110 transition shadow-elegant">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="font-display font-semibold text-lg">{w.t}</div>
                <p className="text-sm text-muted-foreground mt-2">{w.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CATEGORIES — BENTO */}
      <section className="container-x py-16">
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Catalog</div>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold font-display">{tr.catTitle}</h2>
            <p className="text-muted-foreground mt-2 max-w-xl">{tr.catDesc}</p>
          </div>
          <Link to="/products" className="hidden sm:inline text-sm font-medium text-brand hover:underline">{tr.viewAll}</Link>
        </div>
        <div className="grid grid-cols-12 gap-5 auto-rows-[160px]">
          {categories.slice(0, 8).map((c, i) => {
            const big = i === 0;
            const wide = i === 3 || i === 6;
            const span = big
              ? "col-span-12 md:col-span-6 md:row-span-2"
              : wide
              ? "col-span-12 md:col-span-6 md:row-span-1"
              : "col-span-6 md:col-span-3 md:row-span-1";
            const coverProd = c.products[0];
            return (
              <Link
                key={c.id}
                to="/products/$categoryId"
                params={{ categoryId: c.id }}
                className={`group relative ${span} rounded-3xl overflow-hidden border border-border bg-card shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-300`}
              >
                {coverProd && (
                  <>
                    <ProductImage product={coverProd} category={c} className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-80 group-hover:scale-105 transition duration-700" showLabel={false} />
                    <div className="absolute inset-0 bg-gradient-to-br from-card/95 via-card/75 to-card/40" />
                  </>
                )}
                <div className="relative h-full p-5 flex flex-col">
                  <div className="flex items-start justify-between">
                    <div className="h-10 w-10 rounded-xl gradient-brand grid place-items-center text-brand-foreground font-bold shadow-elegant">{c.icon}</div>
                    <div className="text-[10px] font-mono text-muted-foreground">0{i + 1}</div>
                  </div>
                  <div className="mt-auto">
                    <h3 className="font-display font-bold text-base md:text-lg leading-tight line-clamp-2">{c.name[lang]}</h3>
                    {big && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{c.desc[lang]}</p>}
                    <div className="mt-2 text-xs text-brand font-semibold flex items-center justify-between">
                      <span>{c.products.length} {tr.productsIn}</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED PRODUCTS — TILTED CARDS */}
      <section className="bg-gradient-to-b from-secondary/40 to-background py-24 border-y border-border">
        <div className="container-x">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Bestsellers</div>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold font-display">{tr.featTitle}</h2>
              <p className="text-muted-foreground mt-2">{tr.featDesc}</p>
            </div>
            <Link to="/products/$categoryId" params={{ categoryId: "bopp" }} className="hidden sm:inline text-sm text-brand font-medium hover:underline">{tr.viewAll}</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {featured.map((p, i) => (
              <Link
                key={p.id}
                to="/products/$categoryId/$productId"
                params={{ categoryId: "bopp", productId: p.id }}
                className={`group relative rounded-2xl bg-card border border-border overflow-hidden shadow-card hover:shadow-elegant hover:-translate-y-2 transition-all duration-300 ${i % 2 ? "md:translate-y-4" : ""}`}
              >
                <div className="aspect-square overflow-hidden bg-muted relative">
                  <ProductImage product={p} category={categories[0]} className="w-full h-full group-hover:scale-105 transition duration-700" />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-background/90 backdrop-blur text-[10px] font-mono">#{String(i + 1).padStart(2, "0")}</div>
                  <div className="absolute bottom-2 right-2 h-7 w-7 rounded-full gradient-brand grid place-items-center text-brand-foreground opacity-0 group-hover:opacity-100 transition">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-[10px] text-brand font-semibold uppercase tracking-widest">BOPP</div>
                  <div className="mt-1 text-sm font-semibold line-clamp-2">{p.name[lang]}</div>
                  {p.tagline && <div className="mt-1 text-[11px] text-muted-foreground line-clamp-1">{p.tagline[lang]}</div>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG CAROUSEL — direct shortcut to /catalog */}
      <section className="container-x py-20">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Full Catalog · 540+</div>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold font-display">
              {lang === "zh" ? "精选产品速览" : "Featured Picks from the Catalog"}
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              {lang === "zh"
                ? "浏览全部 540+ 款产品，支持关键词搜索与分类筛选。"
                : "Browse all 540+ items with instant search and category filters."}
            </p>
          </div>
          <Link
            to="/catalog"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-brand text-brand-foreground font-semibold text-sm shadow-elegant"
          >
            <Layers className="h-4 w-4" />
            {lang === "zh" ? "进入完整目录" : "Open Full Catalog"}
          </Link>
        </div>
        <Carousel opts={{ align: "start", loop: true }} className="relative">
          <CarouselContent className="-ml-3">
            {catalogPicks.map((p) => (
              <CarouselItem key={p.slug} className="pl-3 basis-1/2 md:basis-1/4 lg:basis-1/5">
                <Link
                  to="/p/$slug"
                  params={{ slug: p.slug }}
                  className="group block rounded-2xl bg-card border border-border overflow-hidden shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden bg-muted relative">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />
                  </div>
                  <div className="p-3">
                    <div className="text-xs font-semibold line-clamp-2 leading-snug">{p.title}</div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>
        <div className="mt-6 sm:hidden">
          <Link to="/catalog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-brand text-brand-foreground font-semibold text-sm shadow-elegant">
            <Layers className="h-4 w-4" />
            {lang === "zh" ? "进入完整目录" : "Open Full Catalog"}
          </Link>
        </div>
      </section>


      {/* PROCESS */}
      <section className="container-x py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Process</div>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold font-display">{tr.processTitle}</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-5 relative">
          <div className="hidden md:block absolute top-12 left-12 right-12 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
          {tr.process.map((p, i) => (
            <div key={p.t} className="relative rounded-2xl bg-card border border-border p-6 shadow-card hover:shadow-elegant transition">
              <div className="h-12 w-12 rounded-full gradient-brand grid place-items-center text-brand-foreground font-bold font-display text-lg shadow-elegant relative z-10">
                {i + 1}
              </div>
              <div className="font-display font-semibold mt-4">{p.t}</div>
              <p className="text-sm text-muted-foreground mt-2">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOPET FEATURE STRIP */}
      <section className="container-x pb-24">
        <div className="rounded-3xl overflow-hidden border border-border bg-card shadow-card grid md:grid-cols-2 gap-0">
          <div className="aspect-[4/3] md:aspect-auto relative bg-muted">
            {bopet.products[0] && <ProductImage product={bopet.products[0]} category={bopet} className="w-full h-full" showLabel={false} />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-background/90 backdrop-blur text-xs font-semibold">{bopet.icon} {bopet.short[lang]}</div>
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Spotlight</div>
            <h2 className="mt-2 text-2xl md:text-4xl font-bold font-display">{bopet.name[lang]}</h2>
            <p className="text-muted-foreground mt-4">{bopet.desc[lang]}</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {bopet.products.slice(0, 4).map((p) => (
                <Link key={p.id} to="/products/$categoryId/$productId" params={{ categoryId: bopet.id, productId: p.id }} className="text-sm font-medium px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/70 transition">
                  {p.name[lang]}
                </Link>
              ))}
            </div>
            <Link to="/products/$categoryId" params={{ categoryId: bopet.id }} className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-brand text-brand-foreground font-semibold text-sm w-fit shadow-elegant">
              {tr.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-secondary/40 py-24 border-y border-border">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Industries</div>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold font-display">{tr.industries}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {tr.industryList.map((it) => (
              <div key={it.t} className="rounded-2xl bg-card border border-border p-6 shadow-card hover:shadow-elegant transition">
                <div className="font-display font-semibold text-lg">{it.t}</div>
                <p className="text-sm text-muted-foreground mt-2">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-24">
        <div className="rounded-3xl gradient-hero text-white p-10 md:p-16 shadow-elegant relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_70%_30%,var(--brand-glow),transparent_50%)]" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold font-display">{lang === "zh" ? "需要定制方案？" : "Need a custom solution?"}</h2>
              <p className="mt-3 opacity-85 text-lg">
                {lang === "zh" ? "联系我们获取报价、技术规格书和样品。" : "Contact us for a quote, datasheet and free samples."}
              </p>
              <div className="mt-6 grid sm:grid-cols-3 gap-2.5">
                <a href={`tel:${contact.mobile}`} className="rounded-xl border border-white/20 bg-white/10 backdrop-blur p-3 hover:bg-white/20 transition">
                  <Phone className="h-4 w-4" />
                  <div className="text-[10px] opacity-75 mt-1.5">Phone</div>
                  <div className="text-xs font-semibold truncate">{contact.mobile}</div>
                </a>
                <a href={`mailto:${contact.email}`} className="rounded-xl border border-white/20 bg-white/10 backdrop-blur p-3 hover:bg-white/20 transition">
                  <Mail className="h-4 w-4" />
                  <div className="text-[10px] opacity-75 mt-1.5">Email</div>
                  <div className="text-xs font-semibold truncate">{contact.email}</div>
                </a>
                <a href={`https://wa.me/${contact.whatsapp}`} className="rounded-xl border border-white/20 bg-white/10 backdrop-blur p-3 hover:bg-white/20 transition">
                  <MessageCircle className="h-4 w-4" />
                  <div className="text-[10px] opacity-75 mt-1.5">WhatsApp</div>
                  <div className="text-xs font-semibold truncate">{contact.whatsapp}</div>
                </a>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/contact" className="px-6 py-3 rounded-lg bg-white text-primary font-semibold shadow-elegant hover:opacity-90">
                {tr.heroCta2}
              </Link>
              <Link to="/products" className="px-6 py-3 rounded-lg border border-white/30 backdrop-blur hover:bg-white/10 font-semibold">
                {tr.heroCta1}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
