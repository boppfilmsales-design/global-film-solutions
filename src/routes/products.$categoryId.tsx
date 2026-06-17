import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useI18n } from "@/lib/i18n";
import { categories } from "@/data/site";

export const Route = createFileRoute("/products/$categoryId")({
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
  const { cat } = Route.useLoaderData();
  const { lang, tr } = useI18n();

  return (
    <Layout>
      <section className="gradient-hero text-white py-14">
        <div className="container-x">
          <Link to="/products" className="text-sm opacity-75 hover:opacity-100">{tr.backToCategories}</Link>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold">{cat.name[lang]}</h1>
          <p className="mt-3 opacity-85 max-w-3xl">{cat.desc[lang]}</p>
        </div>
      </section>

      <section className="container-x py-12">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/products/$categoryId"
              params={{ categoryId: c.id }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                c.id === cat.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:bg-secondary"
              }`}
            >
              {c.name[lang]}
            </Link>
          ))}
        </div>

        {cat.products.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground border border-dashed border-border rounded-2xl">
            {lang === "zh" ? "产品目录更新中，欢迎来电咨询。" : "Catalog updating — please contact us for details."}
            <div className="mt-4">
              <Link to="/contact" className="text-brand font-medium hover:underline">{tr.nav.contact} →</Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {cat.products.map((p) => (
              <div key={p.id} className="group rounded-2xl bg-card border border-border overflow-hidden shadow-card hover:shadow-elegant transition">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img src={p.img} alt={p.name[lang]} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-4">
                  <div className="text-xs text-brand font-medium uppercase tracking-wide">{cat.id}</div>
                  <div className="mt-1 text-sm font-semibold line-clamp-2">{p.name[lang]}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
