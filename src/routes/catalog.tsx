import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Package } from "lucide-react";
import { Layout } from "@/components/Layout";
import { catalog, catalogCategories } from "@/data/catalog";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Full Product Catalog — BOPP Film Sale" },
      { name: "description", content: `Browse ${540} BOPP / BOPET films, adhesive tapes, coating films, intermediates and more. Each product has its own page with specs and images.` },
      { property: "og:title", content: "Full Product Catalog — BOPP Film Sale" },
      { property: "og:url", content: "https://sleek-replica-hub.lovable.app/catalog" },
    ],
    links: [{ rel: "canonical", href: "https://sleek-replica-hub.lovable.app/catalog" }],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  const [q, setQ] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("q") ?? "";
  });
  const [cat, setCat] = useState<string>("all");

  const filtered = useMemo(() => {
    const list = cat === "all" ? catalog : catalogCategories.find((c) => c.id === cat)?.products ?? [];
    if (!q.trim()) return list;
    const needle = q.toLowerCase();
    return list.filter((p) =>
      p.title.toLowerCase().includes(needle) ||
      p.keywords.toLowerCase().includes(needle) ||
      p.slug.toLowerCase().includes(needle)
    );
  }, [q, cat]);

  return (
    <Layout>
      <section className="border-b border-border/40 bg-gradient-to-br from-secondary/40 via-background to-background">
        <div className="container-x py-14">
          <div className="text-xs uppercase tracking-widest text-brand font-semibold">Catalog</div>
          <h1 className="mt-2 text-4xl md:text-5xl font-display font-bold">All Products</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            {catalog.length} products — each with its own indexable page including specifications and images.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name or keyword"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
            </div>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand/40"
            >
              <option value="all">All Categories ({catalog.length})</option>
              {catalogCategories.map((c) => (
                <option key={c.id} value={c.id}>{c.en} ({c.products.length})</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Category chips */}
      <div className="border-b border-border/40 bg-background/80">
        <div className="container-x py-4 flex flex-wrap gap-2">
          <button onClick={() => setCat("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${cat === "all" ? "bg-brand text-brand-foreground" : "bg-secondary text-foreground hover:bg-secondary/70"}`}>
            All ({catalog.length})
          </button>
          {catalogCategories.map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${cat === c.id ? "bg-brand text-brand-foreground" : "bg-secondary text-foreground hover:bg-secondary/70"}`}>
              {c.en} ({c.products.length})
            </button>
          ))}
        </div>
      </div>

      <section className="container-x py-10">
        <div className="text-sm text-muted-foreground mb-4">{filtered.length} results</div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <Link key={p.slug} to="/p/$slug" params={{ slug: p.slug }}
                  className="group rounded-2xl border border-border overflow-hidden bg-background hover:shadow-elegant hover:-translate-y-0.5 transition">
              <div className="aspect-[4/3] overflow-hidden bg-secondary/30">
                {p.images[0] ? (
                  <img src={p.images[0]} alt={p.title} loading="lazy"
                       className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                ) : (
                  <div className="w-full h-full grid place-items-center text-muted-foreground"><Package className="h-10 w-10" /></div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-brand min-h-[2.5rem]">{p.title}</h3>
                {p.specs.length > 0 && (
                  <div className="mt-2 text-[11px] text-muted-foreground">{p.specs.length} specs</div>
                )}
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">No matching products.</div>
        )}
      </section>
    </Layout>
  );
}
