import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ProductImage } from "@/components/ProductImage";
import { useI18n } from "@/lib/i18n";
import { categories, type Category } from "@/data/site";
import { ArrowRight, Package, Sparkles } from "lucide-react";

export const Route = createFileRoute("/products/$categoryId/")({
  loader: ({ params }) => {
    const cat = categories.find((c) => c.id === params.categoryId);
    if (!cat) throw notFound();
    return { cat: cat as (typeof categories)[number] };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.cat.name.en ?? "Products"} | BOPP Film Sale` },
      { name: "description", content: loaderData?.cat.desc.en ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <Layout>
      <div className="container-x py-32 text-center">
        <h1 className="text-3xl font-bold">404</h1>
        <Link to="/products" className="text-brand hover:underline mt-4 inline-block">← Back to products</Link>
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
  component: CategoryPage,
});

function CategoryPage() {
  const { cat } = Route.useLoaderData() as { cat: Category };
  const { lang, tr } = useI18n();

  return (
    <Layout>
      {/* HERO */}
      <section className="relative gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25 [background:radial-gradient(circle_at_15%_30%,white,transparent_40%),radial-gradient(circle_at_85%_70%,var(--brand-glow),transparent_45%)]" />
        <div className="container-x relative py-16 md:py-20">
          <div className="text-xs opacity-75 flex items-center gap-2">
            <Link to="/" className="hover:opacity-100">{tr.nav.home}</Link>
            <span>/</span>
            <Link to="/products" className="hover:opacity-100">{tr.nav.products}</Link>
            <span>/</span>
            <span className="opacity-100">{cat.short[lang]}</span>
          </div>
          <div className="mt-4 flex items-end justify-between gap-6 flex-wrap">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-3xl font-display">
                <span className="h-12 w-12 rounded-xl bg-white/15 backdrop-blur grid place-items-center border border-white/20">{cat.icon}</span>
                <span className="text-xs uppercase tracking-[0.25em] opacity-75">{cat.short.en}</span>
              </div>
              <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">{cat.name[lang]}</h1>
              <p className="mt-3 opacity-85 text-base md:text-lg">{cat.desc[lang]}</p>
            </div>
            <div className="flex gap-6 text-center">
              <div>
                <div className="text-4xl font-bold font-display">{cat.products.length}</div>
                <div className="text-xs opacity-75 mt-1">{tr.productsIn}</div>
              </div>
              <Link to="/contact" className="self-center px-5 py-2.5 rounded-lg bg-white text-primary font-semibold text-sm shadow-elegant hover:opacity-90">
                {tr.inquireNow}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="container-x py-14 grid grid-cols-12 gap-8">
        {/* SIDEBAR */}
        <aside className="col-span-12 md:col-span-3">
          <div className="sticky top-28 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-2 flex items-center gap-1.5">
              <Package className="h-3.5 w-3.5" /> {tr.catTitle}
            </div>
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/products/$categoryId"
                params={{ categoryId: c.id }}
                className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm transition border ${
                  c.id === cat.id
                    ? "bg-card border-brand text-brand font-semibold shadow-card"
                    : "border-transparent text-foreground/80 hover:bg-secondary"
                }`}
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span className="text-base">{c.icon}</span>
                  <span className="truncate">{c.short[lang]}</span>
                </span>
                <span className="text-[10px] text-muted-foreground shrink-0">{c.products.length}</span>
              </Link>
            ))}
          </div>
        </aside>

        {/* PRODUCT GRID */}
        <div className="col-span-12 md:col-span-9">
          {cat.products.length === 0 ? (
            <div className="py-24 text-center text-muted-foreground border border-dashed border-border rounded-2xl">
              {lang === "zh" ? "产品目录更新中，欢迎来电咨询。" : "Catalog updating — please contact us for details."}
              <div className="mt-4">
                <Link to="/contact" className="text-brand font-medium hover:underline">{tr.nav.contact} →</Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {cat.products.map((p, i) => (
                <Link
                  key={p.id}
                  to="/products/$categoryId/$productId"
                  params={{ categoryId: cat.id, productId: p.id }}
                  className="group relative rounded-2xl bg-card border border-border overflow-hidden shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full bg-background/85 backdrop-blur text-[10px] font-mono text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute top-3 right-3 z-10 h-7 w-7 rounded-full gradient-brand grid place-items-center text-brand-foreground opacity-0 group-hover:opacity-100 transition translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                  <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                    <ProductImage product={p} category={cat} className="w-full h-full group-hover:scale-105 transition duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                  </div>
                  <div className="p-4">
                    <div className="text-[10px] text-brand font-semibold uppercase tracking-widest">{cat.icon} {cat.short.en}</div>
                    <div className="mt-1.5 text-sm font-semibold line-clamp-2 leading-snug min-h-[2.5rem]">{p.name[lang]}</div>
                    {p.tagline && <div className="mt-1 text-xs text-muted-foreground line-clamp-1">{p.tagline[lang]}</div>}
                    {p.specs && p.specs.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border space-y-1">
                        {p.specs.slice(0, 2).map((s, idx) => (
                          <div key={idx} className="flex justify-between gap-2 text-[11px]">
                            <span className="text-muted-foreground truncate">{s.label[lang]}</span>
                            <span className="font-medium text-foreground truncate text-right">{s.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* CTA strip */}
          <div className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-wrap items-center justify-between gap-4 shadow-card">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl gradient-brand grid place-items-center text-brand-foreground">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <div className="font-display font-semibold text-lg">{lang === "zh" ? "未找到合适的规格？" : "Can't find the right spec?"}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{lang === "zh" ? "支持定制厚度、宽度、印刷与复合方案。" : "We customize thickness, width, printing and lamination."}</div>
              </div>
            </div>
            <Link to="/contact" className="px-5 py-2.5 rounded-lg gradient-brand text-brand-foreground font-semibold text-sm shadow-elegant">
              {tr.inquireNow} →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
