import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useI18n } from "@/lib/i18n";
import { contact } from "@/data/site";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Anhui Dongjian | 关于安徽东渐" },
      { name: "description", content: "Comprehensive supplier of BOPP, BOPET, POF, BOPS, PE films and downstream processing." },
    ],
  }),
  component: About,
});

function About() {
  const { lang, tr } = useI18n();
  const highlights = [
    { zh: "BOPP / BOPET / POF / BOPS / PE 全系列薄膜", en: "Full BOPP / BOPET / POF / BOPS / PE film range" },
    { zh: "镀铝、彩印、涂布、分切等深加工", en: "Metallizing, printing, coating, slitting" },
    { zh: "电容膜、碳带膜、新能源电池膜", en: "Capacitor / ribbon / battery films" },
    { zh: "胶粘带、拉线、袋子、机械与配件", en: "Tapes, tear tapes, bags, machinery & parts" },
    { zh: "办公碳带、标签、复印纸、相纸耗材", en: "Office ribbons, labels, copy & photo paper" },
    { zh: "出口至 60+ 国家与地区", en: "Exports to 60+ countries" },
  ];

  return (
    <Layout>
      <section className="gradient-hero text-white py-20">
        <div className="container-x max-w-3xl">
          <div className="text-sm opacity-75">{tr.nav.home} / {tr.nav.about}</div>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">{tr.aboutTitle}</h1>
          <p className="mt-4 opacity-90 text-lg">{tr.aboutLead}</p>
        </div>
      </section>

      <section className="container-x py-16 grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-2xl font-bold">{contact.company[lang]}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">{tr.aboutBody}</p>
        </div>
        <div className="rounded-2xl bg-card border border-border p-6 shadow-card">
          <h3 className="font-display font-semibold mb-4">{lang === "zh" ? "核心业务" : "Core Business"}</h3>
          <ul className="space-y-3">
            {highlights.map((h) => (
              <li key={h.en} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <span>{h[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-secondary/50 py-16">
        <div className="container-x grid md:grid-cols-4 gap-6 text-center">
          {tr.stats.map((s) => (
            <div key={s.v} className="p-6 rounded-2xl bg-card border border-border shadow-card">
              <div className="text-4xl font-bold text-brand font-display">{s.k}</div>
              <div className="text-sm text-muted-foreground mt-2">{s.v}</div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
