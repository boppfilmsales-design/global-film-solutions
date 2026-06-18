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

export type Spec = { label: { zh: string; en: string }; value: string };
export type FAQ = { q: string; a: string };
export type TradeRow = { k: string; v: string };
export type Product = {
  id: string;
  name: { zh: string; en: string };
  img: string;
  tagline?: { zh: string; en: string };
  desc?: { zh: string; en: string };
  specs?: Spec[];
  applications?: { zh: string[]; en: string[] };
  features?: { zh: string[]; en: string[] };
  packaging?: { zh: string[]; en: string[] };
  quality?: { zh: string[]; en: string[] };
  faq?: { zh: FAQ[]; en: FAQ[] };
  trade?: { zh: TradeRow[]; en: TradeRow[] };
};
export type Category = {
  id: string;
  icon: string;
  name: { zh: string; en: string };
  short: { zh: string; en: string };
  desc: { zh: string; en: string };
  products: Product[];
};

const IMG = (n: number) => `https://www.boppfilmsale.com/pic/big/${n}_0.jpg`;

// Reusable spec presets ------------------------------------------------
const SPEC_THK = (v: string): Spec => ({ label: { zh: "厚度 Thickness", en: "Thickness" }, value: v });
const SPEC_WID = (v: string): Spec => ({ label: { zh: "宽度 Width", en: "Width" }, value: v });
const SPEC_CORE = (v = "76 mm / 3 inch"): Spec => ({ label: { zh: "纸芯 Core", en: "Core" }, value: v });
const SPEC_TREAT = (v: string): Spec => ({ label: { zh: "处理 Treatment", en: "Treatment" }, value: v });
const SPEC_OD = (v = "≤ 1000 mm"): Spec => ({ label: { zh: "卷径 Roll OD", en: "Roll OD" }, value: v });
const SPEC_PKG = (v: string): Spec => ({ label: { zh: "包装 Packing", en: "Packing" }, value: v });

