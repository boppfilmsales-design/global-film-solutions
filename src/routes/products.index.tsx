import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useI18n } from "@/lib/i18n";
import { categories } from "@/data/site";

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
      <section className="gradient-hero text-white py-16">
        <div className="container-x">
          <div className="text-sm opacity-75">{tr.nav.home} / {tr.nav.products}</div>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">{tr.catTitle}</h1>
          <p className="mt-3 opacity-85 max-w-2xl">{tr.catDesc}</p>
        </div>
      </section>
      <section className="container-x py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c, i) => (
          <Link
            key={c.id}
            to="/products/$categoryId"
            params={{ categoryId: c.id }}
            className="group p-6 rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant transition"
          >
            <div className="text-xs font-mono text-muted-foreground">0{i + 1}</div>
            <h3 className="mt-2 font-display font-semibold text-xl">{c.name[lang]}</h3>
            <p className="text-sm text-muted-foreground mt-2">{c.desc[lang]}</p>
            <div className="mt-4 text-brand font-medium text-sm">{c.products.length} {tr.productsIn} →</div>
          </Link>
        ))}
      </section>
    </Layout>
  );
}
