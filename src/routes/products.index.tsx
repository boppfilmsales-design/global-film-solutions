import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronRight, Package, Search, Sparkles } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useI18n } from "@/lib/i18n";
import {
  taxonomy,
  productsByCat,
  productsBySub,
  allClassified,
  type ClassifiedProduct,
} from "@/data/taxonomy";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — BOPP Film Sale" },
      {
        name: "description",
        content:
          "Browse full product catalog by category: BOPP, BOPET, thermal lamination, coating films, tapes, BOPS, CPP/BOPA, POF/PE/PVC, tear tape, paper, machines, TTR ribbons, glue and more.",
      },
    ],
  }),
  component: ProductsIndex,
});

type Selection = { catId: string | "all"; subId: string | null };

const getCat = (catId: string) => taxonomy.find((c) => c.id === catId);

const getSub = (catId: string, subId: string) => getCat(catId)?.subs.find((s) => s.id === subId);

function ProductCard({ product, lang }: { product: ClassifiedProduct; lang: "zh" | "en" }) {
  const cat = getCat(product.catId);
  const sub = getSub(product.catId, product.subId);
  const categoryPath = lang === "zh"
    ? `${cat?.zh ?? "其他产品"} / ${sub?.zh ?? "其他"}`
    : `${cat?.en ?? "Other Products"} / ${sub?.en ?? "Others"}`;

  return (
    <Link
      to="/p/$slug"
      params={{ slug: product.slug }}
      className="group rounded-xl border border-border overflow-hidden bg-card hover:shadow-elegant hover:-translate-y-0.5 transition"
    >
      <div className="aspect-[4/3] overflow-hidden bg-secondary/30">
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-muted-foreground">
            <Package className="h-8 w-8" />
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="text-[10px] text-brand font-semibold leading-snug line-clamp-2">
          {categoryPath}
        </div>
        <h3 className="mt-1 font-semibold text-sm leading-snug line-clamp-2 group-hover:text-brand min-h-[2.5rem]">
          {product.title}
        </h3>
      </div>
    </Link>
  );
}

function ProductGrid({ products, lang }: { products: ClassifiedProduct[]; lang: "zh" | "en" }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} lang={lang} />
      ))}
    </div>
  );
}

