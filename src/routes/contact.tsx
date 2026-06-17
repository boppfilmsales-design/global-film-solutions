import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Globe, Send, Smartphone } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useI18n } from "@/lib/i18n";
import { contact } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — BOPP Film Sale | 联系我们" },
      { name: "description", content: "Reach Anhui Dongjian by email, phone, WhatsApp, WeChat or QQ. sale@boppfilmsale.com · +86 18919659471" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { lang, tr } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", company: "", msg: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Inquiry] ${form.company || form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\n${form.msg}`,
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  const items = [
    { icon: MapPin, label: lang === "zh" ? "地址" : "Address", value: contact.address[lang] },
    { icon: Phone, label: lang === "zh" ? "电话" : "Tel", value: contact.phone, href: `tel:${contact.phone}` },
    { icon: Smartphone, label: lang === "zh" ? "手机 / WhatsApp" : "Mobile / WhatsApp", value: contact.mobile, href: `https://wa.me/86${contact.mobile}` },
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Globe, label: "Website", value: contact.website, href: `https://${contact.website}` },
    { icon: MessageCircle, label: "QQ / WeChat", value: `QQ: ${contact.qq} · WeChat: ${contact.wechat}` },
  ];

  return (
    <Layout>
      <section className="gradient-hero text-white py-20">
        <div className="container-x max-w-3xl">
          <div className="text-sm opacity-75">{tr.nav.home} / {tr.nav.contact}</div>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">{tr.contactTitle}</h1>
          <p className="mt-3 opacity-90">{tr.contactDesc}</p>
        </div>
      </section>

      <section className="container-x py-16 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-display font-bold text-2xl">{contact.company[lang]}</h2>
          <p className="text-muted-foreground text-sm">{lang === "zh" ? "联系人" : "Contact"}: {contact.contactName[lang]}</p>
          <ul className="space-y-4 mt-6">
            {items.map((it) => (
              <li key={it.label} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card shadow-card">
                <div className="h-10 w-10 rounded-lg gradient-brand grid place-items-center text-brand-foreground shrink-0">
                  <it.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">{it.label}</div>
                  {it.href ? (
                    <a href={it.href} className="text-sm font-medium hover:text-brand break-all">{it.value}</a>
                  ) : (
                    <div className="text-sm font-medium break-all">{it.value}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <form onSubmit={onSubmit} className="p-8 rounded-2xl border border-border bg-card shadow-elegant space-y-5">
            <h3 className="font-display font-bold text-2xl">{lang === "zh" ? "在线询盘" : "Online Inquiry"}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={tr.formName} required>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
              </Field>
              <Field label={tr.formEmail} required>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
              </Field>
            </div>
            <Field label={tr.formCompany}>
              <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
            </Field>
            <Field label={tr.formMsg} required>
              <textarea required rows={6} value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            </Field>
            <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-brand text-brand-foreground font-semibold shadow-elegant hover:opacity-90">
              <Send className="h-4 w-4" /> {tr.formSubmit}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}{required && <span className="text-destructive"> *</span>}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
