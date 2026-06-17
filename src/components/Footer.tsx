import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, MessageCircle, Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { categories, contact } from "@/data/site";

export function Footer() {
  const { lang, tr } = useI18n();
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-x py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg gradient-brand grid place-items-center font-bold font-display">AEC</div>
            <div>
              <div className="font-display font-bold">BOPP Film Sale</div>
              <div className="text-xs opacity-70">{contact.company[lang]}</div>
            </div>
          </div>
          <p className="mt-4 text-sm opacity-75 leading-relaxed">{tr.aboutLead}</p>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">{tr.nav.products}</h4>
          <ul className="space-y-2 text-sm opacity-80">
            {categories.slice(0, 6).map((c) => (
              <li key={c.id}>
                <Link to="/products/$categoryId" params={{ categoryId: c.id }} className="hover:opacity-100 hover:text-brand-glow">
                  {c.name[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">{lang === "zh" ? "导航" : "Navigation"}</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/" className="hover:text-brand-glow">{tr.nav.home}</Link></li>
            <li><Link to="/about" className="hover:text-brand-glow">{tr.nav.about}</Link></li>
            <li><Link to="/products" className="hover:text-brand-glow">{tr.nav.products}</Link></li>
            <li><Link to="/contact" className="hover:text-brand-glow">{tr.nav.contact}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">{tr.nav.contact}</h4>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /><span>{contact.address[lang]}</span></li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /><a href={`tel:${contact.mobile}`}>{contact.mobile}</a></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4 shrink-0" />QQ: {contact.qq} · WeChat: {contact.wechat}</li>
            <li className="flex items-center gap-2"><Globe className="h-4 w-4 shrink-0" />{contact.website}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-4 text-xs opacity-70 flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} {contact.company[lang]}. All rights reserved.</span>
          <span>皖ICP备11005402号</span>
        </div>
      </div>
    </footer>
  );
}
