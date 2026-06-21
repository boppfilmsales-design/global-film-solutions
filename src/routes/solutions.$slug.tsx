import { createFileRoute, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { useI18n } from "@/lib/i18n";
import { CheckCircle2 } from "lucide-react";

const DATA: Record<string, {
  title: { zh: string; en: string };
  desc: { zh: string; en: string };
  bullets: { zh: string; en: string }[];
  products: string[];
}> = {
  food: {
    title: { zh: "食品包装方案", en: "Food Packaging Solutions" },
    desc: { zh: "面向糖果、烘焙、休闲食品、冷冻品、奶制品等场景的高阻隔、高透明、可热封薄膜。", en: "High-barrier, high-clarity, heat-sealable films for candy, bakery, snacks, frozen and dairy." },
    bullets: [
      { zh: "镀铝 BOPP / BOPET 高阻氧阻湿", en: "Metallized BOPP / BOPET for oxygen & moisture barrier" },
      { zh: "热封层 BOPP 单面 / 双面热封", en: "Heat-seal BOPP — single / both sides" },
      { zh: "高透扭结 BOPP，糖果包装首选", en: "High-clarity twist BOPP for candy wrap" },
      { zh: "FDA & EU 10/2011 食品接触合规", en: "FDA & EU 10/2011 food-contact compliant" },
    ],
    products: ["bopp", "bopet"],
  },
  pharma: {
    title: { zh: "医药包装方案", en: "Pharmaceutical Solutions" },
    desc: { zh: "医药铝塑泡罩、药品外包装、说明书复合用 BOPP / BOPET 基膜。", en: "Base films for blister, secondary pharma packs and leaflet lamination." },
    bullets: [
      { zh: "符合 USP <661> / EP / 中国药典", en: "USP <661> / EP / ChP compliant" },
      { zh: "低析出、低 NVR 残留", en: "Low extractables, low NVR" },
      { zh: "可印刷、可复合、抗静电选项", en: "Printable, laminable, anti-static options" },
    ],
    products: ["bopp", "bopet"],
  },
  electronics: {
    title: { zh: "电子电气方案", en: "Electronics Solutions" },
    desc: { zh: "电容器基膜、变压器绝缘膜、太阳能背板、屏幕保护膜。", en: "Capacitor, transformer insulation, solar back-sheet and screen protector films." },
    bullets: [
      { zh: "电容器 BOPP 高介电低损耗", en: "Capacitor BOPP — high dielectric, low loss" },
      { zh: "太阳能背板基膜耐 UV、耐水解", en: "Solar back-sheet base — UV & hydrolysis resistant" },
      { zh: "光学级 BOPET 雾度 ≤ 1%", en: "Optical-grade BOPET, haze ≤ 1%" },
    ],
    products: ["bopp", "bopet"],
  },
  industrial: {
    title: { zh: "工业与胶带方案", en: "Industrial & Tape Solutions" },
    desc: { zh: "BOPP 胶带基材、保护膜、复合用基膜、纤维增强带基。", en: "BOPP tape carrier, protective films and laminate base films." },
    bullets: [
      { zh: "高强度胶带基材 12–60 μm", en: "High-strength tape carrier, 12–60 μm" },
      { zh: "电晕处理 ≥ 38 dyne 长效", en: "Corona ≥ 38 dyne, long-term stable" },
      { zh: "可配溶剂型、热熔、丙烯酸胶系", en: "Compatible with solvent, hot-melt, acrylic adhesives" },
    ],
    products: ["bopp", "tape"],
  },
};

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const item = DATA[params.slug];
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => loaderData
    ? {
        meta: [
          { title: `${loaderData.title.en} | BOPP Film Sale` },
          { name: "description", content: loaderData.desc.en },
          { property: "og:title", content: loaderData.title.en },
          { property: "og:description", content: loaderData.desc.en },
        ],
      }
    : {},
  component: SolutionDetail,
  notFoundComponent: () => <Layout><div className="container-x py-24 text-center">Not Found</div></Layout>,
  errorComponent: () => <Layout><div className="container-x py-24 text-center">Error</div></Layout>,
});

function SolutionDetail() {
  const data = Route.useLoaderData();
  const { lang } = useI18n();
  return (
    <Layout>
      <PageHero
        eyebrow={lang === "zh" ? "解决方案" : "Solution"}
        title={data.title[lang]}
        desc={data.desc[lang]}
        crumbs={[
          { label: lang === "zh" ? "首页" : "Home", to: "/" },
          { label: lang === "zh" ? "解决方案" : "Solutions", to: "/solutions" },
          { label: data.title[lang] },
        ]}
      />
      <section className="container-x py-16 max-w-3xl">
        <h2 className="font-display text-2xl font-bold mb-6">{lang === "zh" ? "关键特性" : "Key Features"}</h2>
        <ul className="space-y-3">
          {data.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
              <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
              <span className="text-sm leading-relaxed">{b[lang]}</span>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
