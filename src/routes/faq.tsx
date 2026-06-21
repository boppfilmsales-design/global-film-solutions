import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { useI18n } from "@/lib/i18n";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | BOPP Film Sale" },
      { name: "description", content: "Frequently asked questions about MOQ, lead time, payment, samples, and shipping." },
      { property: "og:title", content: "FAQ" },
      { property: "og:description", content: "Common questions about MOQ, samples, lead time, and shipping." },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { lang } = useI18n();
  const qa = [
    { q: { zh: "最小起订量 (MOQ) 是多少？", en: "What is the MOQ?" }, a: { zh: "常规规格 1 吨起订；非常规规格 3 吨起订。", en: "1 ton for standard grades; 3 tons for custom." } },
    { q: { zh: "可以提供样品吗？", en: "Do you provide samples?" }, a: { zh: "免费提供 A4 样卡；卷样按工本费 + 运费收取。", en: "A4 sample sheet free; roll sample at material + freight cost." } },
    { q: { zh: "交期多久？", en: "What is the lead time?" }, a: { zh: "现货 3–7 天；定产 15–25 天。", en: "Stock 3–7 days; made-to-order 15–25 days." } },
    { q: { zh: "支付方式？", en: "Payment terms?" }, a: { zh: "T/T 30% 定金 + 70% 见提单副本；大客户支持 L/C at sight。", en: "T/T 30% deposit + 70% against B/L copy; L/C at sight for key accounts." } },
    { q: { zh: "贸易方式？", en: "Trade terms?" }, a: { zh: "FOB Shanghai / Ningbo，CIF / CFR / DDP 全部支持。", en: "FOB Shanghai / Ningbo, CIF / CFR / DDP available." } },
    { q: { zh: "包装方式？", en: "How are rolls packed?" }, a: { zh: "纸芯 3″/6″，PE 缠绕膜 + 木托盘，集装箱直发。", en: "3″/6″ core, PE stretch wrap + wooden pallet, container shipment." } },
    { q: { zh: "是否能定制规格？", en: "Custom specs available?" }, a: { zh: "厚度、幅宽、电晕、热封层均可定制。", en: "Thickness, width, corona and heat-seal layer all customizable." } },
    { q: { zh: "是否支持 OEM / 品牌印刷？", en: "OEM / branded printing?" }, a: { zh: "支持，订单量≥3吨可走印刷工艺。", en: "Yes, printing available for orders ≥ 3 tons." } },
  ];
  return (
    <Layout>
      <PageHero
        eyebrow="FAQ"
        title={lang === "zh" ? "常见问题" : "Frequently Asked Questions"}
        crumbs={[{ label: lang === "zh" ? "首页" : "Home", to: "/" }, { label: "FAQ" }]}
      />
      <section className="container-x py-16 max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {qa.map((it, i) => (
            <AccordionItem key={i} value={`q-${i}`} className="rounded-xl border border-border bg-card px-5">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">{it.q[lang]}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{it.a[lang]}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </Layout>
  );
}
