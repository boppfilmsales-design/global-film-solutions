import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Industry Solutions | BOPP Film Sale" },
      { name: "description", content: "Packaging film solutions for food, pharmaceutical, electronics, industrial and labeling industries." },
      { property: "og:title", content: "Industry Solutions" },
      { property: "og:description", content: "Tailored BOPP / BOPET solutions for every industry." },
    ],
  }),
  component: SolutionsIndex,
});

function SolutionsIndex() {
  const { lang } = useI18n();
  const items = [
    { id: "food", t: { zh: "食品包装", en: "Food Packaging" }, d: { zh: "干食、糖果、烘焙、冷冻、奶制品的高阻隔包装方案。", en: "High-barrier packaging for dry food, candy, bakery, frozen and dairy." } },
    { id: "pharma", t: { zh: "医药包装", en: "Pharmaceutical" }, d: { zh: "通过 USP / EP / 中国药典的医药级薄膜。", en: "Pharma-grade films meeting USP / EP / ChP." } },
    { id: "electronics", t: { zh: "电子电气", en: "Electronics" }, d: { zh: "电容器、变压器、太阳能背板基膜。", en: "Capacitor, transformer and solar back-sheet base films." } },
    { id: "industrial", t: { zh: "工业与建材", en: "Industrial & Building" }, d: { zh: "胶带基材、保护膜、复合用基膜。", en: "Tape carrier, protective and laminate base films." } },
  ];
  return (
    <Layout>
      <PageHero
        eyebrow={lang === "zh" ? "解决方案" : "Solutions"}
        title={lang === "zh" ? "行业解决方案" : "Industry Solutions"}
        desc={lang === "zh" ? "针对不同行业的工艺要求，我们提供量身定制的薄膜与包装组合。" : "Tailored film and packaging combinations for every industry."}
        crumbs={[{ label: lang === "zh" ? "首页" : "Home", to: "/" }, { label: lang === "zh" ? "解决方案" : "Solutions" }]}
      />
      <section className="container-x py-16 grid md:grid-cols-2 gap-5">
        {items.map((i) => (
          <Link key={i.id} to="/solutions/$slug" params={{ slug: i.id }} className="group rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all">
            <div className="font-display font-semibold text-xl group-hover:text-brand transition">{i.t[lang]}</div>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{i.d[lang]}</p>
            <div className="mt-4 text-xs text-brand font-semibold">{lang === "zh" ? "查看详情 →" : "Read more →"}</div>
          </Link>
        ))}
      </section>
    </Layout>
  );
}