function ProductsIndex() {
  const { lang, tr } = useI18n();
  const [sel, setSel] = useState<Selection>({ catId: "all", subId: null });
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [q, setQ] = useState("");

  const toggle = (id: string) => setOpen((o) => ({ ...o, [id]: !o[id] }));

  const list: ClassifiedProduct[] = useMemo(() => {
    let base: ClassifiedProduct[];
    if (sel.catId === "all") base = allClassified;
    else if (sel.subId) base = productsBySub[sel.subId] ?? [];
    else base = productsByCat[sel.catId] ?? [];
    const needle = q.trim().toLowerCase();
    if (!needle) return base;
    return base.filter(
      (p) =>
        p.title.toLowerCase().includes(needle) ||
        p.keywords.toLowerCase().includes(needle) ||
        p.slug.toLowerCase().includes(needle),
    );
  }, [sel, q]);

  const currentTitle = useMemo(() => {
    if (sel.catId === "all") return { zh: "全部产品", en: "All Products" };
    const cat = taxonomy.find((c) => c.id === sel.catId);
    if (!cat) return { zh: "全部产品", en: "All Products" };
    if (sel.subId) {
      const sub = cat.subs.find((s) => s.id === sel.subId);
      if (sub) return { zh: `${cat.zh} / ${sub.zh}`, en: `${cat.en} / ${sub.en}` };
    }
    return { zh: cat.zh, en: cat.en };
  }, [sel]);

  const catsToRender = useMemo(() => {
    if (sel.subId) return [];
    if (sel.catId === "all") return taxonomy;
    const cat = taxonomy.find((c) => c.id === sel.catId);
    return cat ? [cat] : [];
  }, [sel]);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25 [background:radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_60%,var(--brand-glow),transparent_50%)]" />
        <div className="container-x relative py-14 md:py-20">
          <div className="text-sm opacity-75">
            {tr.nav.home} / {tr.nav.products}
          </div>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold font-display">
            {lang === "zh" ? "产品中心" : "Products"}
          </h1>
          <p className="mt-3 opacity-85 max-w-2xl">
            {lang === "zh"
              ? `共 ${allClassified.length} 款产品，按 ${taxonomy.length} 大类 · ${taxonomy.reduce((a, c) => a + c.subs.length, 0)} 子类精细分类。`
              : `${allClassified.length} products organized into ${taxonomy.length} categories with ${taxonomy.reduce((a, c) => a + c.subs.length, 0)} sub-categories.`}
          </p>
        </div>
      </section>

      <section className="container-x py-10 grid grid-cols-12 gap-6">
        {/* SIDEBAR TREE */}
        <aside className="col-span-12 md:col-span-4 lg:col-span-3">
          <div className="sticky top-24 space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
            <button
              onClick={() => setSel({ catId: "all", subId: null })}
              className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold transition border ${
                sel.catId === "all"
                  ? "bg-brand text-brand-foreground border-brand"
                  : "bg-card border-border hover:bg-secondary"
              }`}
            >
              <span className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                {lang === "zh" ? "全部产品" : "All Products"}
              </span>
              <span className="text-[11px] opacity-80">{allClassified.length}</span>
            </button>

            {taxonomy.map((c) => {
              const isOpen = open[c.id] ?? sel.catId === c.id;
              const total = productsByCat[c.id]?.length ?? 0;
              const active = sel.catId === c.id && !sel.subId;
              return (
                <div key={c.id} className="mt-1">
                  <div className="flex items-stretch">
                    <button
                      onClick={() => toggle(c.id)}
                      aria-label="toggle"
                      className="px-1.5 rounded-l-lg hover:bg-secondary text-muted-foreground"
                    >
                      <ChevronRight
                        className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-90" : ""}`}
                      />
                    </button>
                    <button
                      onClick={() => setSel({ catId: c.id, subId: null })}
                      className={`flex-1 flex items-center justify-between gap-2 px-2 py-2 rounded-r-lg text-sm transition border-l-2 ${
                        active
                          ? "bg-brand/10 border-brand text-brand font-semibold"
                          : "border-transparent hover:bg-secondary"
                      }`}
                    >
                      <span className="flex items-center gap-2 min-w-0 text-left">
                        <span className="text-base shrink-0">{c.icon}</span>
                        <span className="truncate">{lang === "zh" ? c.zh : c.en}</span>
                      </span>
                      <span className="text-[10px] text-muted-foreground shrink-0">{total}</span>
                    </button>
                  </div>
                  {isOpen && (
                    <div className="ml-6 mt-1 space-y-0.5 border-l border-border pl-2">
                      {c.subs.map((s) => {
                        const n = productsBySub[s.id]?.length ?? 0;
                        if (n === 0) return null;
                        const sActive = sel.catId === c.id && sel.subId === s.id;
                        return (
                          <button
                            key={s.id}
                            onClick={() => setSel({ catId: c.id, subId: s.id })}
                            className={`w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-md text-xs transition text-left ${
                              sActive
                                ? "bg-brand text-brand-foreground font-semibold"
                                : "text-foreground/75 hover:bg-secondary"
                            }`}
                          >
                            <span className="truncate">{lang === "zh" ? s.zh : s.en}</span>
                            <span
                              className={`text-[10px] shrink-0 ${sActive ? "opacity-90" : "text-muted-foreground"}`}
                            >
                              {n}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* MAIN */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-brand font-semibold">
                {sel.catId === "all"
                  ? lang === "zh"
                    ? "全部类别"
                    : "All Categories"
                  : lang === "zh"
                    ? "当前分类"
                    : "Current Category"}
              </div>
              <h2 className="mt-1 text-2xl md:text-3xl font-bold font-display">
                {lang === "zh" ? currentTitle.zh : currentTitle.en}
              </h2>
              <div className="mt-1 text-sm text-muted-foreground">
                {list.length} {lang === "zh" ? "款产品" : "products"}
              </div>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={lang === "zh" ? "在当前分类内搜索…" : "Search within…"}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
            </div>
          </div>

          {/* Sub-chip row (when a top-cat is selected) */}
          {sel.catId !== "all" && (
            <div className="mb-5 flex flex-wrap gap-2">
              <button
                onClick={() => setSel({ catId: sel.catId, subId: null })}
                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                  !sel.subId
                    ? "bg-brand text-brand-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/70"
                }`}
              >
                {lang === "zh" ? "全部" : "All"} ({productsByCat[sel.catId]?.length ?? 0})
              </button>
              {taxonomy
                .find((c) => c.id === sel.catId)
                ?.subs.filter((s) => (productsBySub[s.id]?.length ?? 0) > 0)
                .map((s) => {
                  const n = productsBySub[s.id]?.length ?? 0;
                  const active = sel.subId === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSel({ catId: sel.catId, subId: s.id })}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                        active
                          ? "bg-brand text-brand-foreground"
                          : "bg-secondary text-foreground hover:bg-secondary/70"
                      }`}
                    >
                      {lang === "zh" ? s.zh : s.en} ({n})
                    </button>
                  );
                })}
            </div>
          )}

          {list.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground border border-dashed border-border rounded-2xl">
              {lang === "zh" ? "此分类暂无产品。" : "No products in this category."}
            </div>
          ) : sel.subId ? (
            <ProductGrid products={list} lang={lang} />
          ) : (
            <div className="space-y-10">
              {catsToRender.map((cat) => {
                const catProducts = list.filter((p) => p.catId === cat.id);
                if (catProducts.length === 0 && q.trim()) return null;

                return (
                  <section key={cat.id} className="border-t border-border pt-5">
                    <div className="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.2em] text-brand font-semibold">
                          {cat.en}
                        </div>
                        <h3 className="mt-1 text-xl md:text-2xl font-bold font-display">
                          {lang === "zh" ? cat.zh : cat.en}
                        </h3>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {catProducts.length} {lang === "zh" ? "款产品" : "products"}
                      </div>
                    </div>

                    <div className="space-y-6">
                      {cat.subs.map((sub) => {
                        const subProducts = catProducts.filter((p) => p.subId === sub.id);
                        if (subProducts.length === 0 && q.trim()) return null;

                        return (
                          <div key={sub.id} className="pl-3 border-l-2 border-brand/25">
                            <div className="mb-3 flex items-center justify-between gap-3">
                              <button
                                onClick={() => setSel({ catId: cat.id, subId: sub.id })}
                                className="text-left font-semibold text-sm hover:text-brand transition"
                              >
                                {lang === "zh" ? sub.zh : sub.en}
                              </button>
                              <span className="text-xs text-muted-foreground shrink-0">
                                {subProducts.length}
                              </span>
                            </div>
                            {subProducts.length > 0 ? (
                              <ProductGrid products={subProducts} lang={lang} />
                            ) : (
                              <div className="py-5 text-sm text-muted-foreground border border-dashed border-border rounded-xl text-center">
                                {lang === "zh" ? "该子分类暂无产品" : "No products in this sub-category"}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          )}

          <div className="mt-10 rounded-2xl border border-border bg-card p-5 flex flex-wrap items-center justify-between gap-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg gradient-brand grid place-items-center text-brand-foreground">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">
                  {lang === "zh" ? "未找到合适的规格？" : "Need a custom spec?"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {lang === "zh"
                    ? "支持定制厚度、宽度、印刷与复合。"
                    : "We customize thickness, width, printing and lamination."}
                </div>
              </div>
            </div>
            <Link
              to="/contact"
              className="px-4 py-2 rounded-lg gradient-brand text-brand-foreground font-semibold text-sm shadow-elegant"
            >
              {tr.inquireNow} →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
