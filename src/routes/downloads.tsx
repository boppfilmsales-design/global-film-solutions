import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { useI18n } from "@/lib/i18n";
import { FileText, Download as DLIcon } from "lucide-react";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Downloads | BOPP Film Sale" },
      { name: "description", content: "Technical datasheets, brochures and certifications — request via email." },
      { property: "og:title", content: "Downloads" },
      { property: "og:description", content: "Datasheets, brochures, certifications." },
    ],
  }),
  component: DownloadsPage,
});

function DownloadsPage() {
  const { lang } = useI18n();
  const files = [
    { t: { zh: "公司宣传册 (PDF)", en: "Company Brochure (PDF)" }, s: "8.4 MB" },
    { t: { zh: "BOPP 全系列产品规格书", en: "BOPP Full-range Datasheet" }, s: "2.1 MB" },
    { t: { zh: "BOPET 产品规格书", en: "BOPET Datasheet" }, s: "1.8 MB" },
    { t: { zh: "镀铝薄膜规格书", en: "Metallized Film Datasheet" }, s: "1.2 MB" },
    { t: { zh: "ISO 9001 证书", en: "ISO 9001 Certificate" }, s: "420 KB" },
    { t: { zh: "FDA 合规声明", en: "FDA Compliance Letter" }, s: "380 KB" },
    { t: { zh: "REACH 合规声明", en: "REACH Compliance Letter" }, s: "360 KB" },
    { t: { zh: "MSDS — BOPP / BOPET", en: "MSDS — BOPP / BOPET" }, s: "950 KB" },
  ];
  return (
    <Layout>
      <PageHero
        eyebrow={lang === "zh" ? "资料下载" : "Downloads"}
        title={lang === "zh" ? "技术资料与下载" : "Technical Documents & Downloads"}
        desc={lang === "zh" ? "请通过邮件向 sale@boppfilmsale.com 索取最新版本的资料。" : "Request the latest version via email at sale@boppfilmsale.com."}
        crumbs={[{ label: lang === "zh" ? "首页" : "Home", to: "/" }, { label: lang === "zh" ? "下载" : "Downloads" }]}
      />
      <section className="container-x py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((f) => (
          <a key={f.t.en} href="mailto:sale@boppfilmsale.com?subject=Document%20Request" className="group rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-secondary grid place-items-center shrink-0">
              <FileText className="h-5 w-5 text-brand" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-sm group-hover:text-brand transition">{f.t[lang]}</div>
              <div className="text-xs text-muted-foreground mt-1">PDF · {f.s}</div>
            </div>
            <DLIcon className="h-4 w-4 text-muted-foreground group-hover:text-brand transition" />
          </a>
        ))}
      </section>
    </Layout>
  );
}
