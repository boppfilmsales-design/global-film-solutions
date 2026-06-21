import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { useI18n } from "@/lib/i18n";
import { ShieldCheck, FlaskConical, ClipboardCheck, Recycle } from "lucide-react";

export const Route = createFileRoute("/quality")({
  head: () => ({
    meta: [
      { title: "Quality Control & Testing | BOPP Film Sale" },
      { name: "description", content: "QC procedures, on-line inspection and laboratory testing for BOPP, BOPET and coated films." },
      { property: "og:title", content: "Quality Control & Testing" },
      { property: "og:description", content: "In-line + lab testing under GB and ISO standards." },
    ],
  }),
  component: QualityPage,
});

function QualityPage() {
  const { lang } = useI18n();
  const pillars = [
    { icon: ShieldCheck, t: { zh: "原料管控", en: "Raw Material Control" }, d: { zh: "树脂供应商月度评估、批批留样，从源头杜绝异常。", en: "Monthly supplier audits and per-batch retained samples." } },
    { icon: FlaskConical, t: { zh: "实验室检测", en: "Laboratory Testing" }, d: { zh: "厚度、拉伸、热收缩、雾度、摩擦系数、剥离强度、迁移测试。", en: "Thickness, tensile, shrinkage, haze, COF, peel strength, migration." } },
    { icon: ClipboardCheck, t: { zh: "在线视觉检测", en: "On-line Vision Inspection" }, d: { zh: "100% 全幅 CCD 检测，缺陷自动剔除并生成卷报。", en: "100% full-width CCD inspection with auto-rejection and roll reports." } },
    { icon: Recycle, t: { zh: "可持续合规", en: "Sustainability & Compliance" }, d: { zh: "符合 RoHS、REACH、FDA、欧盟食品接触法规。", en: "Compliant with RoHS, REACH, FDA and EU food-contact regulations." } },
  ];
  const tests = [
    { k: { zh: "厚度公差", en: "Thickness tolerance" }, v: "±2%" },
    { k: { zh: "拉伸强度 MD", en: "Tensile MD" }, v: "≥ 140 MPa" },
    { k: { zh: "拉伸强度 TD", en: "Tensile TD" }, v: "≥ 230 MPa" },
    { k: { zh: "热收缩 120℃/5min", en: "Shrinkage 120℃/5min" }, v: "≤ 4 / 1.5%" },
    { k: { zh: "雾度", en: "Haze" }, v: "≤ 2.5%" },
    { k: { zh: "光泽度", en: "Gloss" }, v: "≥ 90" },
    { k: { zh: "电晕表面张力", en: "Corona surface tension" }, v: "≥ 38 mN/m" },
    { k: { zh: "剥离强度 (镀铝)", en: "Peel strength (metallized)" }, v: "≥ 1.5 N/15mm" },
  ];
  return (
    <Layout>
      <PageHero
        eyebrow={lang === "zh" ? "品质保障" : "Quality"}
        title={lang === "zh" ? "质量控制与检测" : "Quality Control & Testing"}
        desc={lang === "zh" ? "从原料、生产、成品到交付，全过程依 ISO 9001 / GB 标准管控。" : "Full process governed by ISO 9001 / GB standards — raw material to delivery."}
        crumbs={[{ label: lang === "zh" ? "首页" : "Home", to: "/" }, { label: lang === "zh" ? "品质" : "Quality" }]}
      />
      <section className="container-x py-16 grid md:grid-cols-2 gap-5">
        {pillars.map((p) => (
          <div key={p.t.en} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="h-12 w-12 rounded-xl gradient-brand grid place-items-center text-brand-foreground mb-4 shadow-elegant">
              <p.icon className="h-6 w-6" />
            </div>
            <div className="font-display font-semibold text-lg">{p.t[lang]}</div>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.d[lang]}</p>
          </div>
        ))}
      </section>
      <section className="container-x pb-20">
        <h2 className="font-display text-2xl font-bold mb-4">{lang === "zh" ? "典型出厂指标" : "Typical Released Spec"}</h2>
        <div className="rounded-2xl border border-border overflow-hidden bg-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60">
              <tr>
                <th className="text-left p-3 font-semibold">{lang === "zh" ? "项目" : "Item"}</th>
                <th className="text-left p-3 font-semibold">{lang === "zh" ? "指标" : "Value"}</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((t) => (
                <tr key={t.v} className="border-t border-border">
                  <td className="p-3">{t.k[lang]}</td>
                  <td className="p-3 font-mono text-brand">{t.v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
}
