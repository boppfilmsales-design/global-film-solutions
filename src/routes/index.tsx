import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Factory, Globe2, Sparkles, Award } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useI18n } from "@/lib/i18n";
import { categories } from "@/data/site";

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
  const featured = categories[0].products.slice(0, 8);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden gradient-hero text-white">
        <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_60%,var(--brand-glow),transparent_50%)]" />
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
                  <img src={p.img} alt={p.name[lang]} className="w-full h-44 object-cover" loading="lazy" />
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
              <div key={w.t} className="p-6 rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant transition group">
                <div className="h-12 w-12 rounded-xl gradient-brand grid place-items-center text-brand-foreground mb-4 group-hover:scale-110 transition">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="font-display font-semibold text-lg">{w.t}</div>
                <p className="text-sm text-muted-foreground mt-2">{w.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-x py-16">
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">{tr.catTitle}</h2>
            <p className="text-muted-foreground mt-2 max-w-xl">{tr.catDesc}</p>
          </div>
          <Link to="/products" className="hidden sm:inline text-sm font-medium text-brand hover:underline">{tr.viewAll}</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((c, i) => (
            <Link
              key={c.id}
              to="/products/$categoryId"
              params={{ categoryId: c.id }}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant transition p-6"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full gradient-brand opacity-10 group-hover:opacity-20 transition" />
              <div className="text-xs font-mono text-muted-foreground">0{i + 1}</div>
              <h3 className="mt-2 font-display font-semibold text-lg leading-snug">{c.name[lang]}</h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{c.desc[lang]}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-brand font-medium">{c.products.length} {tr.productsIn}</span>
                <ArrowRight className="h-4 w-4 text-brand group-hover:translate-x-1 transition" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-secondary/50 py-20">
        <div className="container-x">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">{tr.featTitle}</h2>
            <p className="text-muted-foreground mt-2">{tr.featDesc}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {featured.map((p) => (
              <Link
                key={p.id}
                to="/products/$categoryId"
                params={{ categoryId: "bopp" }}
                className="group rounded-2xl bg-card border border-border overflow-hidden shadow-card hover:shadow-elegant transition"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img src={p.img} alt={p.name[lang]} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-4">
                  <div className="text-xs text-brand font-medium uppercase tracking-wide">BOPP</div>
                  <div className="mt-1 text-sm font-semibold line-clamp-2">{p.name[lang]}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-20">
        <div className="rounded-3xl gradient-hero text-white p-10 md:p-16 shadow-elegant relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_70%_30%,var(--brand-glow),transparent_50%)]" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">{lang === "zh" ? "需要定制方案？" : "Need a custom solution?"}</h2>
              <p className="mt-3 opacity-85">
                {lang === "zh"
                  ? "联系我们获取报价、技术规格书和样品。"
                  : "Contact us for a quote, datasheet and free samples."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/contact" className="px-6 py-3 rounded-lg bg-white text-primary font-semibold shadow-elegant hover:opacity-90">
                {tr.heroCta2}
              </Link>
              <a href="mailto:sale@boppfilmsale.com" className="px-6 py-3 rounded-lg border border-white/30 backdrop-blur hover:bg-white/10 font-semibold">
                sale@boppfilmsale.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
