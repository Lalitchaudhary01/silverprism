export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  inStock: boolean;
}

export interface VolumeDiscount {
  minQty: number;
  discountPercent: number; // e.g. 5% off wholesale
}

export interface DiamondSpecs {
  stoneType: string;
  shape: string;
  caratWeight: string;
  colorGrade: string;
  clarityGrade: string;
  cutGrade: string;
  certification: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  category: "Rings" | "Earrings" | "Necklaces" | "Bracelets" | "Pendants" | "Sets";
  collection: "sculpted-silver" | "geometric-prism" | "bridal-heirlooms" | "minimalist";
  images: string[];
  description: string;
  material: string;
  finish: string;
  netWeightGrams: number;
  dimensions: string;
  stoneDetails: string;
  hallmark: string;
  retailPrice: number;       // USD / INR retail
  wholesalePrice: number;    // USD / INR B2B
  moq: number;               // Minimum Order Quantity for B2B
  volumeDiscounts: VolumeDiscount[];
  inStock: boolean;
  inventoryCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  diamondSpecs?: DiamondSpecs;
  variants: ProductVariant[];
}

export interface CollectionItem {
  slug: string;
  num: string;
  title: string;
  description: string;
  image: string;
  pieceCount: number;
}

export const COLLECTIONS: CollectionItem[] = [
  {
    slug: "sculpted-silver",
    num: "01",
    title: "Sculpted Atelier Collection",
    description: "Fluid, organic contours cast in solid 925 sterling silver and 14K gold with mirror-polished luster.",
    image: "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/BRC-RE.3dm_1_metal_gold_polished_2689daba05.pmat_View4.png?v=1780741427",
    pieceCount: 16,
  },
  {
    slug: "geometric-prism",
    num: "02",
    title: "The Geometric Prism Edit",
    description: "Architectural precision, faceted emerald & geometric cuts engineered for modern brilliance.",
    image: "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/BRC-1_RE.3dm_View4.png?v=1780738287",
    pieceCount: 14,
  },
  {
    slug: "bridal-heirlooms",
    num: "03",
    title: "Bridal & Solitaire Heirlooms",
    description: "IGI certified lab-grown diamond engagement rings, toi et moi sets, and matching eternity bands.",
    image: "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605197.3dm_1_metal_gold_polished_2689daba05.pmat_View3.png?v=1780292226",
    pieceCount: 20,
  },
  {
    slug: "minimalist",
    num: "04",
    title: "Tennis & Everyday Luxury",
    description: "Iconic diamond tennis bracelets, station necklaces, and lightweight ergonomic solitaires.",
    image: "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/BRC-2_RE.3dm_1_metal_gold_polished_2689daba05.pmat_View4.png?v=1780740378",
    pieceCount: 18,
  },
];

export const CATEGORIES = [
  "Rings",
  "Earrings",
  "Necklaces",
  "Bracelets",
  "Pendants",
  "Sets",
] as const;

export const DIAMOND_SHAPES = [
  { name: "Round", count: 12, icon: "●" },
  { name: "Oval", count: 8, icon: "⬭" },
  { name: "Emerald", count: 7, icon: "▭" },
  { name: "Pear", count: 6, icon: "💧" },
  { name: "Marquise", count: 5, icon: "◇" },
  { name: "Radiant", count: 4, icon: "⯃" },
  { name: "Cushion", count: 4, icon: "▢" },
  { name: "Toi et Moi", count: 3, icon: "⚯" },
] as const;

export interface ManufacturingCapability {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  features: string[];
}

export const MANUFACTURING_CAPABILITIES: ManufacturingCapability[] = [
  {
    id: "cap-01",
    number: "01",
    title: "Precision Vacuum Casting",
    subtitle: "German Induction Technology",
    description: "Zero-porosity induction casting in nitrogen-shielded chambers, ensuring dense crystalline matrix for durable daily wear.",
    badge: "99.4% Density Rating",
    features: [
      "925 Sterling Silver & 14K/18K Gold metallurgy",
      "Gas-free enclosed vacuum chamber casting",
      "Minimal porosity grain refining alloys",
    ],
  },
  {
    id: "cap-02",
    number: "02",
    title: "CAD & 25-Micron Wax Printing",
    subtitle: "Digital Prototyping",
    description: "Rhino & MatrixGold parametric modeling coupled with high-resolution DLP wax 3D printers for sub-millimeter detail.",
    badge: "±0.02mm Precision",
    features: [
      "24-hour turnaround for prototype approval",
      "Zero-shrinkage castable resin formulation",
      "Parametric stone seat calibration",
    ],
  },
  {
    id: "cap-03",
    number: "03",
    title: "Micro-Pavé Optical Setting",
    subtitle: "Microscope Hand-Stone Setting",
    description: "Every diamond is inspected under 20x magnification, bead-set by master craftsmen to guarantee stone retention.",
    badge: "Zero-Drop Guarantee",
    features: [
      "Precision cut seats using Swiss tungsten burrs",
      "Claw, bezel, and channel setting architectures",
      "Stress-tested stone retention verification",
    ],
  },
  {
    id: "cap-04",
    number: "04",
    title: "Multi-Tier Heavy Micron Plating",
    subtitle: "Surface Longevity",
    description: "Multi-stage electroplating with 0.5-micron palladium barrier and 2.5-micron 18K gold vermeil or rhodium mirror polish.",
    badge: "Anti-Tarnish Seal",
    features: [
      "Nickel-free hypoallergenic barrier coating",
      "2.5µm 18K Yellow/Rose Gold Vermeil thickness",
      "Rhodium electroplate for platinum-grade shine",
    ],
  },
  {
    id: "cap-05",
    number: "05",
    title: "IGI Gemological Laser Inscription",
    subtitle: "Laboratory Grading",
    description: "Direct partnership with IGI for laboratory verification, table laser inscribing, and tamper-evident certificate issuance.",
    badge: "Certified Authenticity",
    features: [
      "Microscopic laser inscription on diamond girdle",
      "Full digital and physical grading report",
      "Global online certificate verification",
    ],
  },
  {
    id: "cap-06",
    number: "06",
    title: "High-Volume Private Label & OEM",
    subtitle: "Scalable B2B Commerce",
    description: "Dedicated production lines for retail chains, private labels, and corporate accounts with bespoke packaging and logistics.",
    badge: "50,000+ Units/Mo",
    features: [
      "Custom laser logo engraving & assay stamping",
      "Fulfillment packaging with branded presentation boxes",
      "Tiered wholesale volume discounts (up to 45% off)",
    ],
  },
];

