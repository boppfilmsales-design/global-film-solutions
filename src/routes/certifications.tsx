import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: "Certifications & Compliance | BOPP Film Sale" },
      { name: "description", content: "ISO 9001, ISO 14001, FDA, SGS, REACH, RoHS — full compliance portfolio." },
      { property: "og:title", content: "Certifications & Compliance" },
      { property: "og:description", content: "Quality and environmental management systems and product compliance." },
    ],
  }),
  component: CertPage,
});

function CertPage() {
  const { lang } = useI18n();
  const certs = [
    { k: "ISO 9001", v: { zh: "质量管理体系", en: "Quality Management System" } },
    { k: "ISO 14001", v: { zh: "环境管理体系", en: "Environmental Management System" } },
    { k: "FDA", v: { zh: "美国食品接触合规", en: "US food contact compliance" } },
    { k: "EU 10/2011", v: { zh: "欧盟食品接触塑料法规", en: "EU plastics food contact regulation" } },
    { k: "REACH / SVHC", v: { zh: "欧盟化学品注册评估", en: "EU chemicals registration / SVHC" } },
    { k: "RoHS", v: { zh: "电子电气有害物质限制", en: "Hazardous substances restriction" } },
    { k: "SGS", v: { zh: "第三方检测报告", en: "Third-party inspection report" } },
    { k: "Halal / Kosher", v: { zh: "清真 / 犹太洁食认证（按客户需求）", en: "On request" } },
  ];
  return (
    <Layout>
      <PageHero
        eyebrow={lang === "zh" ? "合规与认证" : "Certifications"}
        title={lang === "zh" ? "认证与合规" : "Certifications & Compliance"}
        desc={lang === "zh" ? "我们的体系认证与产品合规覆盖食品、医药、电子等关键领域。" : "Systems and product compliance covering food, pharma, electronics and more."}
        crumbs={[{ label: lang === "zh" ? "首页" : "Home", to: "/" }, { label: lang === "zh" ? "认证" : "Certifications" }]}
      />
      <section className="container-x py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {certs.map((c) => (
          <div key={c.k} className="rounded-2xl border border-border bg-card p-5 shadow-card text-center hover:shadow-elegant transition">
            <div className="font-display text-2xl font-bold text-brand">{c.k}</div>
            <div className="text-sm text-muted-foreground mt-2">{c.v[lang]}</div>
          </div>
        ))}
      </section>
    </Layout>
  );
}
