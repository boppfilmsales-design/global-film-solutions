import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { useI18n } from "@/lib/i18n";
import { Calendar } from "lucide-react";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Updates | BOPP Film Sale" },
      { name: "description", content: "Latest news from Anhui Dongjian — capacity, new products, industry insights." },
      { property: "og:title", content: "News & Updates" },
      { property: "og:description", content: "Capacity, new films, and industry insights." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const { lang } = useI18n();
  const items = [
    { d: "2026-04", t: { zh: "新增第 6 条 BOPP 双拉生产线投产", en: "6th BOPP bi-axial line commissioned" }, x: { zh: "幅宽 8.7 米，年增 35,000 吨产能。", en: "8.7 m width, +35,000 t/year capacity." } },
    { d: "2026-02", t: { zh: "通过 FDA 食品接触合规复审", en: "FDA food-contact compliance renewed" }, x: { zh: "覆盖全部 BOPP / BOPET 系列。", en: "Across all BOPP / BOPET grades." } },
    { d: "2025-11", t: { zh: "镀铝 BOPP 高阻隔新规格发布", en: "New high-barrier metallized BOPP grade" }, x: { zh: "OTR ≤ 5 cc/m²·24h，适合零食包装。", en: "OTR ≤ 5 cc/m²·24h — ideal for snacks." } },
    { d: "2025-09", t: { zh: "参展中国国际包装工业展", en: "Exhibited at SinoPack China" }, x: { zh: "展位 W3-A12，迎接全球客户。", en: "Booth W3-A12 — welcomed global buyers." } },
    { d: "2025-06", t: { zh: "扩建华东物流仓", en: "East-China logistics warehouse expansion" }, x: { zh: "上海港 24 小时直达。", en: "24h direct trucking to Shanghai port." } },
  ];
  return (
    <Layout>
      <PageHero
        eyebrow={lang === "zh" ? "新闻动态" : "News"}
        title={lang === "zh" ? "新闻与公告" : "News & Updates"}
        crumbs={[{ label: lang === "zh" ? "首页" : "Home", to: "/" }, { label: lang === "zh" ? "新闻" : "News" }]}
      />
      <section className="container-x py-16 grid md:grid-cols-2 gap-5">
        {items.map((n) => (
          <article key={n.d + n.t.en} className="rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-elegant transition">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" /> {n.d}
            </div>
            <h2 className="mt-2 font-display font-semibold text-lg">{n.t[lang]}</h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{n.x[lang]}</p>
          </article>
        ))}
      </section>
    </Layout>
  );
}
