import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, Mail, MessageCircle, Phone, Globe, ArrowLeft, Package } from "lucide-react";
import { Layout } from "@/components/Layout";
import { getCatalogProduct, catalog, type CatalogProduct } from "@/data/catalog";
import { contact } from "@/data/site";

export const Route = createFileRoute("/p/$slug")({
  loader: ({ params }) => {
    const product = getCatalogProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Product — BOPP Film Sale" }] };
    const title = `${p.title} — BOPP Film Sale`;
    const desc = (p.metaDesc || p.body || p.title).slice(0, 155);
    const img = p.images[0];
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: p.keywords },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        ...(img ? [{ property: "og:image", content: img }] : []),
        { property: "og:url", content: `https://sleek-replica-hub.lovable.app/p/${p.slug}` },
      ],
      links: [{ rel: "canonical", href: `https://sleek-replica-hub.lovable.app/p/${p.slug}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.title,
          image: p.images,
          description: desc,
          brand: { "@type": "Brand", name: "Anhui Dongjian / BOPP Film Sale" },
        }),
      }],
    };
  },
  notFoundComponent: () => (
    <Layout>
      <div className="container-x py-24 text-center">
        <h1 className="text-3xl font-display font-bold">Product not found</h1>
        <Link to="/catalog" className="text-brand mt-4 inline-block">Back to catalog</Link>
      </div>
    </Layout>
  ),
  errorComponent: ({ error }) => (
    <Layout>
      <div className="container-x py-24 text-center text-destructive">{String(error)}</div>
    </Layout>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData() as { product: CatalogProduct };
  const [activeImg, setActiveImg] = useState(0);

  // Related products (same prefix from slug)
  const prefix = product.slug.split("-")[0];
  const related = catalog.filter((p) => p.slug !== product.slug && p.slug.startsWith(prefix)).slice(0, 6);

  // Split body into paragraphs
  const paragraphs = product.body
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 4);

  return (
    <Layout>
      {/* Breadcrumbs */}
      <div className="border-b border-border/40 bg-secondary/30">
        <div className="container-x py-4 text-sm flex items-center gap-2 text-muted-foreground">
          <Link to="/" className="hover:text-brand">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/catalog" className="hover:text-brand">Catalog</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground truncate">{product.title}</span>
        </div>
      </div>

      <div className="container-x py-10 grid lg:grid-cols-12 gap-10">
        {/* Gallery */}
        <div className="lg:col-span-6">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-secondary/40 shadow-elegant">
            {product.images[activeImg] ? (
              <img
                src={product.images[activeImg]}
                alt={product.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full grid place-items-center text-muted-foreground"><Package className="h-16 w-16" /></div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-3">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                    i === activeImg ? "border-brand shadow-elegant" : "border-border hover:border-brand/50"
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lg:col-span-6">
          <div className="text-xs uppercase tracking-widest text-brand font-semibold">Product</div>
          <h1 className="mt-2 text-3xl md:text-4xl font-display font-bold leading-tight">{product.title}</h1>
          {product.keywords && product.keywords !== product.title && (
            <p className="mt-3 text-muted-foreground">{product.keywords}</p>
          )}

          {/* Quick contact */}
          <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-5">
            <div className="text-sm font-semibold mb-3">Quick Inquiry · 快速询价</div>
            <div className="grid grid-cols-2 gap-2">
              <a href={`https://wa.me/86${contact.mobile}?text=${encodeURIComponent("Inquiry: " + product.title)}`}
                 className="flex items-center justify-center gap-2 rounded-lg bg-brand text-brand-foreground px-3 py-2.5 text-sm font-semibold hover:opacity-90">
                <Phone className="h-4 w-4" /> WhatsApp
              </a>
              <a href={`mailto:${contact.email}?subject=${encodeURIComponent("Inquiry: " + product.title)}`}
                 className="flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-semibold hover:bg-secondary">
                <Mail className="h-4 w-4" /> Email
              </a>
              <a href={`mailto:${contact.email2}?subject=${encodeURIComponent("Inquiry: " + product.title)}`}
                 className="flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5 text-sm hover:bg-secondary">
                <Mail className="h-4 w-4" /> {contact.email2}
              </a>
              <span className="flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5 text-sm">
                <MessageCircle className="h-4 w-4" /> QQ {contact.qq}
              </span>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              WeChat / Mobile: <strong>{contact.mobile}</strong> · Website: <a href={`https://${contact.website}`} className="text-brand">{contact.website}</a>
            </div>
          </div>

          {/* Specs */}
          {product.specs.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-display font-semibold mb-3">Technical Specifications · 技术参数</h2>
              <div className="rounded-2xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {product.specs.map((s, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-secondary/30"}>
                        <td className="px-4 py-2.5 font-medium text-foreground/80 w-1/3 border-r border-border">{s.k}</td>
                        <td className="px-4 py-2.5">{s.v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full description */}
      {paragraphs.length > 0 && (
        <section className="border-t border-border/40 bg-secondary/20">
          <div className="container-x py-12">
            <h2 className="text-2xl font-display font-bold mb-6">Product Details · 产品详细说明</h2>
            <div className="prose prose-neutral dark:prose-invert max-w-3xl space-y-3">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-foreground/85 leading-relaxed whitespace-pre-line">{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="container-x py-12">
          <h2 className="text-2xl font-display font-bold mb-6">Related Products · 相关产品</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link key={r.slug} to="/p/$slug" params={{ slug: r.slug }}
                    className="group rounded-2xl border border-border overflow-hidden bg-background hover:shadow-elegant transition">
                <div className="aspect-[4/3] overflow-hidden bg-secondary/30">
                  {r.images[0] && (
                    <img src={r.images[0]} alt={r.title} loading="lazy"
                         className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-brand">{r.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="container-x pb-16">
        <Link to="/catalog" className="inline-flex items-center gap-2 text-brand hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to full catalog
        </Link>
      </div>
    </Layout>
  );
}
