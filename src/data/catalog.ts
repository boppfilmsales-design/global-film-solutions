// Auto-generated catalog of all scraped products from boppfilmsale.com (first-party owner content).
import raw from "./scraped-products.json";

export type CatalogSpec = { k: string; v: string };
export type CatalogProduct = {
  id: string;
  slug: string;
  title: string;
  keywords: string;
  metaDesc: string;
  images: string[];
  body: string;
  specs: CatalogSpec[];
};

export const catalog: CatalogProduct[] = raw as CatalogProduct[];

const bySlug = new Map(catalog.map((p) => [p.slug, p]));
export const getCatalogProduct = (slug: string) => bySlug.get(slug);

// Lightweight taxonomy by keyword detection on title
const RULES: { id: string; zh: string; en: string; match: RegExp }[] = [
  { id: "bopp", zh: "BOPP 双向拉伸聚丙烯薄膜", en: "BOPP Film", match: /bopp|聚丙烯/i },
  { id: "bopet", zh: "BOPET 双向拉伸聚酯薄膜", en: "BOPET / PET Film", match: /bopet|pet|聚酯/i },
  { id: "tape", zh: "胶粘带 / 胶水", en: "Adhesive Tape & Glue", match: /胶带|胶水|tape|glue|jiaodai|jiaoshui/i },
  { id: "coating", zh: "涂布膜", en: "Coated Film", match: /涂布|coating|tubu/i },
  { id: "intermediate", zh: "中间体 / 化工", en: "Chemical Intermediates", match: /中间体|内酯|苯|chun|酸|醇|酯|chemical|intermediate/i },
  { id: "cpp-pa", zh: "CPP / PA / PS 膜", en: "CPP / PA / PS Film", match: /流延|尼龙|聚苯乙烯|cpp|pa|nylon|ps/i },
  { id: "label", zh: "标签 / 碳带 / 打码", en: "Label / Ribbon / Coder", match: /标签|碳带|打码|拉线|label|ribbon|coder/i },
  { id: "pe-pvc", zh: "PE / PVC / POF / 袋", en: "PE / PVC / POF / Bags", match: /聚乙烯|聚氯乙烯|聚烯烃|pof|pe|pvc|袋|bag/i },
  { id: "paper", zh: "纸制品", en: "Paper Products", match: /纸|paper|zhi/i },
  { id: "machine", zh: "机器设备 / 电子", en: "Machinery & Electronics", match: /机|设备|电子|machine|cutter|panel|board|jiqi/i },
  { id: "epidemic", zh: "防疫用品", en: "Epidemic Prevention", match: /口罩|防护|消毒|防疫|mask|anquan|fangbao|fangyi/i },
  { id: "wheel", zh: "汽车轮毂", en: "Auto Wheels", match: /轮毂|wheel|lungu/i },
];

export type CatalogCategory = {
  id: string;
  zh: string;
  en: string;
  products: CatalogProduct[];
};

export const catalogCategories: CatalogCategory[] = (() => {
  const buckets: Record<string, CatalogProduct[]> = {};
  for (const p of catalog) {
    const hay = `${p.title} ${p.keywords} ${p.slug}`;
    const rule = RULES.find((r) => r.match.test(hay)) ?? RULES[RULES.length - 2];
    (buckets[rule.id] ??= []).push(p);
  }
  return RULES.map((r) => ({
    id: r.id,
    zh: r.zh,
    en: r.en,
    products: (buckets[r.id] ?? []).sort((a, b) => a.title.localeCompare(b.title)),
  })).filter((c) => c.products.length > 0);
})();