// ---------------------------------------------------------------------
export const categories: Category[] = [
  {
    id: "bopp",
    icon: "✦",
    name: { zh: "双向拉伸聚丙烯薄膜 (BOPP)", en: "BOPP Film" },
    short: { zh: "BOPP 薄膜全系列", en: "Full BOPP Range" },
    desc: {
      zh: "覆盖光膜、热封膜、珠光膜、制袋膜、烟膜、电容膜、镀铝膜、消光膜、印刷复合膜、胶带膜等全系列 BOPP 薄膜产品。",
      en: "Full range of BOPP films: plain, heat-seal, pearlized, bag-making, cigarette, capacitor, metallized, matte, lamination, tape film and more.",
    },
    products: [
      {
        id: "bopp-pearlized",
        name: { zh: "BOPP 珠光膜", en: "BOPP Pearlized Film" },
        img: IMG(30),
        tagline: { zh: "珍珠光泽 · 高遮光性", en: "Pearl luster · high opacity" },
        desc: {
          zh: "采用 PP + 成核剂三层共挤工艺，膜面具有独特珍珠光泽，密度低、覆盖力强，常用于冰淇淋、糖果、洗化等高档包装。",
          en: "Three-layer co-extruded BOPP with nucleating agent, delivering a pearlescent finish, low density and high coverage — ideal for ice-cream, confectionery and cosmetics packaging.",
        },
        specs: [
          SPEC_THK("25 / 30 / 35 / 40 μm"),
          { label: { zh: "密度 Density", en: "Density" }, value: "0.65 – 0.75 g/cm³" },
          { label: { zh: "雾度 Haze", en: "Haze" }, value: "≥ 85%" },
          { label: { zh: "热封强度 Heat-seal", en: "Heat-seal strength" }, value: "≥ 2.5 N/15 mm" },
          SPEC_WID("520 – 1300 mm"),
          SPEC_TREAT("Corona ≥ 38 dyn/cm"),
          SPEC_CORE(),
        ],
        applications: {
          zh: ["冰淇淋包装", "糖果包装", "日化洗化标签", "复合内层膜"],
          en: ["Ice-cream wrap", "Candy twist wrap", "Cosmetic labels", "Lamination inner layer"],
        },
        features: {
          zh: ["珍珠白光泽", "高遮光、低密度", "良好热封性", "可印刷可复合"],
          en: ["Pearl-white luster", "Opaque & low density", "Good heat-seal", "Printable & laminable"],
        },
      },
      {
        id: "bopp-plain",
        name: { zh: "BOPP 平膜 / 光膜", en: "BOPP Plain Film" },
        img: IMG(28),
        tagline: { zh: "高透明 · 印刷复合通用", en: "Crystal clear · universal" },
        desc: {
          zh: "经典双向拉伸聚丙烯透明薄膜，高透明、高刚性，是印刷、复合、镀铝及标签应用的基础膜。",
          en: "Classic BOPP transparent film with high clarity and stiffness — the workhorse base for printing, lamination, metallizing and labels.",
        },
        specs: [
          SPEC_THK("12 / 15 / 18 / 20 / 25 / 30 μm"),
          { label: { zh: "雾度 Haze", en: "Haze" }, value: "≤ 2.5%" },
          { label: { zh: "光泽度 Gloss", en: "Gloss" }, value: "≥ 90%" },
          { label: { zh: "拉伸强度 Tensile", en: "Tensile strength" }, value: "≥ 130 MPa (MD)" },
          SPEC_WID("520 – 1600 mm"),
          SPEC_TREAT("Single / double-side corona"),
          SPEC_CORE(),
        ],
        applications: {
          zh: ["彩印复合", "镀铝基材", "不干胶标签", "胶带基膜"],
          en: ["Color print & lamination", "Metallizing base", "Self-adhesive labels", "Tape base"],
        },
        features: {
          zh: ["高透明高光泽", "刚性好易加工", "电晕稳定", "兼容多种印刷油墨"],
          en: ["High clarity & gloss", "Stiff & easy to process", "Stable corona", "Print-friendly"],
        },
      },
      {
        id: "bopp-metallized",
        name: { zh: "BOPP 镀铝膜", en: "BOPP Metallized Film" },
        img: IMG(50),
        tagline: { zh: "高阻隔 · 金属光泽", en: "High barrier · metallic look" },
        desc: {
          zh: "真空蒸镀铝膜，金属光泽、阻隔氧气、水汽与紫外线，常作复合膜中间层。",
          en: "Vacuum-deposited aluminum layer providing metallic gloss and excellent O₂ / moisture / UV barrier — typically the middle layer of laminates.",
        },
        specs: [
          SPEC_THK("12 / 15 / 18 / 20 / 25 μm"),
          { label: { zh: "光密度 OD", en: "Optical density" }, value: "2.0 – 2.5" },
          { label: { zh: "WVTR", en: "WVTR" }, value: "≤ 0.5 g/m²·24h" },
          { label: { zh: "OTR", en: "OTR" }, value: "≤ 50 cc/m²·24h" },
          SPEC_WID("520 – 1300 mm"),
          SPEC_TREAT("VMPET-grade Al coating"),
          SPEC_CORE(),
        ],
        applications: {
          zh: ["膨化食品", "咖啡 / 茶叶", "宠物食品", "保健品包装"],
          en: ["Snack packaging", "Coffee / tea pouches", "Pet-food bags", "Health supplements"],
        },
      },
      {
        id: "bopp-tape",
        name: { zh: "BOPP 胶带膜", en: "BOPP Tape Film" },
        img: IMG(24),
        tagline: { zh: "胶带基材 · 涂胶专用", en: "Tape-grade BOPP" },
        desc: {
          zh: "胶带专用 BOPP 基膜，双面电晕处理，配合水性、热熔或溶剂型胶水生产封箱胶带、文具胶带。",
          en: "BOPP base film engineered for tape production — double-side corona, compatible with water-based, hot-melt and solvent adhesives.",
        },
        specs: [
          SPEC_THK("18 / 21 / 25 / 28 / 38 / 50 μm"),
          SPEC_WID("520 – 1620 mm"),
          SPEC_TREAT("Both-side corona ≥ 40 dyn/cm"),
          { label: { zh: "断裂伸长 Elongation", en: "Elongation at break" }, value: "≥ 150%" },
          SPEC_OD("≤ 1200 mm"),
          SPEC_CORE(),
        ],
        applications: {
          zh: ["封箱胶带", "文具胶带", "保护膜基材"],
          en: ["Carton sealing tape", "Stationery tape", "Surface protection"],
        },
      },
      {
        id: "bopp-base",
        name: { zh: "BOPP 通用基材膜", en: "Biaxially Oriented PP Film" },
        img: IMG(23),
        desc: {
          zh: "通用型 BOPP 基材膜，可定制宽度与厚度，广泛用于包装与工业加工。",
          en: "General-purpose BOPP substrate film with customizable width and thickness for packaging and industrial converting.",
        },
        specs: [SPEC_THK("15 – 50 μm"), SPEC_WID("520 – 1600 mm"), SPEC_TREAT("Corona ≥ 38 dyn/cm"), SPEC_CORE()],
      },
      {
        id: "bopp-cap",
        name: { zh: "BOPP 锌铝电工膜 (银白色)", en: "Metallized BOPP Capacitor Film" },
        img: IMG(107),
        tagline: { zh: "高耐压 · 电容专用", en: "High voltage · capacitor grade" },
        desc: {
          zh: "锌或锌铝合金蒸镀的电容用 BOPP 膜，超薄、高耐压、自愈性能优良。",
          en: "Zn / Zn-Al metallized BOPP for film capacitors — ultra-thin, high dielectric strength and excellent self-healing.",
        },
        specs: [
          SPEC_THK("3 – 12 μm"),
          { label: { zh: "方阻 Square resistance", en: "Square resistance" }, value: "2 – 20 Ω/□" },
          { label: { zh: "击穿电压 Dielectric", en: "Dielectric strength" }, value: "≥ 500 V/μm" },
          SPEC_WID("20 – 1000 mm (split)"),
          SPEC_CORE("76 mm"),
        ],
        applications: {
          zh: ["金属化薄膜电容", "AC/DC 电容器", "新能源逆变器"],
          en: ["Metallized film capacitors", "AC/DC capacitors", "Inverters for new energy"],
        },
      },
      {
        id: "bopp-cig",
        name: { zh: "BOPP 收缩烟膜", en: "BOPP Cigarette Overwrap Film" },
        img: IMG(103),
        desc: {
          zh: "高透明、高光泽、低热封烟膜，适用于香烟、扑克牌、化妆品盒外裹包装。",
          en: "Crystal-clear high-gloss BOPP overwrap film for cigarette packs, playing cards and cosmetics boxes.",
        },
        specs: [
          SPEC_THK("18 / 19 / 21 μm"),
          { label: { zh: "收缩率 Shrink (120°C)", en: "Shrinkage @120°C" }, value: "4 – 8%" },
          SPEC_WID("60 – 1300 mm"),
          SPEC_TREAT("Optional corona"),
        ],
      },
      {
        id: "bopp-tear",
        name: { zh: "BOPP 拉丝 / 拉线", en: "BOPP Tear Tape" },
        img: IMG(102),
        desc: {
          zh: "用于香烟、CD/DVD、礼盒透明包装的易撕拉线，宽度 1 – 6 mm，可定制颜色与印字。",
          en: "Easy-open tear tape for cigarette, CD/DVD and gift overwrap, 1 – 6 mm wide, printable and color-customizable.",
        },
        specs: [
          { label: { zh: "宽度 Width", en: "Width" }, value: "1.0 / 1.6 / 2.0 / 2.5 / 3.0 / 4.0 / 6.0 mm" },
          { label: { zh: "颜色 Color", en: "Color" }, value: "Clear / Gold / Red / Custom" },
          { label: { zh: "卷长 Length", en: "Length per roll" }, value: "30,000 – 100,000 m" },
        ],
      },
      {
        id: "bopp-printed",
        name: { zh: "BOPP 彩色印刷小卷膜", en: "BOPP Color Printed Wrapping" },
        img: IMG(101),
        desc: {
          zh: "彩色印刷 BOPP 小卷膜，用于鲜花、糖果、礼品包装，可凹印 1 – 8 色。",
          en: "Printed BOPP mini-rolls for flowers, candies and gifts, available in 1 – 8 color gravure printing.",
        },
        specs: [
          SPEC_THK("25 – 40 μm"),
          SPEC_WID("50 – 800 mm"),
          { label: { zh: "印刷 Printing", en: "Printing" }, value: "Gravure 1 – 8 colors" },
        ],
      },
      {
        id: "bopp-holo",
        name: { zh: "BOPP 全息防伪膜 (镭射膜)", en: "BOPP Holographic Film" },
        img: IMG(77),
        desc: {
          zh: "镭射全息 BOPP 膜，闪耀视觉效果与防伪功能，常用于礼盒、烟酒高档包装。",
          en: "Holographic laser BOPP with dazzling rainbow effects and anti-counterfeit value — for premium gift, tobacco and liquor packaging.",
        },
        specs: [
          SPEC_THK("18 / 20 / 25 μm"),
          SPEC_WID("520 – 1280 mm"),
          { label: { zh: "图案 Pattern", en: "Pattern" }, value: "Rainbow / Square / Custom" },
        ],
      },
      { id: "bopp-line", name: { zh: "拉膜线", en: "Film Tear Line" }, img: IMG(70) },
      {
        id: "bopp-perf",
        name: { zh: "BOPP 打孔膜", en: "BOPP Perforated Film" },
        img: IMG(49),
        desc: { zh: "针孔透气 BOPP 膜，用于面包、蔬果、鲜花包装。", en: "Micro-perforated BOPP for bread, fresh produce and flower packaging." },
        specs: [SPEC_THK("25 – 35 μm"), { label: { zh: "孔径 Hole size", en: "Hole size" }, value: "Ø 0.15 – 1.0 mm" }],
      },
      { id: "bopp-resin", name: { zh: "BOPP 原料粒子", en: "BOPP Raw Resin" }, img: IMG(48) },
      {
        id: "bopp-safety",
        name: { zh: "BOPP 电容用安全膜", en: "BOPP Safety Capacitor Film" },
        img: IMG(46),
        desc: { zh: "高安全等级电容膜，具备主动断电保护性能。", en: "Capacitor film with active fuse / segmented metallization for safety." },
        specs: [SPEC_THK("3 – 10 μm"), { label: { zh: "图形 Pattern", en: "Pattern" }, value: "T-margin / Segmented" }],
      },
      { id: "bopp-sleeve", name: { zh: "BOPP 花套膜和花套", en: "BOPP Sleeve Film" }, img: IMG(44) },
      {
        id: "bopp-bag",
        name: { zh: "BOPP 制袋膜", en: "BOPP Bag-Making Film" },
        img: IMG(39),
        desc: { zh: "热封型 BOPP 膜，用于制袋机生产 OPP 自粘袋、平口袋等。", en: "Heat-seal BOPP film for OPP self-adhesive bags and flat-mouth bags." },
        specs: [SPEC_THK("25 – 40 μm"), { label: { zh: "热封温度 Seal temp.", en: "Seal temp." }, value: "95 – 130°C" }],
      },
      {
        id: "bopp-thermal",
        name: { zh: "BOPP 预涂膜", en: "BOPP Thermal Lamination Film" },
        img: IMG(32),
        desc: { zh: "预涂 EVA 热熔胶的 BOPP 膜，与印刷品热复合，无需溶剂胶水。", en: "BOPP pre-coated with EVA hot-melt adhesive for solvent-free thermal lamination." },
        specs: [
          { label: { zh: "总厚度 Total", en: "Total thickness" }, value: "24 / 27 / 32 μm" },
          { label: { zh: "光膜/雾膜 Finish", en: "Finish" }, value: "Gloss / Matte" },
          { label: { zh: "复合温度 Lam. temp.", en: "Lam. temperature" }, value: "85 – 110°C" },
        ],
      },
      { id: "bopp-cleartape", name: { zh: "BOPP 超透明胶带", en: "BOPP Super Clear Tape" }, img: IMG(96) },
    ],
  },

  {
    id: "bopet",
    icon: "◆",
    name: { zh: "双向拉伸聚酯薄膜 (BOPET)", en: "BOPET / Polyester Film" },
    short: { zh: "PET 聚酯薄膜", en: "Polyester Films" },
    desc: {
      zh: "光学级、电工级、包装级 BOPET 聚酯薄膜，可镀铝、印刷、复合，应用于电池、电容、太阳能、显示器等领域。",
      en: "Optical, electrical and packaging grade BOPET films for batteries, capacitors, solar, displays and lamination.",
    },
    products: [
      {
        id: "bopet-1",
        name: { zh: "聚酯薄膜 BOPET", en: "BOPET Polyester Film" },
        img: IMG(81),
        tagline: { zh: "高强度 · 耐高温", en: "High strength · heat resistant" },
        desc: {
          zh: "高拉伸、低收缩、耐高温的双向拉伸聚酯薄膜，是包装、电子、显示等领域的关键基材。",
          en: "High-tensile, low-shrink, heat-resistant biaxially oriented PET — a key substrate for packaging, electronics and display industries.",
        },
        specs: [
          SPEC_THK("8 / 12 / 15 / 19 / 23 / 25 / 36 / 50 μm"),
          { label: { zh: "拉伸强度 Tensile", en: "Tensile strength" }, value: "≥ 200 MPa" },
          { label: { zh: "热收缩 Shrink", en: "Shrinkage @150°C" }, value: "≤ 2%" },
          SPEC_WID("500 – 1500 mm"),
          SPEC_TREAT("Single / both-side corona"),
        ],
        applications: {
          zh: ["蒸煮袋复合", "太阳能背板", "电池软包", "标签印刷"],
          en: ["Retort pouch lamination", "Solar backsheet", "Battery pouch", "Label printing"],
        },
      },
      {
        id: "bopet-2",
        name: { zh: "镀铝聚酯薄膜 VMPET", en: "Metallized PET Film (VMPET)" },
        img: IMG(50),
        desc: {
          zh: "真空蒸镀铝 PET 膜，高阻隔、高光泽，是茶叶、咖啡、医药复合包装的常用阻隔层。",
          en: "Vacuum-metallized PET with high gloss and superb barrier — the go-to barrier layer for tea, coffee and pharma laminates.",
        },
        specs: [
          SPEC_THK("12 / 15 / 19 / 23 μm"),
          { label: { zh: "OD", en: "Optical density" }, value: "2.0 – 2.6" },
          { label: { zh: "剥离强度 Adhesion", en: "Al adhesion" }, value: "≥ 5 N/15 mm" },
        ],
      },
      {
        id: "bopet-optical",
        name: { zh: "光学级 PET 膜", en: "Optical Grade PET Film" },
        img: IMG(81),
        desc: { zh: "用于显示器、触控屏、防爆膜的高透明光学 PET。", en: "Ultra-clear PET for displays, touch panels and safety films." },
        specs: [SPEC_THK("50 / 75 / 100 / 125 / 188 μm"), { label: { zh: "透光率 Transmittance", en: "Transmittance" }, value: "≥ 90%" }],
      },
    ],
  },

  {
    id: "tape",
    icon: "▣",
    name: { zh: "胶粘带和胶水", en: "Adhesive Tapes & Glues" },
    short: { zh: "胶带 · 胶水", en: "Tapes & Adhesives" },
    desc: {
      zh: "BOPP 透明胶带、封箱胶带、双面胶带、警示胶带及水性、热熔、UV 胶水。",
      en: "BOPP clear / sealing / double-sided / warning tapes and water-based, hot-melt, UV adhesives.",
    },
    products: [
      {
        id: "tape-clear",
        name: { zh: "BOPP 超透明胶带", en: "BOPP Super Clear Tape" },
        img: IMG(96),
        desc: { zh: "高透明封箱、文具胶带，可定制宽度、长度、印字。", en: "High-clarity carton & stationery tape — width, length and print customizable." },
        specs: [
          SPEC_THK("38 / 45 / 50 μm"),
          { label: { zh: "宽度 Width", en: "Width" }, value: "12 – 100 mm" },
          { label: { zh: "长度 Length", en: "Length" }, value: "10 – 1000 m" },
          { label: { zh: "胶种 Adhesive", en: "Adhesive" }, value: "Water-based acrylic / hot-melt" },
        ],
      },
      {
        id: "tape-film",
        name: { zh: "BOPP 胶带母卷", en: "BOPP Tape Jumbo Roll" },
        img: IMG(24),
        desc: { zh: "工厂用胶带母卷，再分切成成品胶带。", en: "Jumbo tape rolls for slitting into finished tapes." },
        specs: [SPEC_WID("1280 / 1300 / 1620 mm"), SPEC_OD("≤ 1200 mm")],
      },
      {
        id: "tape-double",
        name: { zh: "双面胶带", en: "Double-Sided Tape" },
        img: IMG(96),
        desc: { zh: "棉纸 / PET / 泡棉双面胶带。", en: "Tissue / PET / foam double-sided tapes." },
        specs: [SPEC_THK("0.05 – 2.0 mm"), { label: { zh: "基材 Carrier", en: "Carrier" }, value: "Tissue / PET / Foam" }],
      },
      {
        id: "tape-warning",
        name: { zh: "PVC 警示胶带", en: "PVC Warning Tape" },
        img: IMG(96),
        desc: { zh: "黄黑、红白条纹 PVC 警示胶带。", en: "Yellow-black / red-white striped PVC warning tape." },
        specs: [SPEC_THK("0.13 mm"), { label: { zh: "宽度 Width", en: "Width" }, value: "48 / 50 mm" }],
      },
    ],
  },

  {
    id: "coating",
    icon: "▥",
    name: { zh: "涂布膜", en: "Coated Films" },
    short: { zh: "涂布膜", en: "Coated Films" },
    desc: {
      zh: "预涂膜、光油涂布膜、PVDC 涂布膜，应用于印刷、覆膜、阻隔包装。",
      en: "Thermal lamination, varnish-coated and PVDC-coated films for printing, lamination and barrier packaging.",
    },
    products: [
      {
        id: "coat-thermal",
        name: { zh: "BOPP 预涂膜", en: "BOPP Thermal Lamination Film" },
        img: IMG(32),
        desc: { zh: "预涂 EVA 热熔胶，环保无溶剂覆膜。", en: "EVA-coated BOPP for solvent-free thermal lamination." },
        specs: [
          { label: { zh: "总厚 Total", en: "Total thickness" }, value: "24 / 27 / 32 μm" },
          { label: { zh: "胶层 EVA", en: "EVA coating" }, value: "12 – 18 μm" },
          { label: { zh: "光/雾 Finish", en: "Finish" }, value: "Gloss / Matte / Soft-touch" },
        ],
      },
      {
        id: "coat-pvdc",
        name: { zh: "PVDC 涂布 BOPP / PET", en: "PVDC-Coated BOPP / PET" },
        img: IMG(32),
        desc: { zh: "PVDC 涂布薄膜，超高阻氧阻湿，用于药品、肉类包装。", en: "PVDC-coated film with top-tier O₂ / moisture barrier for pharma and meat packaging." },
        specs: [
          { label: { zh: "OTR", en: "OTR" }, value: "≤ 5 cc/m²·24h" },
          { label: { zh: "WVTR", en: "WVTR" }, value: "≤ 4 g/m²·24h" },
        ],
      },
    ],
  },

  {
    id: "other-films",
    icon: "◈",
    name: { zh: "BOPS / CPP / 尼龙膜", en: "BOPS / CPP / Nylon Films" },
    short: { zh: "BOPS · CPP · 尼龙", en: "BOPS · CPP · Nylon" },
    desc: {
      zh: "BOPS 片材、CPP 流延聚丙烯膜、尼龙复合膜，用于食品、日用品包装。",
      en: "BOPS sheet, CPP cast polypropylene and nylon composite films for food and consumer packaging.",
    },
    products: [
      {
        id: "bops",
        name: { zh: "BOPS 片材", en: "BOPS Sheet" },
        img: IMG(28),
        desc: { zh: "双向拉伸聚苯乙烯片材，高刚性，用于一次性餐具与吸塑包装。", en: "Biaxially oriented polystyrene sheet — rigid, used for disposable tableware and thermoforming." },
        specs: [SPEC_THK("0.15 – 1.5 mm"), SPEC_WID("≤ 1200 mm")],
      },
      {
        id: "cpp",
        name: { zh: "CPP 流延聚丙烯膜", en: "CPP Cast Polypropylene Film" },
        img: IMG(28),
        desc: { zh: "高透明、高热封性 CPP，常作蒸煮 / 复合内层膜。", en: "Clear, heat-sealable CPP — common inner layer for retort and laminated pouches." },
        specs: [
          SPEC_THK("20 – 80 μm"),
          { label: { zh: "类型 Type", en: "Type" }, value: "General / Retort / Metallizable" },
        ],
      },
      {
        id: "nylon",
        name: { zh: "尼龙复合膜 BOPA", en: "BOPA Nylon Film" },
        img: IMG(28),
        desc: { zh: "高韧性、耐刺穿、阻氧的尼龙复合膜。", en: "Tough, puncture-resistant nylon film with good O₂ barrier." },
        specs: [SPEC_THK("15 / 25 μm"), { label: { zh: "拉伸 Tensile", en: "Tensile" }, value: "≥ 250 MPa" }],
      },
    ],
  },

  {
    id: "ribbon-label",
    icon: "❖",
    name: { zh: "拉线 / 碳带 / 标签 / 打码机", en: "Tear Tape / Ribbon / Labels / Coders" },
    short: { zh: "碳带 · 标签", en: "Ribbons & Labels" },
    desc: {
      zh: "热转印碳带、不干胶标签、烫金箔、条码打印机及打码耗材。",
      en: "Thermal transfer ribbons, self-adhesive labels, hot-stamping foil, barcode printers and coding consumables.",
    },
    products: [
      { id: "tear", name: { zh: "BOPP 拉线", en: "BOPP Tear Tape" }, img: IMG(102), specs: [{ label: { zh: "宽度", en: "Width" }, value: "1 – 6 mm" }] },
      {
        id: "ribbon",
        name: { zh: "热转印碳带", en: "Thermal Transfer Ribbon" },
        img: IMG(70),
        desc: { zh: "蜡基、混合基、树脂基 TTR 碳带，配合条码机打印标签。", en: "Wax, wax-resin and resin TTR ribbons for barcode label printing." },
        specs: [
          { label: { zh: "类型 Type", en: "Type" }, value: "Wax / Wax-resin / Resin" },
          { label: { zh: "宽度 Width", en: "Width" }, value: "20 – 110 mm" },
          { label: { zh: "长度 Length", en: "Length" }, value: "74 / 100 / 300 / 450 m" },
        ],
      },
      {
        id: "label-paper",
        name: { zh: "不干胶标签", en: "Self-Adhesive Labels" },
        img: IMG(70),
        desc: { zh: "铜版纸、PET、PE、合成纸不干胶标签。", en: "Coated paper / PET / PE / synthetic paper self-adhesive labels." },
      },
      {
        id: "hot-foil",
        name: { zh: "烫金箔", en: "Hot Stamping Foil" },
        img: IMG(70),
        desc: { zh: "金、银、彩色烫金箔，适用于纸张、塑料烫印。", en: "Gold, silver and colored hot-stamping foils for paper and plastic." },
      },
    ],
  },

  {
    id: "pe-pvc-pof",
    icon: "◉",
    name: { zh: "PE / PVC / POF 薄膜与袋", en: "PE / PVC / POF Films & Bags" },
    short: { zh: "PE · PVC · POF", en: "PE · PVC · POF" },
    desc: {
      zh: "PE 聚乙烯薄膜、PVC 收缩膜、POF 热收缩膜及定制袋子。",
      en: "PE polyethylene film, PVC shrink film, POF heat-shrink film and custom bags.",
    },
    products: [
      {
        id: "pof",
        name: { zh: "POF 热收缩膜", en: "POF Heat-Shrink Film" },
        img: IMG(62),
        desc: { zh: "环保多层热收缩膜，透明度高、收缩均匀。", en: "Eco-friendly multilayer heat-shrink film with high clarity and even shrinkage." },
        specs: [
          SPEC_THK("12 / 15 / 19 / 25 μm"),
          { label: { zh: "收缩率 Shrink", en: "Shrinkage" }, value: "≥ 70%" },
          SPEC_WID("100 – 1000 mm (folded)"),
        ],
      },
      { id: "pe-film", name: { zh: "PE 聚乙烯膜", en: "PE Polyethylene Film" }, img: IMG(62), specs: [SPEC_THK("20 – 200 μm"), SPEC_WID("≤ 2000 mm")] },
      { id: "pvc-shrink", name: { zh: "PVC 收缩膜", en: "PVC Shrink Film" }, img: IMG(62), specs: [SPEC_THK("25 – 50 μm"), { label: { zh: "收缩 Shrink", en: "Shrinkage" }, value: "≥ 50%" }] },
      { id: "bag", name: { zh: "定制塑料袋", en: "Custom Plastic Bags" }, img: IMG(62) },
    ],
  },

  {
    id: "paper",
    icon: "▤",
    name: { zh: "纸制品", en: "Paper Products" },
    short: { zh: "纸制品", en: "Paper" },
    desc: { zh: "复印纸、相纸、热敏纸、不干胶原纸。", en: "Copy paper, photo paper, thermal paper, label base paper." },
    products: [
      { id: "copy-paper", name: { zh: "A4 复印纸", en: "A4 Copy Paper" }, img: IMG(70), specs: [{ label: { zh: "克重 Weight", en: "Weight" }, value: "70 / 75 / 80 gsm" }] },
      { id: "photo-paper", name: { zh: "高光相纸", en: "Glossy Photo Paper" }, img: IMG(70), specs: [{ label: { zh: "克重", en: "Weight" }, value: "115 – 260 gsm" }] },
      { id: "thermal-paper", name: { zh: "热敏纸", en: "Thermal Paper" }, img: IMG(70), specs: [{ label: { zh: "克重", en: "Weight" }, value: "48 / 55 / 65 gsm" }] },
    ],
  },

  {
    id: "machinery",
    icon: "⚙",
    name: { zh: "机器设备和电子产品", en: "Machinery & Electronics" },
    short: { zh: "机械 · 电子", en: "Machinery & Electronics" },
    desc: { zh: "包装机械、分切机、印刷机、电子元件。", en: "Packaging machinery, slitters, printing machines and electronic components." },
    products: [
      { id: "slitter", name: { zh: "薄膜分切机", en: "Film Slitting Machine" }, img: IMG(48) },
      { id: "printer", name: { zh: "凹版印刷机", en: "Gravure Printing Machine" }, img: IMG(48) },
      { id: "bag-machine", name: { zh: "制袋机", en: "Bag Making Machine" }, img: IMG(48) },
      { id: "barcode-printer", name: { zh: "条码打印机", en: "Barcode Printer" }, img: IMG(48) },
    ],
  },

  {
    id: "solar",
    icon: "☀",
    name: { zh: "光伏太阳能板", en: "Photovoltaic Solar Panels" },
    short: { zh: "光伏组件", en: "PV Modules" },
    desc: { zh: "单晶 / 多晶硅光伏组件，离网及并网系统。", en: "Mono / poly crystalline PV modules, off-grid and on-grid systems." },
    products: [
      { id: "pv-mono", name: { zh: "单晶硅光伏板", en: "Mono-crystalline PV Panel" }, img: IMG(48), specs: [{ label: { zh: "功率 Power", en: "Power" }, value: "330 – 550 W" }] },
      { id: "pv-poly", name: { zh: "多晶硅光伏板", en: "Poly-crystalline PV Panel" }, img: IMG(48), specs: [{ label: { zh: "功率", en: "Power" }, value: "270 – 330 W" }] },
    ],
  },

  {
    id: "auto-ppe",
    icon: "✚",
    name: { zh: "汽配和防疫用品", en: "Auto Parts & PPE" },
    short: { zh: "汽配 · 防疫", en: "Auto & PPE" },
    desc: { zh: "汽车零配件、口罩、防护服及消毒用品。", en: "Auto parts, masks, protective suits and sanitization supplies." },
    products: [
      { id: "mask", name: { zh: "一次性口罩 / N95", en: "Disposable Mask / N95" }, img: IMG(48) },
      { id: "suit", name: { zh: "医用防护服", en: "Medical Protective Suit" }, img: IMG(48) },
      { id: "auto-parts", name: { zh: "汽车零配件", en: "Automotive Parts" }, img: IMG(48) },
    ],
  },
];