export const PRODUCTS: Product[] = [
  // -------------------------------------------------------------
  // 1. TENNIS BRACELETS (Raul Diamonds Direct Studio Collection)
  // -------------------------------------------------------------
  {
    id: "sp-br-01",
    slug: "marquise-lab-diamond-tennis-bracelet-14k-gold",
    sku: "RD-BR71-MQ-1600-14Y",
    name: "Marquise Lab Grown Diamond Tennis Bracelet in 14K Gold (16 ct. tw.)",
    category: "Bracelets",
    collection: "minimalist",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/BRC-RE.3dm_1_metal_gold_polished_2689daba05.pmat_View4.png?v=1780741427",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/photta-jewelry-Bracelet-1780734845348.png?v=1780741400",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/BRC-RE.3dm_1_metal_gold_polished_2689daba05.pmat_Side.png?v=1780741427",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/BRC-RE.3dm_1_metal_gold_polished_2689daba05.pmat_Perspective.png?v=1780741428",
    ],
    description: "Elegant, graceful, and luxuriously refined. Featuring marquise-shaped lab grown diamonds that create a distinctive elongated sparkle with a timeless silhouette. Each diamond is calibrated to E–F color and VVS1 clarity to meet The Raul & Silverprism Standard.",
    material: "14K Solid Gold / 925 Sterling Silver core",
    finish: "Mirror Hand Polish with Dual Safety Clasp",
    netWeightGrams: 18.5,
    dimensions: "7.0 inches length, 4.2mm link width",
    stoneDetails: "16.00 Carats Total Weight, Marquise Cut Lab Grown Diamonds, E-F Color, VVS1 Clarity",
    hallmark: "14K / 585 / IGI Inscribed",
    retailPrice: 6920,
    wholesalePrice: 4850,
    moq: 5,
    volumeDiscounts: [
      { minQty: 10, discountPercent: 12 },
      { minQty: 25, discountPercent: 20 },
      { minQty: 50, discountPercent: 28 },
    ],
    inStock: true,
    inventoryCount: 42,
    isNew: true,
    isBestseller: true,
    diamondSpecs: {
      stoneType: "Lab Grown Diamond (CVD)",
      shape: "Marquise",
      caratWeight: "16.00 ct. tw.",
      colorGrade: "E–F Colorless",
      clarityGrade: "VVS1 / VVS2",
      cutGrade: "Ideal / Excellent",
      certification: "Master Atelier Batch Certificate",
    },
    variants: [
      { id: "v1", name: "14K Yellow Gold", sku: "RD-BR71-MQ-1600-14Y", inStock: true },
      { id: "v2", name: "14K White Gold", sku: "RD-BR71-MQ-1600-14W", inStock: true },
      { id: "v3", name: "14K Rose Gold", sku: "RD-BR71-MQ-1600-14R", inStock: true },
      { id: "v4", name: "925 Rhodium Sterling Silver", sku: "RD-BR71-MQ-1600-925", inStock: true },
    ],
  },
  {
    id: "sp-br-02",
    slug: "pear-lab-diamond-tennis-bracelet-14k-gold",
    sku: "RD-BR70-PE-1500-14Y",
    name: "Pear Lab Grown Diamond Tennis Bracelet in 14K Gold (15 ct. tw.)",
    category: "Bracelets",
    collection: "minimalist",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/BRC-3_RE.3dm_1_metal_gold_polished_2689daba05.pmat_View4.png?v=1780741026",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/photta-jewelry-Bracelet-1780734629939.png?v=1780741022",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/BRC-3_RE.3dm_1_metal_gold_polished_2689daba05.pmat_Side.png?v=1780741025",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/BRC-3_RE.3dm_1_metal_gold_polished_2689daba05.pmat_Perspective.png?v=1780741025",
    ],
    description: "Romantic and sculpturally graceful. Handcrafted with matching pear-cut lab grown diamonds arranged in alternating flowing symmetry. Delivers unmatched fire and brilliant refraction across every movement.",
    material: "14K Yellow Gold / 18K Solid Gold / 925 Silver",
    finish: "Ultra-Fine Precision Prong Setting",
    netWeightGrams: 17.2,
    dimensions: "7.0 inches length, 4.0mm link width",
    stoneDetails: "15.00 Carats Total Weight, Pear Cut Lab Grown Diamonds, E-F Color, VVS1 Clarity",
    hallmark: "14K / 585",
    retailPrice: 6600,
    wholesalePrice: 4620,
    moq: 5,
    volumeDiscounts: [
      { minQty: 10, discountPercent: 12 },
      { minQty: 25, discountPercent: 20 },
      { minQty: 50, discountPercent: 28 },
    ],
    inStock: true,
    inventoryCount: 38,
    isBestseller: true,
    diamondSpecs: {
      stoneType: "Lab Grown Diamond",
      shape: "Pear",
      caratWeight: "15.00 ct. tw.",
      colorGrade: "E–F Colorless",
      clarityGrade: "VVS1",
      cutGrade: "Excellent",
      certification: "IGI Verification Available",
    },
    variants: [
      { id: "v1", name: "14K Yellow Gold", sku: "RD-BR70-PE-1500-14Y", inStock: true },
      { id: "v2", name: "14K Rose Gold", sku: "RD-BR70-PE-1500-14R", inStock: true },
      { id: "v3", name: "14K White Gold", sku: "RD-BR70-PE-1500-14W", inStock: true },
    ],
  },
  {
    id: "sp-br-03",
    slug: "oval-lab-diamond-tennis-bracelet-14k-gold",
    sku: "RD-BR69-OV-1600-14Y",
    name: "Oval Lab Grown Diamond Tennis Bracelet in 14K Gold (16 ct. tw.)",
    category: "Bracelets",
    collection: "minimalist",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/BRC-2_RE.3dm_1_metal_gold_polished_2689daba05.pmat_View4.png?v=1780740378",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/photta-jewelry-Bracelet-1780734183652.png?v=1780740795",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/BRC-2_RE.3dm_1_metal_gold_polished_2689daba05.pmat_Side.png?v=1780740378",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/BRC-2_RE.3dm_1_metal_gold_polished_2689daba05.pmat_Perspective.png?v=1780740378",
    ],
    description: "Classic luxury reimagined. Featuring elongated oval-cut lab grown diamonds set in low-profile shared prongs for maximum skin contact comfort and high-luster shine.",
    material: "14K Solid Gold / 925 Silver",
    finish: "Comfort-Fit High Polish",
    netWeightGrams: 18.0,
    dimensions: "7.0 inches length, 4.3mm link width",
    stoneDetails: "16.00 Carats Total Weight, Oval Cut Lab Diamonds, E-F Color, VVS1/VVS2",
    hallmark: "14K / 585",
    retailPrice: 6760,
    wholesalePrice: 4730,
    moq: 5,
    volumeDiscounts: [
      { minQty: 10, discountPercent: 12 },
      { minQty: 25, discountPercent: 22 },
      { minQty: 50, discountPercent: 30 },
    ],
    inStock: true,
    inventoryCount: 35,
    diamondSpecs: {
      stoneType: "Lab Grown Diamond",
      shape: "Oval",
      caratWeight: "16.00 ct. tw.",
      colorGrade: "E–F",
      clarityGrade: "VVS1",
      cutGrade: "Ideal",
      certification: "Quality Assured",
    },
    variants: [
      { id: "v1", name: "14K Yellow Gold", sku: "RD-BR69-OV-1600-14Y", inStock: true },
      { id: "v2", name: "14K White Gold", sku: "RD-BR69-OV-1600-14W", inStock: true },
    ],
  },
  {
    id: "sp-br-04",
    slug: "emerald-cut-lab-diamond-tennis-bracelet-17ct",
    sku: "RD-BR68-EM-1760-14Y",
    name: "Emerald Cut Lab Grown Diamond Tennis Bracelet (17.60 ct. tw.)",
    category: "Bracelets",
    collection: "geometric-prism",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/BRC-1_RE.3dm_View4.png?v=1780738287",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/photta-jewelry-Bracelet-1780731566554.png?v=1780738428",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/BRC-1_RE.3dm_Side.png?v=1780738287",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/BRC-1_RE.3dm_Perspective.png?v=1780738287",
    ],
    description: "The epitome of architectural elegance. Step-cut emerald lab diamonds offer hall-of-mirrors reflection with crisp clean geometric lines. Engineered for both high-profile red carpet and everyday statement luxury.",
    material: "14K Solid Gold / 950 Platinum / 925 Silver",
    finish: "Channel Bar Precision Setting",
    netWeightGrams: 21.0,
    dimensions: "7.0 inches length, 5.0mm link width",
    stoneDetails: "17.60 Carats Total Weight, Emerald Step-Cut Lab Diamonds, E-F Color, VVS1",
    hallmark: "14K / 585",
    retailPrice: 7500,
    wholesalePrice: 5250,
    moq: 3,
    volumeDiscounts: [
      { minQty: 10, discountPercent: 15 },
      { minQty: 25, discountPercent: 25 },
      { minQty: 50, discountPercent: 32 },
    ],
    inStock: true,
    inventoryCount: 22,
    isBestseller: true,
    diamondSpecs: {
      stoneType: "Lab Grown Diamond (HPHT/CVD)",
      shape: "Emerald",
      caratWeight: "17.60 ct. tw.",
      colorGrade: "E–F Colorless",
      clarityGrade: "VVS1",
      cutGrade: "Superb Step Cut",
      certification: "Certified",
    },
    variants: [
      { id: "v1", name: "14K Yellow Gold", sku: "RD-BR68-EM-1760-14Y", inStock: true },
      { id: "v2", name: "14K White Gold", sku: "RD-BR68-EM-1760-14W", inStock: true },
    ],
  },

  // -------------------------------------------------------------
  // 2. ENGAGEMENT RINGS & SOLITAIRES (IGI Graded)
  // -------------------------------------------------------------
  {
    id: "sp-er-01",
    slug: "round-lab-diamond-solitaire-engagement-ring-150ct",
    sku: "RD-ER-SOLR25-RD-150-14Y",
    name: "Round Lab Grown Diamond Solitaire Engagement Ring (1.50 ct.)",
    category: "Rings",
    collection: "bridal-heirlooms",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605197.3dm_1_metal_gold_polished_2689daba05.pmat_View3.png?v=1780292226",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605197.3dm_1_metal_gold_polished_2689daba05.pmat_View1.png?v=1780292226",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605197.3dm_1_metal_gold_polished_2689daba05.pmat_Side.png?v=1780292226",
    ],
    description: "The quintessence of everlasting commitment. Featuring an IGI certified 1.50 Carat Round Brilliant center diamond secured in 4 delicate claw prongs with a tapered comfort band. Crafted with precision laser-level calibration.",
    material: "14K Yellow Gold / 18K Solid Gold / 950 Platinum",
    finish: "Mirror Polish Band with Petite Four-Claw Setting",
    netWeightGrams: 3.8,
    dimensions: "Band width: 1.8mm, Ring Size US 4-10 available",
    stoneDetails: "1.50 Carat Round Brilliant, IGI Certified, E Color, VVS2 Clarity, Ideal Cut",
    hallmark: "14K / IGI LG Laser Inscribed",
    retailPrice: 1090,
    wholesalePrice: 760,
    moq: 5,
    volumeDiscounts: [
      { minQty: 10, discountPercent: 10 },
      { minQty: 25, discountPercent: 18 },
      { minQty: 50, discountPercent: 25 },
    ],
    inStock: true,
    inventoryCount: 50,
    isNew: true,
    isBestseller: true,
    diamondSpecs: {
      stoneType: "Lab Grown Diamond",
      shape: "Round",
      caratWeight: "1.50 Ct",
      colorGrade: "E (Colorless)",
      clarityGrade: "VVS2",
      cutGrade: "Ideal Cut",
      certification: "IGI Graded with Certificate",
    },
    variants: [
      { id: "v1", name: "14K Yellow Gold - Size 6", sku: "RD-ER-SOLR25-14Y-6", inStock: true },
      { id: "v2", name: "14K White Gold - Size 6", sku: "RD-ER-SOLR25-14W-6", inStock: true },
      { id: "v3", name: "14K Rose Gold - Size 6", sku: "RD-ER-SOLR25-14R-6", inStock: true },
      { id: "v4", name: "950 Platinum - Size 6", sku: "RD-ER-SOLR25-PL-6", inStock: true },
    ],
  },
  {
    id: "sp-er-02",
    slug: "round-lab-diamond-bezel-engagement-ring-150ct",
    sku: "RD-ER-BZ8-RD-150-14Y",
    name: "Round Lab Grown Diamond Modern Bezel Engagement Ring (1.50 ct.)",
    category: "Rings",
    collection: "bridal-heirlooms",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605191.3dm_1_metal_gold_polished_2689daba05.pmat_View3.png?v=1780291875",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605191.3dm_1_metal_gold_polished_2689daba05.pmat_View1.png?v=1780291875",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605191.3dm_1_metal_gold_polished_2689daba05.pmat_Side.png?v=1780291875",
    ],
    description: "Sleek, snag-free architectural bezel setting that envelopes an IGI graded 1.50ct round diamond. Designed for active lifestyles desiring a clean, contemporary aesthetic.",
    material: "14K Solid Gold / 950 Platinum",
    finish: "Full Bezel Frame with Satin Edge",
    netWeightGrams: 4.2,
    dimensions: "Band width: 2.0mm, Bezel depth: 5.5mm",
    stoneDetails: "1.50 Carat Round Brilliant, IGI Certified, E Color, VVS1 Clarity",
    hallmark: "14K / IGI Laser Inscribed",
    retailPrice: 1290,
    wholesalePrice: 900,
    moq: 5,
    volumeDiscounts: [
      { minQty: 10, discountPercent: 12 },
      { minQty: 25, discountPercent: 20 },
    ],
    inStock: true,
    inventoryCount: 30,
    diamondSpecs: {
      stoneType: "Lab Grown Diamond",
      shape: "Round",
      caratWeight: "1.50 Ct",
      colorGrade: "E",
      clarityGrade: "VVS1",
      cutGrade: "Ideal",
      certification: "IGI Certified",
    },
    variants: [
      { id: "v1", name: "14K Yellow Gold", sku: "RD-ER-BZ8-14Y", inStock: true },
      { id: "v2", name: "14K White Gold", sku: "RD-ER-BZ8-14W", inStock: true },
    ],
  },
  {
    id: "sp-er-03",
    slug: "emerald-cut-lab-diamond-side-stone-ring",
    sku: "RD-ER-SOLR23-EM-150-14Y",
    name: "Emerald Cut Lab Grown Diamond Side Stone Engagement Ring (1.50 ct.)",
    category: "Rings",
    collection: "geometric-prism",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605129.3dm_1_metal_gold_polished_2689daba05.pmat_View3.png?v=1780289879",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605129.3dm_1_metal_gold_polished_2689daba05.pmat_View1.png?v=1780289879",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605129.3dm_1_metal_gold_polished_2689daba05.pmat_Side.png?v=1780289879",
    ],
    description: "A commanding 1.50ct emerald-cut center stone accented with twin trapezoid side stones. Offers mesmerizing depth and clarity characteristic of royal heirloom jewellery.",
    material: "14K Solid Gold / 18K / Platinum",
    finish: "High Mirror Polish Three-Stone Mount",
    netWeightGrams: 4.5,
    dimensions: "Band width: 2.1mm",
    stoneDetails: "1.50 Ct Center Emerald Cut + 0.40 Ct Accent Trapezes, E/F Color, VVS1",
    hallmark: "14K / IGI Certificate Included",
    retailPrice: 970,
    wholesalePrice: 680,
    moq: 5,
    volumeDiscounts: [
      { minQty: 10, discountPercent: 10 },
      { minQty: 25, discountPercent: 18 },
    ],
    inStock: true,
    inventoryCount: 25,
    diamondSpecs: {
      stoneType: "Lab Grown Diamond",
      shape: "Emerald",
      caratWeight: "1.90 ct. tw.",
      colorGrade: "E–F",
      clarityGrade: "VVS1",
      cutGrade: "Excellent",
      certification: "IGI Certified",
    },
    variants: [
      { id: "v1", name: "14K Yellow Gold", sku: "RD-ER-SOLR23-14Y", inStock: true },
      { id: "v2", name: "14K Rose Gold", sku: "RD-ER-SOLR23-14R", inStock: true },
    ],
  },
  {
    id: "sp-er-04",
    slug: "pear-marquise-toi-et-moi-engagement-ring",
    sku: "RD-ER-TETM8-200-14Y",
    name: "Pear & Marquise Lab Grown Diamond Toi et Moi Engagement Ring (2.00 ct. tw.)",
    category: "Rings",
    collection: "bridal-heirlooms",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605394.3dm_1_metal_gold_polished_2689daba05.pmat_View3.png?v=1780286382",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605394.3dm_1_metal_gold_polished_2689daba05.pmat_View1.png?v=1780286382",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605394.3dm_1_metal_gold_polished_2689daba05.pmat_Side.png?v=1780286382",
    ],
    description: "Two souls, one union. 'Toi et Moi' combines a 1.00ct pear-cut diamond and a 1.00ct marquise-cut diamond nestled harmoniously in a curved bypass shank. High demand viral silhouette.",
    material: "14K Solid Gold / 925 Silver option",
    finish: "Sculpted Bypass Comfort Band",
    netWeightGrams: 4.1,
    dimensions: "Band width: 2.2mm",
    stoneDetails: "2.00 Carats Total Weight, Pear & Marquise Diamond Pair, E-F Color, VVS1",
    hallmark: "14K / IGI Laser Inscribed",
    retailPrice: 1260,
    wholesalePrice: 880,
    moq: 5,
    volumeDiscounts: [
      { minQty: 10, discountPercent: 12 },
      { minQty: 25, discountPercent: 20 },
    ],
    inStock: true,
    inventoryCount: 28,
    isBestseller: true,
    diamondSpecs: {
      stoneType: "Lab Grown Diamond",
      shape: "Toi et Moi (Pear + Marquise)",
      caratWeight: "2.00 ct. tw.",
      colorGrade: "E–F",
      clarityGrade: "VVS1",
      cutGrade: "Ideal",
      certification: "IGI Certified",
    },
    variants: [
      { id: "v1", name: "14K Yellow Gold", sku: "RD-ER-TETM8-14Y", inStock: true },
      { id: "v2", name: "14K White Gold", sku: "RD-ER-TETM8-14W", inStock: true },
    ],
  },
  {
    id: "sp-er-05",
    slug: "emerald-cut-toi-et-moi-engagement-ring",
    sku: "RD-ER-TETM10-150-14Y",
    name: "Emerald Cut & Pear Lab Grown Diamond Toi et Moi Ring in 14K Gold",
    category: "Rings",
    collection: "geometric-prism",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605399.3dm_1_metal_gold_polished_2689daba05.pmat_View3.png?v=1780288015",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605399.3dm_1_metal_gold_polished_2689daba05.pmat_View1.png?v=1780288015",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605399.3dm_1_metal_gold_polished_2689daba05.pmat_Side.png?v=1780288015",
    ],
    description: "Striking juxtaposition of an emerald-cut step diamond with a teardrop pear diamond. Modernist glamour with bespoke hand setting.",
    material: "14K Solid Gold",
    finish: "Bespoke Contour Setting",
    netWeightGrams: 3.9,
    dimensions: "Band width: 2.0mm",
    stoneDetails: "1.50 Ct Total Weight, Emerald + Pear Combo, E Color, VVS1",
    hallmark: "14K / IGI Certificate",
    retailPrice: 1220,
    wholesalePrice: 850,
    moq: 5,
    volumeDiscounts: [{ minQty: 10, discountPercent: 12 }],
    inStock: true,
    inventoryCount: 20,
    diamondSpecs: {
      stoneType: "Lab Grown Diamond",
      shape: "Emerald & Pear",
      caratWeight: "1.50 ct. tw.",
      colorGrade: "E Colorless",
      clarityGrade: "VVS1",
      cutGrade: "Excellent",
      certification: "Certified",
    },
    variants: [
      { id: "v1", name: "14K Yellow Gold", sku: "RD-ER-TETM10-14Y", inStock: true },
      { id: "v2", name: "14K White Gold", sku: "RD-ER-TETM10-14W", inStock: true },
    ],
  },
  {
    id: "sp-er-06",
    slug: "pear-lab-diamond-bezel-engagement-ring",
    sku: "RD-ER-BZ6-PE-150-14Y",
    name: "Pear Lab Grown Diamond Bezel Engagement Ring in 14K Gold (1.50 ct.)",
    category: "Rings",
    collection: "sculpted-silver",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605127.3dm_1_metal_gold_polished_2689daba05.pmat_View3.png?v=1780289478",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605127.3dm_1_metal_gold_polished_2689daba05.pmat_View1.png?v=1780289478",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605127.3dm_1_metal_gold_polished_2689daba05.pmat_Side.png?v=1780289478",
    ],
    description: "East-west orientation pear diamond framed by a seamless bezel setting. An ergonomic, avant-garde design celebrating organic fluidity.",
    material: "14K Yellow Gold",
    finish: "Flush Mirror Polish",
    netWeightGrams: 3.7,
    dimensions: "Band width: 1.9mm",
    stoneDetails: "1.50 Ct Pear Cut, E-F Color, VVS1",
    hallmark: "14K / IGI Graded",
    retailPrice: 930,
    wholesalePrice: 650,
    moq: 5,
    volumeDiscounts: [{ minQty: 10, discountPercent: 10 }],
    inStock: true,
    inventoryCount: 32,
    diamondSpecs: {
      stoneType: "Lab Grown Diamond",
      shape: "Pear",
      caratWeight: "1.50 Ct",
      colorGrade: "E–F",
      clarityGrade: "VVS1",
      cutGrade: "Ideal",
      certification: "IGI Report",
    },
    variants: [
      { id: "v1", name: "14K Yellow Gold", sku: "RD-ER-BZ6-14Y", inStock: true },
      { id: "v2", name: "14K White Gold", sku: "RD-ER-BZ6-14W", inStock: true },
    ],
  },
  {
    id: "sp-er-07",
    slug: "floral-lab-diamond-statement-ring",
    sku: "RD-ER-VDR38-MX-100-14Y",
    name: "Lab Grown Diamond High-Jewellery Floral Statement Ring in 14K Gold",
    category: "Rings",
    collection: "bridal-heirlooms",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605318.3dm_View3.png?v=1780285341",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605318.3dm_View1.png?v=1780285341",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605318.3dm_Side.png?v=1780285341",
    ],
    description: "An intricate bloom of marquise and pear lab diamonds arranged in petal symmetry around a central solitaire. Masterclass in micro-pavé setting.",
    material: "14K Yellow Gold",
    finish: "Multi-Tiered Floral Prong Setting",
    netWeightGrams: 5.8,
    dimensions: "Crown diameter: 18mm",
    stoneDetails: "3.50 ct. tw. Mixed Shape Diamonds, E-F Color, VVS1",
    hallmark: "14K / 585",
    retailPrice: 3100,
    wholesalePrice: 2170,
    moq: 3,
    volumeDiscounts: [{ minQty: 10, discountPercent: 15 }],
    inStock: true,
    inventoryCount: 15,
    diamondSpecs: {
      stoneType: "Lab Grown Diamond",
      shape: "Mixed Floral",
      caratWeight: "3.50 ct. tw.",
      colorGrade: "E–F",
      clarityGrade: "VVS1",
      cutGrade: "Excellent",
      certification: "Atelier Verified",
    },
    variants: [
      { id: "v1", name: "14K Yellow Gold", sku: "RD-ER-VDR38-14Y", inStock: true },
    ],
  },

  // -------------------------------------------------------------
  // 3. WEDDING BANDS
  // -------------------------------------------------------------
  {
    id: "sp-wb-01",
    slug: "faceted-geometric-wedding-band-14k",
    sku: "RD-WB102-14Y",
    name: "Faceted Geometric Wedding Band in 14K Yellow Gold",
    category: "Rings",
    collection: "geometric-prism",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605282.3dm_1_metal_gold_polished_2689daba05.pmat_View3.png?v=1780303477",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605282.3dm_1_metal_gold_polished_2689daba05.pmat_View1.png?v=1780303477",
    ],
    description: "Prismatic honeycomb facets catch ambient light at every angle. Sculpted for stacking flush against engagement solitaires.",
    material: "Solid 14K Gold / 925 Sterling Silver",
    finish: "Faceted Mirror Polish",
    netWeightGrams: 3.5,
    dimensions: "Band width: 3.0mm, Thickness: 1.8mm",
    stoneDetails: "Solid Gold (No Stones)",
    hallmark: "14K / 585",
    retailPrice: 640,
    wholesalePrice: 440,
    moq: 10,
    volumeDiscounts: [
      { minQty: 25, discountPercent: 15 },
      { minQty: 50, discountPercent: 25 },
    ],
    inStock: true,
    inventoryCount: 65,
    variants: [
      { id: "v1", name: "14K Yellow Gold", sku: "RD-WB102-14Y", inStock: true },
      { id: "v2", name: "14K White Gold", sku: "RD-WB102-14W", inStock: true },
    ],
  },
  {
    id: "sp-wb-02",
    slug: "round-diamond-open-wedding-band",
    sku: "RD-WB99-RD-015-14Y",
    name: "Round Lab Grown Diamond Open Contour Wedding Band in 14K Gold",
    category: "Rings",
    collection: "bridal-heirlooms",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605240.3dm_View3.png?v=1780292569",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605240.3dm_View1.png?v=1780292569",
    ],
    description: "Delicate open-cuff silhouette featuring round lab diamonds on both finials, allowing larger center solitaire rings to seat comfortably without spinning.",
    material: "14K Yellow Gold",
    finish: "Prong Set Open Gap",
    netWeightGrams: 2.6,
    dimensions: "Gap: 4.5mm, Band: 1.6mm",
    stoneDetails: "0.15 ct. tw. Round Brilliant Lab Diamonds, E-F Color, VVS1",
    hallmark: "14K / 585",
    retailPrice: 355,
    wholesalePrice: 245,
    moq: 10,
    volumeDiscounts: [{ minQty: 25, discountPercent: 15 }],
    inStock: true,
    inventoryCount: 45,
    diamondSpecs: {
      stoneType: "Lab Grown Diamond",
      shape: "Round",
      caratWeight: "0.15 ct. tw.",
      colorGrade: "E–F",
      clarityGrade: "VVS1",
      cutGrade: "Ideal",
      certification: "Included",
    },
    variants: [
      { id: "v1", name: "14K Yellow Gold", sku: "RD-WB99-14Y", inStock: true },
    ],
  },

  // -------------------------------------------------------------
  // 4. TENNIS NECKLACES & PENDANTS
  // -------------------------------------------------------------
  {
    id: "sp-nk-01",
    slug: "pear-oval-lab-diamond-tennis-drop-necklace",
    sku: "RD-NK49-MX-1400-14Y",
    name: "Pear & Oval Lab Grown Diamond Tennis Drop Necklace in 14K Yellow Gold",
    category: "Necklaces",
    collection: "bridal-heirlooms",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJN2605198.3dm_View5.png?v=1780375144",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJN2605198.3dm_View3.png?v=1780375144",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJN2605198.3dm_View10.png?v=1780375144",
    ],
    description: "A showstopping graduated tennis necklace terminating in an opulent teardrop pear diamond. Hand-articulated links drape smoothly over the collarbone without twisting.",
    material: "14K Solid Yellow Gold",
    finish: "Individually Articulated Cast Links with Concealed Clasp",
    netWeightGrams: 28.0,
    dimensions: "16 inches choker with 2-inch drop",
    stoneDetails: "14.00 Carats Total Weight, Pear and Oval Diamonds, E-F Color, VVS1",
    hallmark: "14K / IGI Certificate",
    retailPrice: 7120,
    wholesalePrice: 4980,
    moq: 2,
    volumeDiscounts: [
      { minQty: 5, discountPercent: 12 },
      { minQty: 10, discountPercent: 20 },
    ],
    inStock: true,
    inventoryCount: 16,
    isBestseller: true,
    diamondSpecs: {
      stoneType: "Lab Grown Diamond",
      shape: "Pear & Oval Graduated",
      caratWeight: "14.00 ct. tw.",
      colorGrade: "E–F Colorless",
      clarityGrade: "VVS1",
      cutGrade: "Ideal",
      certification: "Full IGI Report",
    },
    variants: [
      { id: "v1", name: "14K Yellow Gold", sku: "RD-NK49-14Y", inStock: true },
      { id: "v2", name: "14K White Gold", sku: "RD-NK49-14W", inStock: true },
    ],
  },
  {
    id: "sp-nk-02",
    slug: "marquise-lab-diamond-tennis-necklace",
    sku: "RD-NK48-MQ-650-14Y",
    name: "Marquise Lab Grown Diamond Tennis Necklace in 14K Gold (6.50 ct.)",
    category: "Necklaces",
    collection: "minimalist",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJN2605187_10PT_.3dm_View4.png?v=1780372977",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJN2605187_10PT_.3dm_View2.png?v=1780372976",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJN2605187_10PT_.3dm_View1.png?v=1780372977",
    ],
    description: "A continuous ribbon of marquise cut lab diamonds providing modern, elongated brilliance around the entire neck. Exceptional everyday luxury statement.",
    material: "14K Solid Gold",
    finish: "Four-Prong High Polish Articulated Links",
    netWeightGrams: 22.5,
    dimensions: "16 inches length",
    stoneDetails: "6.50 Carats Total Weight, Marquise Diamonds, E-F Color, VVS1",
    hallmark: "14K / 585",
    retailPrice: 5380,
    wholesalePrice: 3760,
    moq: 3,
    volumeDiscounts: [
      { minQty: 5, discountPercent: 12 },
      { minQty: 10, discountPercent: 20 },
    ],
    inStock: true,
    inventoryCount: 20,
    diamondSpecs: {
      stoneType: "Lab Grown Diamond",
      shape: "Marquise",
      caratWeight: "6.50 ct. tw.",
      colorGrade: "E–F",
      clarityGrade: "VVS1",
      cutGrade: "Excellent",
      certification: "Atelier Graded",
    },
    variants: [
      { id: "v1", name: "14K Yellow Gold", sku: "RD-NK48-14Y", inStock: true },
    ],
  },
  {
    id: "sp-nk-03",
    slug: "emerald-cut-lab-diamond-tennis-necklace",
    sku: "RD-NK47-EM-830-14Y",
    name: "Emerald Cut Lab Grown Diamond Tennis Necklace in 14K Gold (8.30 ct.)",
    category: "Necklaces",
    collection: "geometric-prism",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJN2605185_10PT_.3dm_View3.png?v=1780372061",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJN2605185_10PT_.3dm_View2.png?v=1780372061",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJN2605185_10PT_.3dm_View1.png?v=1780372061",
    ],
    description: "East-west set emerald-cut lab diamonds creating an unbroken band of mirror-step facets. Understated, ultra-luxurious, and contemporary.",
    material: "14K Solid Yellow Gold / 950 Platinum",
    finish: "Channel Setting with Double Safety Clasp",
    netWeightGrams: 24.0,
    dimensions: "16.5 inches length",
    stoneDetails: "8.30 Carats Total Weight, Emerald Cut, E-F Color, VVS1",
    hallmark: "14K / 585",
    retailPrice: 5940,
    wholesalePrice: 4150,
    moq: 3,
    volumeDiscounts: [
      { minQty: 5, discountPercent: 12 },
      { minQty: 10, discountPercent: 22 },
    ],
    inStock: true,
    inventoryCount: 18,
    diamondSpecs: {
      stoneType: "Lab Grown Diamond",
      shape: "Emerald",
      caratWeight: "8.30 ct. tw.",
      colorGrade: "E–F",
      clarityGrade: "VVS1",
      cutGrade: "Ideal Step Cut",
      certification: "Included",
    },
    variants: [
      { id: "v1", name: "14K Yellow Gold", sku: "RD-NK47-14Y", inStock: true },
      { id: "v2", name: "14K White Gold", sku: "RD-NK47-14W", inStock: true },
    ],
  },
  {
    id: "sp-pen-01",
    slug: "round-lab-diamond-drop-pendant-necklace",
    sku: "RD-NK46-RD-025-14Y",
    name: "Round Lab Grown Diamond Drop Solitaire Pendant in 14K Gold",
    category: "Pendants",
    collection: "minimalist",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJN2605174a.3dm_View4.png?v=1780371237",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJN2605174a.3dm_View1.png?v=1780371237",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJN2605174a.3dm_View2.png?v=1780371236",
    ],
    description: "A pure round brilliant diamond suspended from a polished drop bail on an adjustable 14K wheat chain. Essential daily heirloom.",
    material: "14K Yellow Gold",
    finish: "Mirror Polish with Adjustable Chain",
    netWeightGrams: 3.2,
    dimensions: "Chain: 16-18 inches adjustable",
    stoneDetails: "0.75 Carat Round Brilliant, E Color, VVS1",
    hallmark: "14K / 585",
    retailPrice: 995,
    wholesalePrice: 690,
    moq: 10,
    volumeDiscounts: [
      { minQty: 25, discountPercent: 15 },
      { minQty: 50, discountPercent: 25 },
    ],
    inStock: true,
    inventoryCount: 60,
    diamondSpecs: {
      stoneType: "Lab Grown Diamond",
      shape: "Round",
      caratWeight: "0.75 Ct",
      colorGrade: "E",
      clarityGrade: "VVS1",
      cutGrade: "Ideal",
      certification: "IGI Certificate",
    },
    variants: [
      { id: "v1", name: "14K Yellow Gold", sku: "RD-NK46-14Y", inStock: true },
      { id: "v2", name: "14K White Gold", sku: "RD-NK46-14W", inStock: true },
    ],
  },
  {
    id: "sp-pen-02",
    slug: "lab-diamond-honeycomb-pendant-necklace",
    sku: "RD-NK43-RD-025-14Y",
    name: "Lab Grown Diamond Geometric Honeycomb Pendant in 14K Gold",
    category: "Pendants",
    collection: "geometric-prism",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJN2605078a.3dm_1_metal_gold_polished_2689daba05.pmat_View4.png?v=1780319310",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJN2605078a.3dm_1_metal_gold_polished_2689daba05.pmat_View1.png?v=1780319310",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJN2605078a.3dm_1_metal_gold_polished_2689daba05.pmat_View5.png?v=1780319310",
    ],
    description: "Hexagonal cells paved with micro-round lab diamonds, celebrating structural elegance and biomimicry.",
    material: "14K Yellow Gold",
    finish: "Micro-Pavé Honeycomb Framework",
    netWeightGrams: 4.6,
    dimensions: "Pendant: 20mm x 16mm",
    stoneDetails: "1.20 ct. tw. Round Diamonds, E-F Color, VVS1",
    hallmark: "14K / 585",
    retailPrice: 1800,
    wholesalePrice: 1260,
    moq: 5,
    volumeDiscounts: [{ minQty: 10, discountPercent: 12 }],
    inStock: true,
    inventoryCount: 30,
    diamondSpecs: {
      stoneType: "Lab Grown Diamond",
      shape: "Honeycomb Pavé",
      caratWeight: "1.20 ct. tw.",
      colorGrade: "E–F",
      clarityGrade: "VVS1",
      cutGrade: "Excellent",
      certification: "Included",
    },
    variants: [
      { id: "v1", name: "14K Yellow Gold", sku: "RD-NK43-14Y", inStock: true },
    ],
  },
  {
    id: "sp-pen-03",
    slug: "marquise-lab-diamond-station-necklace",
    sku: "RD-NK40-MQ-140-14Y",
    name: "Marquise Lab Grown Diamond Station Necklace in 14K Gold",
    category: "Necklaces",
    collection: "sculpted-silver",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJN2605040a.3dm_View3.png?v=1780316943",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJN2605040a.3dm_View2.png?v=1780316943",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJN2605040a.3dm_View6.png?v=1780316943",
    ],
    description: "Seven marquise diamonds spaced along a fine cable chain like stars in constellation. Effortless layered elegance.",
    material: "14K Yellow Gold",
    finish: "Bezel Station Wirework",
    netWeightGrams: 3.8,
    dimensions: "18 inches with adjustment hoops at 16, 17, and 18",
    stoneDetails: "1.40 ct. tw. Marquise Diamonds, E-F Color, VVS1",
    hallmark: "14K / 585",
    retailPrice: 1450,
    wholesalePrice: 1015,
    moq: 5,
    volumeDiscounts: [{ minQty: 10, discountPercent: 12 }],
    inStock: true,
    inventoryCount: 40,
    diamondSpecs: {
      stoneType: "Lab Grown Diamond",
      shape: "Marquise",
      caratWeight: "1.40 ct. tw.",
      colorGrade: "E–F",
      clarityGrade: "VVS1",
      cutGrade: "Ideal",
      certification: "Atelier Verified",
    },
    variants: [
      { id: "v1", name: "14K Yellow Gold", sku: "RD-NK40-14Y", inStock: true },
    ],
  },

  // -------------------------------------------------------------
  // 5. SIGNATURE SCULPTED SILVER PIECES
  // -------------------------------------------------------------
  {
    id: "sp-01",
    slug: "prism-geometric-sterling-silver-cuff",
    sku: "SP-BRC-001",
    name: "Prism Geometric Sterling Silver Cuff",
    category: "Bracelets",
    collection: "geometric-prism",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/BRC-1_RE.3dm_View4.png?v=1780738287",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/BRC-1_RE.3dm_Side.png?v=1780738287",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/BRC-1_RE.3dm_Perspective.png?v=1780738287",
    ],
    description: "Forged in solid 925 sterling silver with angular bevels that catch ambient light. An industrial silhouette with ergonomic oval wrist shaping.",
    material: "Solid 925 Sterling Silver with E-coating",
    finish: "Mirror Polish exterior, satin interior",
    netWeightGrams: 34.5,
    dimensions: "Internal circumference: 16.5cm, Opening: 2.8cm",
    stoneDetails: "Metal only (no stones)",
    hallmark: "925 Silverprism Assay Stamp",
    retailPrice: 185,
    wholesalePrice: 110,
    moq: 10,
    volumeDiscounts: [
      { minQty: 25, discountPercent: 5 },
      { minQty: 50, discountPercent: 10 },
      { minQty: 100, discountPercent: 18 },
    ],
    inStock: true,
    inventoryCount: 140,
    variants: [
      { id: "v-01", name: "Sterling Silver", sku: "SP-BRC-001-SS", inStock: true },
      { id: "v-02", name: "18K Gold Vermeil", sku: "SP-BRC-001-GV", inStock: true },
    ],
  },
  {
    id: "sp-02",
    slug: "lumina-solitaire-moissanite-ring",
    sku: "SP-RNG-002",
    name: "Lumina Solitaire Moissanite Silver Ring",
    category: "Rings",
    collection: "bridal-heirlooms",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605145.3dm_1_metal_gold_polished_2689daba05.pmat_View3.png?v=1780290583",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605145.3dm_1_metal_gold_polished_2689daba05.pmat_View1.png?v=1780290583",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJR2605145.3dm_1_metal_gold_polished_2689daba05.pmat_Side.png?v=1780290583",
    ],
    description: "An exceptional 2.0-carat equivalent round brilliant stone mounted in a tapered 6-prong silver basket. Precision faceted for maximum dispersion.",
    material: "925 Sterling Silver with Heavy Rhodium Barrier",
    finish: "Platinum-grade high polish",
    netWeightGrams: 4.8,
    dimensions: "Band width: 2.2mm, Stone: 8.0mm round",
    stoneDetails: "2.0 Ct Round Brilliant Lab Gemstone, D/VVS1 equivalent",
    hallmark: "925 + Maker's Seal",
    retailPrice: 220,
    wholesalePrice: 130,
    moq: 15,
    volumeDiscounts: [
      { minQty: 30, discountPercent: 6 },
      { minQty: 60, discountPercent: 12 },
      { minQty: 120, discountPercent: 20 },
    ],
    inStock: true,
    inventoryCount: 95,
    variants: [
      { id: "v-03", name: "Size 6 (US)", sku: "SP-RNG-002-6", inStock: true },
      { id: "v-04", name: "Size 7 (US)", sku: "SP-RNG-002-7", inStock: true },
      { id: "v-05", name: "Size 8 (US)", sku: "SP-RNG-002-8", inStock: true },
    ],
  },
  {
    id: "sp-03",
    slug: "vanguard-hexagonal-pendant-necklace",
    sku: "SP-NCK-003",
    name: "Vanguard Hexagonal Pendant Necklace",
    category: "Necklaces",
    collection: "geometric-prism",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJN2605125a.3dm_View1.png?v=1780320814",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJN2605125a.3dm_View6.png?v=1780320814",
    ],
    description: "Engineered around a stepped hexagonal frame, suspended from a sturdy 1.5mm wheat chain. Subtle micro-grooves diffuse reflections.",
    material: "Solid 925 Sterling Silver",
    finish: "Dual finish: sandblasted recess with mirror-polished rim",
    netWeightGrams: 12.2,
    dimensions: "Pendant: 22mm x 18mm, Chain: 50cm + 5cm extension",
    stoneDetails: "No stones",
    hallmark: "925 Assay Certified",
    retailPrice: 165,
    wholesalePrice: 95,
    moq: 12,
    volumeDiscounts: [
      { minQty: 25, discountPercent: 5 },
      { minQty: 50, discountPercent: 12 },
    ],
    inStock: true,
    inventoryCount: 80,
    variants: [
      { id: "v-06", name: "50cm Chain", sku: "SP-NCK-003-50", inStock: true },
    ],
  },
  {
    id: "sp-04",
    slug: "sculpted-wave-statement-earrings",
    sku: "SP-EAR-004",
    name: "Sculpted Wave Statement Earrings",
    category: "Earrings",
    collection: "sculpted-silver",
    images: [
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJN2605043ca.3dm_1_metal_gold_polished_2689daba05.pmat_View3.png?v=1780318004",
      "https://cdn.shopify.com/s/files/1/0990/2391/3092/files/MJN2605043ca.3dm_1_metal_gold_polished_2689daba05.pmat_View2.png?v=1780318004",
    ],
    description: "Bold ribbons of sterling silver that twist in three dimensions. Lightweight hollow-core casting technique ensures day-long wearability without ear fatigue.",
    material: "925 Sterling Silver (Hypoallergenic Titanium Posts)",
    finish: "Mirror Polish",
    netWeightGrams: 8.6,
    dimensions: "Length: 42mm, Width: 18mm",
    stoneDetails: "Metal only",
    hallmark: "925 Post Stamp",
    retailPrice: 140,
    wholesalePrice: 80,
    moq: 20,
    volumeDiscounts: [
      { minQty: 40, discountPercent: 8 },
      { minQty: 100, discountPercent: 18 },
    ],
    inStock: true,
    inventoryCount: 110,
    variants: [
      { id: "v-07", name: "Silver Pair", sku: "SP-EAR-004-SS", inStock: true },
    ],
  },
];

/**
 * Helpers
 */
export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
}

export function getProductsByCollection(colSlug: string): Product[] {
  return PRODUCTS.filter((p) => p.collection === colSlug);
}

export function calculateWholesaleItemPrice(product: Product, quantity: number): number {
  const baseWholesale = product.wholesalePrice;
  const applicableDiscount = product.volumeDiscounts
    .filter((d) => quantity >= d.minQty)
    .sort((a, b) => b.minQty - a.minQty)[0];

  if (!applicableDiscount) {
    return baseWholesale;
  }

  const multiplier = (100 - applicableDiscount.discountPercent) / 100;
  return Math.round(baseWholesale * multiplier);
}

export function formatINR(val: number): string {
  return "$" + val.toLocaleString("en-US");
}

