export type Lang = "zh" | "en";

export const contact = {
  company: { zh: "安徽东渐进出口有限公司", en: "Anhui Dongjian Import & Export Co., Ltd." },
  contactName: { zh: "杨经理", en: "Manager Yang" },
  phone: "86-551-64687285",
  fax: "86-551-64683490",
  mobile: "18919659471",
  whatsapp: "18919659471",
  wechat: "18919659471",
  email: "sale@boppfilmsale.com",
  website: "www.boppfilmsale.com",
  qq: "2538474128",
  skype: "boppfilmsales",
  address: {
    zh: "安徽省合肥市包河区徽州大道1158号银杏大厦（邮编：230031）",
    en: "Yinxing Building, No.1158 Huizhou Avenue, Baohe District, Hefei, Anhui, China (230031)",
  },
};

export type Product = { id: string; name: { zh: string; en: string }; img: string };
export type Category = {
  id: string;
  name: { zh: string; en: string };
  desc: { zh: string; en: string };
  products: Product[];
};

const IMG = (n: number) => `https://www.boppfilmsale.com/pic/big/${n}_0.jpg`;

export const categories: Category[] = [
  {
    id: "bopp",
    name: { zh: "双向拉伸聚丙烯薄膜 (BOPP)", en: "BOPP Film" },
    desc: {
      zh: "覆盖光膜、热封膜、珠光膜、制袋膜、烟膜、电容膜、镀铝膜、消光膜、印刷复合膜、胶带膜等全系列 BOPP 薄膜产品。",
      en: "Full range of BOPP films: plain, heat-seal, pearlized, bag-making, cigarette, capacitor, metallized, matte, lamination, tape film and more.",
    },
    products: [
      { id: "bopp-pearlized", name: { zh: "BOPP 珠光膜", en: "BOPP Pearlized Film" }, img: IMG(30) },
      { id: "bopp-plain", name: { zh: "BOPP 平膜", en: "BOPP Plain Film" }, img: IMG(28) },
      { id: "bopp-metallized", name: { zh: "BOPP 镀铝膜", en: "BOPP Metallized Film" }, img: IMG(50) },
      { id: "bopp-tape", name: { zh: "BOPP 胶带膜", en: "BOPP Tape Film" }, img: IMG(24) },
      { id: "bopp-base", name: { zh: "双向拉伸聚丙烯薄膜", en: "Biaxially Oriented PP Film" }, img: IMG(23) },
      { id: "bopp-cap", name: { zh: "BOPP 锌铝电工膜 (银白色)", en: "Metallized BOPP Capacitor Film" }, img: IMG(107) },
      { id: "bopp-cig", name: { zh: "BOPP 收缩烟膜片膜", en: "BOPP Cigarette Overwrap Film" }, img: IMG(103) },
      { id: "bopp-tear", name: { zh: "BOPP 拉丝 / 拉线", en: "BOPP Tear Tape" }, img: IMG(102) },
      { id: "bopp-printed", name: { zh: "BOPP 彩色印刷小卷膜", en: "BOPP Color Printed Wrapping" }, img: IMG(101) },
      { id: "bopp-holo", name: { zh: "BOPP 全息防伪膜 (激光膜)", en: "BOPP Holographic Film" }, img: IMG(77) },
      { id: "bopp-line", name: { zh: "拉膜线", en: "Film Tear Line" }, img: IMG(70) },
      { id: "bopp-perf", name: { zh: "BOPP 打孔膜", en: "BOPP Perforated Film" }, img: IMG(49) },
      { id: "bopp-resin", name: { zh: "BOPP 原料粒子", en: "BOPP Raw Resin" }, img: IMG(48) },
      { id: "bopp-safety", name: { zh: "BOPP 电容用安全膜", en: "BOPP Safety Capacitor Film" }, img: IMG(46) },
      { id: "bopp-sleeve", name: { zh: "BOPP 花套膜和花套", en: "BOPP Sleeve Film" }, img: IMG(44) },
      { id: "bopp-bag", name: { zh: "BOPP 制袋膜", en: "BOPP Bag-Making Film" }, img: IMG(39) },
      { id: "bopp-thermal", name: { zh: "BOPP 预涂膜", en: "BOPP Thermal Lamination Film" }, img: IMG(32) },
      { id: "bopp-cleartape", name: { zh: "BOPP 超透明胶带", en: "BOPP Super Clear Tape" }, img: IMG(96) },
    ],
  },
  {
    id: "bopet",
    name: { zh: "双向拉伸聚酯薄膜 (BOPET)", en: "BOPET / Polyester Film" },
    desc: {
      zh: "光学级、电工级、包装级 BOPET 聚酯薄膜，可镀铝、印刷、复合，应用于电池、电容、太阳能等领域。",
      en: "Optical, electrical and packaging grade BOPET film for batteries, capacitors, solar and lamination.",
    },
    products: [
      { id: "bopet-1", name: { zh: "聚酯薄膜 BOPET", en: "BOPET Polyester Film" }, img: IMG(81) },
      { id: "bopet-2", name: { zh: "镀铝聚酯薄膜", en: "Metallized PET Film" }, img: IMG(50) },
    ],
  },
  {
    id: "tape",
    name: { zh: "胶粘带和胶水", en: "Adhesive Tapes & Glues" },
    desc: {
      zh: "BOPP 透明胶带、封箱胶带、双面胶带、警示胶带及水性、热熔、UV 胶水。",
      en: "BOPP clear / sealing / double-sided / warning tapes and water-based, hot-melt, UV adhesives.",
    },
    products: [
      { id: "tape-clear", name: { zh: "BOPP 超透明胶带", en: "BOPP Super Clear Tape" }, img: IMG(96) },
      { id: "tape-film", name: { zh: "BOPP 胶带膜", en: "BOPP Tape Film" }, img: IMG(24) },
    ],
  },
  {
    id: "coating",
    name: { zh: "涂布膜", en: "Coated Films" },
    desc: {
      zh: "预涂膜、光油涂布膜、PVDC 涂布膜，应用于印刷、覆膜、阻隔包装。",
      en: "Thermal lamination, varnish-coated and PVDC-coated films for printing, lamination and barrier packaging.",
    },
    products: [
      { id: "coat-thermal", name: { zh: "BOPP 预涂膜", en: "BOPP Thermal Lamination Film" }, img: IMG(32) },
    ],
  },
  {
    id: "other-films",
    name: { zh: "聚苯乙烯 / 流延 PP / 尼龙膜", en: "BOPS / CPP / Nylon Films" },
    desc: {
      zh: "BOPS 片材、CPP 流延聚丙烯膜、尼龙复合膜，用于食品、日用品包装。",
      en: "BOPS sheet, CPP cast polypropylene and nylon composite films for food and consumer packaging.",
    },
    products: [
      { id: "bops", name: { zh: "BOPS 片材", en: "BOPS Sheet" }, img: IMG(28) },
    ],
  },
  {
    id: "ribbon-label",
    name: { zh: "拉线 / 碳带 / 标签 / 打码机", en: "Tear Tape / Ribbon / Labels / Coders" },
    desc: {
      zh: "热转印碳带、不干胶标签、烫金箔、条码打印机及打码耗材。",
      en: "Thermal transfer ribbons, self-adhesive labels, hot stamping foil, barcode printers and coding consumables.",
    },
    products: [
      { id: "tear", name: { zh: "BOPP 拉线", en: "BOPP Tear Tape" }, img: IMG(102) },
      { id: "ribbon", name: { zh: "热转印碳带", en: "Thermal Transfer Ribbon" }, img: IMG(70) },
    ],
  },
  {
    id: "pe-pvc-pof",
    name: { zh: "PE / PVC / POF 薄膜与袋", en: "PE / PVC / POF Films & Bags" },
    desc: {
      zh: "PE 聚乙烯薄膜、PVC 收缩膜、POF 热收缩膜及定制袋子。",
      en: "PE polyethylene film, PVC shrink film, POF heat-shrink film and custom bags.",
    },
    products: [
      { id: "pof", name: { zh: "POF 热收缩膜", en: "POF Heat-Shrink Film" }, img: IMG(62) },
    ],
  },
  {
    id: "paper",
    name: { zh: "纸制品", en: "Paper Products" },
    desc: { zh: "复印纸、相纸、热敏纸、不干胶原纸。", en: "Copy paper, photo paper, thermal paper, label base paper." },
    products: [],
  },
  {
    id: "machinery",
    name: { zh: "机器设备和电子产品", en: "Machinery & Electronics" },
    desc: { zh: "包装机械、分切机、印刷机、电子元件。", en: "Packaging machinery, slitters, printing machines and electronic components." },
    products: [],
  },
  {
    id: "solar",
    name: { zh: "光伏太阳能板", en: "Photovoltaic Solar Panels" },
    desc: { zh: "单晶 / 多晶硅光伏组件，离网及并网系统。", en: "Mono / poly crystalline PV modules, off-grid and on-grid systems." },
    products: [],
  },
  {
    id: "auto-ppe",
    name: { zh: "汽配和防疫用品", en: "Auto Parts & PPE" },
    desc: { zh: "汽车零配件、口罩、防护服及消毒用品。", en: "Auto parts, masks, protective suits and sanitization supplies." },
    products: [],
  },
];