export function findProduct(categoryId: string, productId: string) {
  const cat = categories.find((c) => c.id === categoryId);
  if (!cat) return null;
  const prod = cat.products.find((p) => p.id === productId);
  if (!prod) return null;
  return { cat, prod };
}

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
    viewAll: "查看全部产品 →",
    productsIn: "件产品",
    backToCategories: "← 返回产品分类",
    backToCategory: "← 返回品类",
    detailDesc: "产品介绍",
    detailSpecs: "技术参数",
    detailApps: "应用领域",
    detailFeatures: "产品特点",
    relatedTitle: "同类产品",
    inquireNow: "立即询价",
    downloadDatasheet: "技术规格书",
    industries: "服务行业",
    industryList: [
      { t: "食品包装", d: "膨化、糖果、烘焙、冷链。" },
      { t: "电子电气", d: "电容、电池、显示器膜材。" },
      { t: "新能源", d: "光伏背板、动力电池软包。" },
      { t: "日化美妆", d: "标签、复合膜、热缩套。" },
      { t: "医药健康", d: "蒸煮袋、PVDC 阻隔膜。" },
      { t: "印刷出版", d: "覆膜、烫金、不干胶。" },
    ],
    processTitle: "从原料到成品 · 一站式产业链",
    process: [
      { t: "01 原料粒子", d: "PP / PET / PE 树脂粒子，源头掌控。" },
      { t: "02 薄膜拉伸", d: "BOPP / BOPET 双向拉伸生产线。" },
      { t: "03 深加工", d: "镀铝、印刷、涂布、复合、分切。" },
      { t: "04 成品交付", d: "胶带、袋子、标签、定制方案。" },
    ],
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
    viewAll: "View all products →",
    productsIn: "products",
    backToCategories: "← Back to categories",
    backToCategory: "← Back to category",
    detailDesc: "Product Description",
    detailSpecs: "Technical Specifications",
    detailApps: "Applications",
    detailFeatures: "Key Features",
    relatedTitle: "Related Products",
    inquireNow: "Inquire Now",
    downloadDatasheet: "Datasheet",
    industries: "Industries We Serve",
    industryList: [
      { t: "Food Packaging", d: "Snacks, candy, bakery and cold chain." },
      { t: "Electronics", d: "Capacitor, battery and display films." },
      { t: "New Energy", d: "PV backsheet and battery pouch." },
      { t: "Personal Care", d: "Labels, laminates and shrink sleeves." },
      { t: "Pharma & Health", d: "Retort pouches and PVDC barrier." },
      { t: "Printing", d: "Lamination, foil and self-adhesive." },
    ],
    processTitle: "From Resin to Finished Goods · Full Supply Chain",
    process: [
      { t: "01 Raw Resin", d: "PP / PET / PE pellets — controlled at source." },
      { t: "02 Film Extrusion", d: "BOPP / BOPET biaxial stretching lines." },
      { t: "03 Converting", d: "Metallizing, printing, coating, lamination, slitting." },
      { t: "04 Delivery", d: "Tapes, bags, labels and custom solutions." },
    ],
    why: [
      { t: "20+ Years Manufacturing", d: "Decades of expertise in flexible packaging films." },
      { t: "Full Supply Chain", d: "From resin to finished bag, all in one stop." },
      { t: "Export-Qualified", d: "Serving customers in 60+ countries." },
      { t: "Custom Solutions", d: "Spec, print and lamination customization." },
    ],
  },
} as const;
