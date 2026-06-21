import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { catalog, catalogCategories } from "@/data/catalog";
import { categories } from "@/data/site";

const BASE_URL = "https://sleek-replica-hub.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = ["/", "/about", "/contact", "/products", "/catalog"];
        const catPaths = categories.map((c) => `/products/${c.id}`);
        const prodPaths = categories.flatMap((c) =>
          c.products.map((p) => `/products/${c.id}/${p.id}`),
        );
        const catalogCatPaths = catalogCategories.map((c) => `/catalog?cat=${c.id}`);
        const slugPaths = catalog.map((p) => `/p/${p.slug}`);

        const all = [
          ...staticPaths.map((p) => ({ path: p, priority: "1.0", changefreq: "weekly" })),
          ...catPaths.map((p) => ({ path: p, priority: "0.8", changefreq: "weekly" })),
          ...catalogCatPaths.map((p) => ({ path: p, priority: "0.7", changefreq: "weekly" })),
          ...prodPaths.map((p) => ({ path: p, priority: "0.7", changefreq: "monthly" })),
          ...slugPaths.map((p) => ({ path: p, priority: "0.6", changefreq: "monthly" })),
        ];

        const urls = all
          .map(
            (e) =>
              `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
