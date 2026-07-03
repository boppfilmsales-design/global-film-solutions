// Hierarchical product taxonomy — 14 top-level categories with subcategories.
// Products from scraped-products.json are auto-classified by regex on title + keywords.
import { catalog, type CatalogProduct } from "./catalog";

export type Sub = {
  id: string;
  zh: string;
  en: string;
  match: RegExp;
};

export type TopCat = {
  id: string;
  zh: string;
  en: string;
  icon: string;
  subs: Sub[];
};

// Order matters: first matching sub within the first matching top-cat wins.
export const taxonomy: TopCat[] = [
  {
    id: "bopp",
    zh: "BOPP 双向拉伸聚丙烯薄膜",
    en: "BOPP Film",
    icon: "✦",
    subs: [
      { id: "bopp-print-lam", zh: "BOPP 印刷复合膜", en: "BOPP Printing & Laminating Film", match: /印刷复合|印刷.*复合|复合.*印刷|印刷膜|复合膜(?!.*(热|预涂|金属|激光|BOPET|BOPA))/i },
      { id: "bopp-heat-seal", zh: "BOPP 热封膜", en: "BOPP Heat Sealable Film", match: /BOPP.*热封|热封.*BOPP|热封膜/i },
      { id: "bopp-flower", zh: "BOPP 花卉包装膜", en: "BOPP Flower Wrapping Film", match: /包花|花卉|flower/i },
      { id: "bopp-pearl", zh: "BOPP 白色珠光膜", en: "BOPP White Pearlized Film", match: /珠光|pearl/i },
      { id: "bopp-cigarette", zh: "BOPP 烟包膜", en: "BOPP Cigarette Packs Wrapping Film", match: /烟膜|烟包|cigarette/i },
      { id: "bopp-metallized", zh: "BOPP 镀铝膜", en: "BOPP Metallized Film", match: /BOPP.*镀铝|镀铝.*BOPP|BOPP镀铝/i },
      { id: "bopp-capacitor", zh: "BOPP 电容器膜", en: "BOPP Capacitor Film", match: /电容|capacitor/i },
      { id: "bopp-other", zh: "BOPP 其他薄膜", en: "Other BOPP Films", match: /BOPP|聚丙烯/i },
    ],
  },
  {
    id: "bopet",
    zh: "BOPET 双向拉伸聚酯薄膜",
    en: "BOPET Film",
    icon: "◇",
    subs: [
      { id: "bopet-ttr-45", zh: "BOPET 4.5微米热转印膜", en: "BOPET 4.5Mic TTR Thermal Transfer Film", match: /4\.?5\s*(微米|mic|μm).*(BOPET|聚酯|TTR|热转印|转印|碳带)|(BOPET|聚酯|TTR|热转印|转印|碳带).*4\.?5\s*(微米|mic|μm)/i },
      { id: "bopet-metallized", zh: "BOPET 镀银膜", en: "BOPET Metallized Film Silver", match: /(BOPET|聚酯).*镀(铝|银)|镀(铝|银).*(BOPET|聚酯)/i },
      { id: "bopet-capacitor", zh: "BOPET 电容器膜", en: "BOPET Capacitor Film", match: /(BOPET|聚酯).*电容|电容.*(BOPET|聚酯)/i },
      { id: "bopet-plain", zh: "BOPET 普通膜", en: "BOPET Plain Film", match: /BOPET|聚酯薄膜|聚酯/i },
    ],
  },
  {
    id: "bopp-thermal-lam",
    zh: "BOPP 预涂膜（热复合膜）",
    en: "BOPP Thermal Lamination Film",
    icon: "◈",
    subs: [
      { id: "tlam-bopa", zh: "BOPA 热复合膜", en: "BOPA Thermal Lamination Film", match: /BOPA.*(预涂|热复合|thermal)/i },
      { id: "tlam-laser-bopet", zh: "激光 BOPET 热复合膜", en: "Laser BOPET Thermal Lamination Film", match: /激光.*(BOPET|预涂|复合)|laser.*lamin/i },
      { id: "tlam-metal-bopp", zh: "金属 BOPP 热复合膜", en: "Metal BOPP Thermal Lamination Film", match: /(金属|镀).*BOPP.*(预涂|热复合)|BOPP.*(预涂|热复合).*(金属|镀)/i },
      { id: "tlam-bopet", zh: "BOPET 热复合膜", en: "BOPET Thermal Laminating Film", match: /BOPET.*(预涂|热复合|thermal lam)/i },
      { id: "tlam-soft-touch", zh: "柔软触感天鹅绒 BOPP", en: "Soft Touch Velvet Thermal BOPP", match: /(柔软|天鹅绒|soft.*touch|velvet)/i },
      { id: "tlam-matt", zh: "BOPP 热复合哑光膜", en: "BOPP Thermal Lamination Film Matt", match: /(哑光|消光|matt).*(BOPP|预涂|复合)|BOPP.*预涂.*哑|哑光膜/i },
      { id: "tlam-glossy", zh: "BOPP 热复合光亮膜", en: "BOPP Thermal Lamination Film Glossy", match: /(光亮|亮光|glossy).*(BOPP|预涂|复合)|BOPP.*预涂/i },
      { id: "tlam-other", zh: "其他预涂膜", en: "Other Thermal Lamination", match: /预涂|热复合|thermal lam/i },
    ],
  },
  {
    id: "coating",
    zh: "涂布膜",
    en: "Coating Film",
    icon: "▧",
    subs: [
      { id: "coat-pvdc", zh: "PVDC 涂布 K 膜", en: "PVDC Coating Film (K Film)", match: /PVDC|K.?膜/i },
      { id: "coat-acrylic", zh: "丙烯酸涂层膜", en: "Acrylic Acid Coating Film", match: /丙烯酸|acrylic/i },
      { id: "coat-other", zh: "其他涂布膜", en: "Other Coating Film", match: /涂布|涂层|coating/i },
    ],
  },
  {
    id: "tape",
    zh: "BOPP 包装胶带",
    en: "BOPP Packing Tape",
    icon: "▤",
    subs: [
      { id: "tape-crystal-jumbo", zh: "BOPP 水晶胶带大卷", en: "BOPP Crystal Adhesive Tape Jumbo Rolls", match: /水晶.*胶带.*(大卷|母卷|jumbo)/i },
      { id: "tape-masking-jumbo", zh: "美纹纸胶带大卷", en: "Masking Tape Jumbo Roll", match: /美纹|masking/i },
      { id: "tape-double-jumbo", zh: "双面胶带大卷", en: "Double Sided Tape Jumbo Rolls", match: /双面.*胶带|double.*side.*tape/i },
      { id: "tape-printed", zh: "印刷 BOPP 胶带", en: "Printed BOPP Adhesive Tape", match: /印刷.*胶带|printed.*tape/i },
      { id: "tape-finished", zh: "BOPP 胶带成品卷", en: "BOPP Tape Finished Rolls", match: /胶带.*(成品|小卷|finished)|finished.*tape/i },
      { id: "tape-jumbo", zh: "BOPP 胶带大卷", en: "BOPP Tape Jumbo Rolls", match: /胶带.*(大卷|母卷|jumbo)|(大卷|母卷).*胶带|胶带母膜/i },
      { id: "tape-other", zh: "其他胶带", en: "Other Tapes", match: /胶带|tape/i },
    ],
  },
  {
    id: "bops",
    zh: "BOPS 聚苯乙烯窗口膜",
    en: "BOPS Windows Envelope Film",
    icon: "◱",
    subs: [
      { id: "bops-glossy", zh: "BOPS 亮光信封窗口膜", en: "BOPS Windows Envelope Film Glossy", match: /BOPS.*(亮光|光亮|glossy)|(亮光|光亮).*BOPS/i },
      { id: "bops-matt", zh: "BOPS 哑光信封窗口膜", en: "BOPS Windows Envelope Film Matt", match: /BOPS.*(哑光|消光|matt)|(哑光|消光).*BOPS/i },
      { id: "bops-shrink", zh: "BOPS 收缩膜", en: "BOPS Shrinkage Film", match: /BOPS.*(收缩|塑形|shrink)|(收缩|塑形).*BOPS/i },
      { id: "bops-food", zh: "BOPS 食品容器膜", en: "BOPS Film For Food Container", match: /BOPS.*(食品|容器|food)|(食品|容器).*BOPS/i },
      { id: "bops-other", zh: "其他 BOPS 膜", en: "Other BOPS Film", match: /BOPS|聚苯乙烯|窗口膜|信封/i },
    ],
  },
  {
    id: "cpp-bopa",
    zh: "CPP / BOPA 流延膜与尼龙膜",
    en: "CPP / BOPA Film",
    icon: "◐",
    subs: [
      { id: "cpp-vmcpp", zh: "VMCPP 真空镀铝膜", en: "VMCPP Film", match: /VMCPP|真空镀铝/i },
      { id: "cpp-gcpp", zh: "GCPP 镀铝流延膜", en: "GCPP Film", match: /GCPP|流延.*镀铝|镀铝.*流延/i },
      { id: "cpp-plain", zh: "CPP 流延膜", en: "CPP Cast Film", match: /CPP|流延/i },
      { id: "bopa-12", zh: "BOPA 尼龙膜 12 微米", en: "BOPA Nylon Film 12Mic", match: /(BOPA|尼龙).*12/i },
      { id: "bopa-15", zh: "BOPA 尼龙膜 15 微米", en: "BOPA Nylon Film 15Mic", match: /(BOPA|尼龙).*15/i },
      { id: "bopa-other", zh: "BOPA 尼龙膜", en: "BOPA Nylon Film", match: /BOPA|尼龙|聚酰胺|nylon/i },
    ],
  },
  {
    id: "pof-pe-pvc",
    zh: "POF / PE / PVC 收缩膜及袋类",
    en: "POF / PE / PVC Shrink Films & Bags",
    icon: "◑",
    subs: [
      { id: "pof-central", zh: "POF 中折收缩膜", en: "POF Shrinkage Film Central Fold", match: /POF.*(中折|central)/i },
      { id: "pof-color", zh: "POF 彩色收缩膜", en: "POF Shrinkage Film Color", match: /POF.*(彩色|color)/i },
      { id: "pof-single", zh: "POF 单层收缩膜", en: "POF Shrinkage Film Single Layer", match: /POF.*(单层|single)/i },
      { id: "pof-other", zh: "POF 收缩膜", en: "POF Shrinkage Film", match: /POF|聚烯烃/i },
      { id: "pe-stretch", zh: "PE 拉伸膜", en: "PE Stretch Film", match: /PE.*(拉伸|stretch)/i },
      { id: "pe-cling", zh: "PE 缠绕/保鲜膜", en: "PE Cling Film", match: /PE.*(缠绕|保鲜|cling)|保鲜膜|保鲜袋/i },
      { id: "pe-other", zh: "PE 膜", en: "PE Film", match: /PE|聚乙烯/i },
      { id: "pvc-shrink", zh: "PVC 收缩膜", en: "PVC Shrinkage Film", match: /PVC.*(收缩|shrink)/i },
      { id: "pvc-cling", zh: "PVC 缠绕膜", en: "PVC Cling Film", match: /PVC.*(缠绕|cling)/i },
      { id: "pvc-other", zh: "PVC 膜", en: "PVC Film", match: /PVC|聚氯乙烯/i },
    ],
  },
  {
    id: "tear",
    zh: "拉线 & 包扎绳",
    en: "Tear Tape & Clips",
    icon: "▬",
    subs: [
      { id: "tear-self", zh: "自粘拆封拉线", en: "Self-adhesive Tear Tape", match: /(自粘|self).*(拉线|撕裂|tear)|拆封拉线/i },
      { id: "tear-clear", zh: "透明撕裂带", en: "Clear Tear Tape", match: /(透明|clear).*(拉线|撕裂|tear)/i },
      { id: "tear-gold", zh: "金色撕裂带", en: "Golden Tear Tape", match: /(金色|gold).*(拉线|撕裂|tear)/i },
      { id: "tear-red", zh: "红色撕裂带", en: "Red Tear Tape", match: /(红色|red).*(拉线|撕裂|tear)/i },
      { id: "tear-laser", zh: "激光撕裂带", en: "Laser Tear Tape", match: /(激光|laser).*(拉线|撕裂|tear)/i },
      { id: "tear-printed", zh: "印刷撕裂带", en: "Printed Tear Tape", match: /(印刷|printed).*(拉线|撕裂|tear)/i },
      { id: "tear-sheet", zh: "BOPP 片材撕裂带", en: "BOPP Sheet Inserts Tear Tape", match: /(片材|sheet).*(拉线|撕裂|tear)/i },
      { id: "tear-clips", zh: "包扎绳 / Tear Clips", en: "Tear Clips", match: /包扎绳|clips/i },
      { id: "tear-other", zh: "其他拉线 / 撕裂带", en: "Other Tear Tape", match: /拉线|撕裂|tear/i },
    ],
  },
  {
    id: "paper",
    zh: "纸制品",
    en: "Paper Products",
    icon: "▭",
    subs: [
      { id: "paper-a4", zh: "A4 复印纸", en: "A4 Copy Paper", match: /A4/i },
      { id: "paper-letter", zh: "信纸尺寸复印纸", en: "Letter Size Copy Paper", match: /letter.*size|信纸/i },
      { id: "paper-legal", zh: "法律文件尺寸复印纸", en: "Legal Size Copy Paper", match: /legal.*size|法律.*纸/i },
      { id: "paper-copy-jumbo", zh: "复印纸大卷", en: "Copy Paper Jumbo Rolls", match: /复印纸|copy.*paper/i },
      { id: "paper-lwc", zh: "LWC 轻量涂布纸", en: "LWC Paper", match: /LWC|轻量涂布/i },
      { id: "paper-photo", zh: "相纸", en: "Photo Paper", match: /相纸|photo.*paper/i },
      { id: "paper-inkjet", zh: "喷墨打印耗材", en: "Inkjet Printing Supply", match: /喷墨|inkjet/i },
      { id: "paper-foil", zh: "铝箔", en: "Aluminum Foil", match: /铝箔|foil/i },
      { id: "paper-other", zh: "其他纸制品", en: "Other Paper Products", match: /纸/i },
    ],
  },
  {
    id: "machines",
    zh: "机器设备",
    en: "Machines & Equipment",
    icon: "⚙",
    subs: [
      { id: "mach-slitting", zh: "分切机", en: "Slitting Machines", match: /分切/i },
      { id: "mach-printing", zh: "印刷机", en: "Printing Machines", match: /印刷机/i },
      { id: "mach-bag", zh: "制袋机", en: "Bag Machines", match: /制袋机/i },
      { id: "mach-tape", zh: "胶带机", en: "Tape Machines", match: /胶带机/i },
      { id: "mach-metal", zh: "镀膜机", en: "Metal Film Machines", match: /镀膜机|镀铝机/i },
      { id: "mach-coder", zh: "打码机", en: "Coder Machines", match: /打码/i },
      { id: "mach-other", zh: "其他设备", en: "Other Equipment", match: /机|设备|气涨轴|机器|equipment/i },
    ],
  },
  {
    id: "ttr",
    zh: "热转印碳带与标签",
    en: "TTR Ribbons & Labels",
    icon: "▮",
    subs: [
      { id: "ttr-label-roll", zh: "自粘标签卷", en: "Self-Adhesive Labels In Rolls", match: /(自粘|self).*标签.*(卷|roll)|标签.*卷/i },
      { id: "ttr-label-sheet", zh: "自粘标签片材", en: "Self-Adhesive Labels In Sheets", match: /(自粘|self).*标签.*(片|sheet)/i },
      { id: "ttr-label", zh: "自粘标签", en: "Self-adhesive Labels", match: /标签|label/i },
      { id: "ttr-barcode", zh: "热转印条码碳带", en: "TTR Barcode Ribbons", match: /(条码|barcode).*(碳带|ribbon)/i },
      { id: "ttr-wax-resin", zh: "蜡基 / 树脂碳带", en: "Wax / Resin Ribbons", match: /(蜡基|树脂|wax|resin).*(碳带|ribbon)|碳带.*(蜡|树脂)/i },
      { id: "ttr-ribbon", zh: "热转印碳带", en: "TTR Ribbons", match: /碳带|ribbon|热转印|转印膜|TTR/i },
    ],
  },
  {
    id: "glue",
    zh: "胶水粘合剂",
    en: "Adhesive Glue",
    icon: "◆",
    subs: [
      { id: "glue-all", zh: "胶水粘合剂", en: "Adhesive Glue", match: /胶水|粘合剂|glue|adhesive|硬脂酸|橡胶/i },
    ],
  },
  {
    id: "other",
    zh: "其他产品",
    en: "Other Products",
    icon: "◯",
    subs: [
      { id: "other-bags", zh: "袋子和片膜", en: "Bags & Sheets", match: /袋|片膜|bag|sheet/i },
      { id: "other-misc", zh: "其他", en: "Others", match: /./ },
    ],
  },
];

export type ClassifiedProduct = CatalogProduct & { catId: string; subId: string };

const classified: ClassifiedProduct[] = (() => {
  const out: ClassifiedProduct[] = [];
  for (const p of catalog) {
    const hay = `${p.title} ${p.keywords} ${p.slug}`;
    let placed = false;
    for (const c of taxonomy) {
      for (const s of c.subs) {
        if (s.match.test(hay)) {
          out.push({ ...p, catId: c.id, subId: s.id });
          placed = true;
          break;
        }
      }
      if (placed) break;
    }
    if (!placed) {
      const other = taxonomy[taxonomy.length - 1];
      out.push({ ...p, catId: other.id, subId: other.subs[other.subs.length - 1].id });
    }
  }
  return out;
})();

export const productsByCat: Record<string, ClassifiedProduct[]> = {};
export const productsBySub: Record<string, ClassifiedProduct[]> = {};
for (const p of classified) {
  (productsByCat[p.catId] ??= []).push(p);
  (productsBySub[p.subId] ??= []).push(p);
}

export const countByCat = (catId: string) => productsByCat[catId]?.length ?? 0;
export const countBySub = (subId: string) => productsBySub[subId]?.length ?? 0;
export const allClassified = classified;
