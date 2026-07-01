import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { useI18n } from "@/lib/i18n";
import { Factory, Cpu, Truck, Microscope, Settings, Award } from "lucide-react";

export const Route = createFileRoute("/factory")({
  head: () => ({
    meta: [
      { title: "Factory & Production | BOPP Film Sale" },
      { name: "description", content: "Anhui Eastern Communication production base — BOPP / BOPET extrusion lines, coating, slitting and packaging workshops." },
      { property: "og:title", content: "Factory & Production — Anhui Eastern Communication" },
      { property: "og:description", content: "Inside our film extrusion, coating and slitting workshops." },
    ],
  }),
  component: FactoryPage,
});

function FactoryPage() {
  const { lang } = useI18n();
  const sections = [
    { icon: Factory, t: { zh: "薄膜挤出车间", en: "Film Extrusion" }, d: { zh: "多条 BOPP / BOPET 双向拉伸生产线，幅宽 4.2–8.7 米，年产能数万吨。", en: "Multiple BOPP / BOPET bi-axial lines, 4.2–8.7 m web width, tens of thousands of tons annual capacity." } },
    { icon: Cpu, t: { zh: "涂布与复合", en: "Coating & Lamination" }, d: { zh: "凹版/微凹涂布线，水性、溶剂型涂布工艺，热封、镀铝、亚光、珠光等。", en: "Gravure / micro-gravure coaters supporting water-based and solvent coatings — heat-seal, metallized, matte, pearlized." } },
    { icon: Settings, t: { zh: "分切与后处理", en: "Slitting & Finishing" }, d: { zh: "高速分切机精确至 ±0.5 mm，电晕处理、母卷换轴一站式。", en: "High-speed slitters with ±0.5 mm accuracy, in-line corona treatment and turret rewinding." } },
    { icon: Microscope, t: { zh: "实验与检测中心", en: "Lab & QC Center" }, d: { zh: "拉力、热收缩、雾度、摩擦、剥离强度等全项检测，按 GB/ISO 标准出货。", en: "Tensile, shrinkage, haze, COF, peel strength testing — every roll shipped under GB / ISO standards." } },
    { icon: Truck, t: { zh: "仓储与物流", en: "Warehouse & Logistics" }, d: { zh: "万平米恒温仓储，对接上海/宁波港，FOB / CIF / DDP 多种出运方式。", en: "Climate-controlled warehouse, direct truck links to Shanghai / Ningbo ports, FOB / CIF / DDP shipping." } },
    { icon: Award, t: { zh: "认证与体系", en: "Certifications" }, d: { zh: "ISO 9001、ISO 14001、FDA、SGS、REACH 等多项体系与产品认证。", en: "ISO 9001, ISO 14001, FDA, SGS, REACH and other systems / product certifications." } },
  ];
  return (
    <Layout>
      <PageHero
        eyebrow={lang === "zh" ? "工厂实力" : "Production"}
        title={lang === "zh" ? "工厂与生产" : "Factory & Production"}
        desc={lang === "zh" ? "走进安徽东渐生产基地：从原料、挤出、涂布、分切到出运的一站式薄膜制造。" : "Inside Anhui Eastern Communication — one-stop film manufacturing from resin to shipment."}
        crumbs={[{ label: lang === "zh" ? "首页" : "Home", to: "/" }, { label: lang === "zh" ? "工厂" : "Factory" }]}
      />
      <section className="container-x py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sections.map((s) => (
          <div key={s.t.en} className="rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-elegant transition">
            <div className="h-12 w-12 rounded-xl gradient-brand grid place-items-center text-brand-foreground shadow-elegant mb-4">
              <s.icon className="h-6 w-6" />
            </div>
            <div className="font-display font-semibold text-lg">{s.t[lang]}</div>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.d[lang]}</p>
          </div>
        ))}
      </section>
    </Layout>
  );
}
