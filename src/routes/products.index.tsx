import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ProductImage } from "@/components/ProductImage";
import { useI18n } from "@/lib/i18n";
import { categories } from "@/data/site";
import { ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — BOPP Film Sale | 产品中心" },
      { name: "description", content: "Full catalog: BOPP, BOPET, POF, coated films, adhesive tapes, ribbons, labels, machinery and more." },
    ],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  const { lang, tr } = useI18n();
  return (
    <Layout>
      <section className="relative gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25 [background:radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_60%,var(--brand-glow),transparent_50%)]" />
        <div className="container-x relative py-20">
          <div className="text-sm opacity-75">{tr.nav.home} / {tr.nav.products}</div>
          <h1 className="mt-2 text-4xl md:text-6xl font-bold font-display">{tr.catTitle}</h1>
          <p className="mt-4 opacity-85 max-w-2xl text-lg">{tr.catDesc}</p>
          <div className="mt-6 flex gap-6 text-sm">
            <div><span className="font-bold text-2xl">{categories.length}</span> <span className="opacity-75 ml-1">{lang === "zh" ? "大类" : "categories"}</span></div>
            <div><span className="font-bold text-2xl">{categories.reduce((a, c) => a + c.products.length, 0)}</span> <span className="opacity-75 ml-1">{tr.productsIn}</span></div>
          </div>
        </div>
      </section>

      {/* BENTO GRID */}
      <section className="container-x py-16 grid grid-cols-12 gap-5 auto-rows-[180px]">
        {categories.map((c, i) => {
          // Bento: alternate spans for visual rhythm
          const big = i === 0 || i === 3 || i === 6;
          const wide = i === 1 || i === 4;
          const span = big
            ? "md:col-span-6 md:row-span-2"
            : wide
            ? "md:col-span-6 md:row-span-1"
            : "md:col-span-4 md:row-span-1";
          const cover = c.products[0]?.img;
          return (
            <Link
              key={c.id}
              to="/products/$categoryId"
              params={{ categoryId: c.id }}
              className={`group relative col-span-12 ${span} rounded-3xl overflow-hidden border border-border bg-card shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-300`}
            >
              {cover && (
                <>
                  <img src={cover} alt={c.name[lang]} loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-40 group-hover:scale-110 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-br from-card/95 via-card/85 to-card/70" />
                </>
              )}
              <div className="relative h-full p-6 flex flex-col">
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-2xl gradient-brand grid place-items-center text-brand-foreground text-xl font-bold shadow-elegant">
                    {c.icon}
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground">0{i + 1}</div>
                </div>
                <div className="mt-auto">
                  <h3 className="font-display font-bold text-lg md:text-xl leading-tight">{c.name[lang]}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1.5 line-clamp-2">{c.desc[lang]}</p>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="inline-flex items-center gap-1.5 text-brand font-semibold">
                      <Sparkles className="h-3.5 w-3.5" /> {c.products.length} {tr.productsIn}
                    </span>
                    <ArrowRight className="h-4 w-4 text-brand group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      {/* ALL PRODUCTS BY CATEGORY */}
      <section className="bg-secondary/40 py-16 border-y border-border">
        <div className="container-x space-y-14">
          {categories.filter((c) => c.products.length > 0).map((c) => (
            <div key={c.id}>
              <div className="flex items-end justify-between gap-4 mb-5">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-brand font-semibold">{c.icon} {c.short.en}</div>
                  <h2 className="mt-1 text-2xl md:text-3xl font-bold font-display">{c.name[lang]}</h2>
                </div>
                <Link to="/products/$categoryId" params={{ categoryId: c.id }} className="text-sm text-brand font-medium hover:underline whitespace-nowrap">
                  {tr.viewAll}
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {c.products.slice(0, 6).map((p) => (
                  <Link
                    key={p.id}
                    to="/products/$categoryId/$productId"
                    params={{ categoryId: c.id, productId: p.id }}
                    className="group rounded-xl bg-card border border-border overflow-hidden shadow-card hover:shadow-elegant transition"
                  >
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img src={p.img} alt={p.name[lang]} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    </div>
                    <div className="p-2">
                      <div className="text-[11px] font-semibold line-clamp-2 leading-tight">{p.name[lang]}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