export const t = {
  zh: {
    nav: { home: "首页", about: "关于我们", products: "产品中心", news: "新闻动态", contact: "联系我们" },
    heroEyebrow: "全球软包装材料供应商",
    heroTitle: "高性能薄膜 · 一站式软包装解决方案",
    heroDesc: "BOPP · BOPET · 涂布膜 · 胶粘带 · 碳带标签 — 覆盖印刷、复合、电子、新能源、食品包装全产业链。",
    heroCta1: "浏览产品",
    heroCta2: "在线咨询",
    stats: [
      { k: "20+", v: "年行业经验" },
      { k: "11", v: "大类产品线" },
      { k: "100+", v: "在售 SKU" },
      { k: "60+", v: "出口国家" },
    ],
    catTitle: "产品分类",
    catDesc: "覆盖薄膜、胶带、涂布、标签、机械等全系列软包装供应。",
    featTitle: "热销产品",
    featDesc: "客户首选的薄膜与包装材料。",
    aboutTitle: "关于安徽东渐",
    aboutLead:
      "安徽东渐进出口有限公司，生产和经营覆盖软包装塑膜、涂布、印刷复合、镀铝镭射等多个领域，是 BOPP、BOPET、POF、BOPS、PE 薄膜及其深加工产品的综合供应商。",
    aboutBody:
      "公司从软塑料包装薄膜起步，经过多年发展，已成长为在包装薄膜、薄膜深加工（镀铝、彩印、涂布、分切）、薄膜电子材料（电容膜、碳带膜、新能源电池膜）、胶粘带、拉线、袋子、自动化机械设备及配件，以及打印碳带、标签、复印纸、相纸等耗材领域具有独特优势的供应商。",
    contactTitle: "联系我们",
    contactDesc: "欢迎来电、来函或在线咨询，我们将第一时间回复。",
    formName: "您的姓名",
    formEmail: "邮箱",
    formCompany: "公司",
    formMsg: "需求 / 留言",
    formSubmit: "发送询盘",
    viewAll: "查看全部 →",
    productsIn: "件产品",
    backToCategories: "← 返回产品分类",
    why: [
      { t: "20+ 年制造经验", d: "深耕软包装薄膜行业，工艺成熟稳定。" },
      { t: "全产业链供应", d: "从原料粒子到成品袋一站式交付。" },
      { t: "出口资质齐全", d: "服务全球 60+ 国家客户。" },
      { t: "定制化方案", d: "支持规格、印刷、复合定制。" },
    ],
  },
  en: {
    nav: { home: "Home", about: "About", products: "Products", news: "News", contact: "Contact" },
    heroEyebrow: "Global Flexible Packaging Supplier",
    heroTitle: "High-Performance Films · One-Stop Packaging Solutions",
    heroDesc:
      "BOPP · BOPET · Coated films · Adhesive tapes · Ribbons & labels — covering printing, lamination, electronics, new energy and food packaging.",
    heroCta1: "Browse Products",
    heroCta2: "Get a Quote",
    stats: [
      { k: "20+", v: "Years Experience" },
      { k: "11", v: "Product Lines" },
      { k: "100+", v: "SKUs in Stock" },
      { k: "60+", v: "Export Countries" },
    ],
    catTitle: "Product Categories",
    catDesc: "A complete range of films, tapes, coatings, labels and machinery.",
    featTitle: "Featured Products",
    featDesc: "Top picks from our customers worldwide.",
    aboutTitle: "About Anhui Dongjian",
    aboutLead:
      "Anhui Dongjian Import & Export Co., Ltd. manufactures and trades flexible packaging films, coatings, printing & lamination materials and metallized / holographic products.",
    aboutBody:
      "Starting from flexible packaging films, we have grown into a comprehensive supplier of BOPP / BOPET / POF / BOPS / PE films and downstream processing (metallizing, printing, coating, slitting), film electronic materials (capacitor film, ribbon film, battery film), adhesive tapes, tear tapes, bags, automation machinery, as well as printing ribbons, labels, copy paper and photo paper.",
    contactTitle: "Contact Us",
    contactDesc: "Send us a message, give us a call or reach us online — we reply promptly.",
    formName: "Your Name",
    formEmail: "Email",
    formCompany: "Company",
    formMsg: "Your Requirement / Message",
    formSubmit: "Send Inquiry",
    viewAll: "View all →",
    productsIn: "products",
    backToCategories: "← Back to categories",
    why: [
      { t: "20+ Years Manufacturing", d: "Decades of expertise in flexible packaging films." },
      { t: "Full Supply Chain", d: "From resin to finished bag, all in one stop." },
      { t: "Export-Qualified", d: "Serving customers in 60+ countries." },
      { t: "Custom Solutions", d: "Spec, print and lamination customization." },
    ],
  },
} as const;
