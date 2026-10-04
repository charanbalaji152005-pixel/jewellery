const BASE = import.meta.env.BASE_URL || '/';
const cleanBase = BASE.endsWith('/') ? BASE : `${BASE}/`;

export const PRODUCTS = [
  {
    id: 1,
    name: "Phantom Edition",
    price: 20749,
    category: "RINGS & SOLITAIRES",
    heroTag: "SOLITAIRES & FINE PIECES",
    subtitle: "18K Gold Solitaire Diamond Ring",
    image: `${cleanBase}assets/images/phantom.jpg`,
    description: "A masterwork of timeless grandeur. Features a brilliant 1.5-carat round brilliant-cut solitaire diamond mounted in hand-burnished 18K yellow gold six-prong cathedral setting.",
    metal: "18K Yellow Gold",
    gemstone: "VVS1 Solitaire Diamond",
    sizes: ["6", "7", "8", "9"]
  },
  {
    id: 2,
    name: "Aurora",
    price: 38499,
    category: "HIGH JEWELLERY NECKLACES",
    heroTag: "ROYAL CHOKER & EMERALD",
    subtitle: "Diamond and Emerald Necklace on Velvet Bust",
    image: `${cleanBase}assets/images/aurora.jpg`,
    description: "Inspired by northern luminescence. A cascading arrangement of teardrop Zambian emeralds framed by round-cut diamond clusters draped in white gold.",
    metal: "18K White Gold",
    gemstone: "Zambian Emerald & Diamonds",
    sizes: ["16 in", "18 in", "20 in"]
  },
  {
    id: 3,
    name: "Heritage",
    price: 32499,
    category: "HEIRLOOM COLLECTIONS",
    heroTag: "CEYLON SAPPHIRE & GOLD",
    subtitle: "Gold Necklace with Sapphire Blue Stones",
    image: `${cleanBase}assets/images/heritage.jpg`,
    description: "A majestic tribute to royal courts. Deep Ceylon sapphires nestled amid 22K intricate filigree scrollwork with diamond halos and teardrop pendants.",
    metal: "22K Yellow Gold",
    gemstone: "Royal Ceylon Sapphires",
    sizes: ["16 in", "18 in", "20 in"]
  },
  {
    id: 4,
    name: "Nova Crystal",
    price: 14849,
    category: "TRADITIONAL EARRINGS",
    heroTag: "SOUTH SEA PEARL JHUMKAS",
    subtitle: "Gold Jhumka Earrings with Pearls",
    image: `${cleanBase}assets/images/nova.jpg`,
    description: "Sculpted heritage grace with modern poise. Intricately carved floral domes crowned with fine filigree and fringed with handpicked South Sea pearls.",
    metal: "22K Yellow Gold",
    gemstone: "South Sea Pearls & Diamonds",
    sizes: ["Standard Drop"]
  },
  {
    id: 5,
    name: "Zenith Dark",
    price: 21549,
    category: "BRACELETS & BANGLES",
    heroTag: "ROYAL GEOMETRIC KADAS",
    subtitle: "Handcrafted 22K Gold Bangles",
    image: `${cleanBase}assets/images/zenith.jpg`,
    description: "Solid structural balance meets artisan mastery. Featuring hexagonal rosette motifs carved meticulously into rich yellow gold.",
    metal: "22K Yellow Gold",
    gemstone: "Solid Gold Relief",
    sizes: ["2.4", "2.6", "2.8"]
  },
  {
    id: 6,
    name: "Lumina Gold",
    price: 24949,
    category: "FINE BRACELETS",
    heroTag: "EMERALD TENNIS BRACELET",
    subtitle: "Gold & Diamond Emerald Tennis Bracelet",
    image: `${cleanBase}assets/images/lumina.jpg`,
    description: "A continuous ribbon of pure radiance. Alternating emerald cuts and brilliant diamonds set into an articulated, flexible gold band.",
    metal: "18K Yellow Gold",
    gemstone: "Emerald & Pavé Diamonds",
    sizes: ["6.5 in", "7.0 in", "7.5 in"]
  },
  {
    id: 7,
    name: "Stellar Ultra",
    price: 26549,
    category: "STATEMENT RINGS",
    heroTag: "OXIDISED CELESTIAL PAIR",
    subtitle: "Artisan Oxidised Silver Ring Pair",
    image: `${cleanBase}assets/images/stellar.jpg`,
    description: "Raw artisanal elegance. Cast in 925 sterling silver with deep antiqued patina and hand-chiseled relief textures depicting celestial motifs.",
    metal: "925 Sterling Silver",
    gemstone: "Oxidised Silver Relief",
    sizes: ["7 & 9", "8 & 10", "Custom"]
  }
];
