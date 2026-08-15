const SITE_DATA = {
  businessName: "TintaLab Print Hub",
  shortName: "TintaLab",
  tagline: "Print smart. Make it memorable.",
  subTagline: "Documents, photos, rush IDs, Sintra displays, ref magnets, lamination, stickers, and personalized print projects.",
  address: "Maningcol, Pinamalayan, Oriental Mindoro",
  phone: "0936 978 4317",
  email: "tintalabprinthub@gmail.com",
  facebookUrl: "https://www.facebook.com/profile.php?id=61591481322961",
  messengerUrl: "https://m.me/61591481322961",
  mapUrl: "#",
  businessHours: "Monday–Saturday • 8:00 AM–6:00 PM",
  announcement: "Soft opening soon — sample products and new finishes are currently being prepared.",
  services: [
    {
      icon: "document",
      title: "Document Printing",
      text: "Black-and-white and colored printing for school, work, forms, reports, and everyday documents.",
      tags: ["Short", "A4", "Long"],
      action: "documentPrinting"
    },
    {
      icon: "copy",
      title: "Photocopy & Scanning",
      text: "Clean photocopies plus scanning to PDF or JPEG for easy online submission and safekeeping.",
      tags: ["B&W", "Colored", "PDF/JPEG"],
action: "copyScan"
    },
    {
      icon: "photo",
      title: "Photo Printing",
      text: "Photo prints from wallet and cute sizes up to A4, with optional premium PhotoTop finishes.",
      tags: ["Wallet", "2R–6R", "A4"],
action: "photoPrinting"
    },
    {
      icon: "id",
      title: "Rush ID Pictures",
      text: "Ready-to-print 1×1, 2×2, passport, and selected visa-photo layouts. Editing add-ons may apply.",
      tags: ["1×1", "2×2", "Passport"]
    },
    {
      icon: "sintra",
      title: "Sintra Photo Boards",
      text: "A4 printed Sintra boards with lamination already included. Add a stand, back hook, or corner protectors to match how you want to display it.",
      tags: ["A4", "250μ Lamination", "₱150"],
      action: "sintra"
    },
    {
      icon: "magnet",
      title: "Ref Magnets",
      text: "Personalized photo magnets for gifts, souvenirs, celebrations, and everyday memories.",
      tags: ["Personalized", "Souvenir", "Gift-ready"]
    },
    {
      icon: "laminate",
      title: "Lamination",
      text: "Protection for IDs, documents, photos, certificates, and frequently handled materials.",
      tags: ["ID", "A5", "A4"]
    },
    {
      icon: "sticker",
      title: "Sticker Printing",
      text: "Glossy and matte sticker options for labels, school names, small-business packaging, and crafts.",
      tags: ["Glossy", "Matte", "Labels"]
    }
  ],
  sintraConfigurator: {
    title: "A4 Sintra Photo Board",
    basePrice: 150,
    description: "A thick, durable display board made for photos, artwork, signs, gifts, and personalized displays. Your design is printed with pigment ink, protected with a 250-micron laminating film, then carefully mounted on a 3 mm Sintra board for a sturdy premium finish.",
    baseNote: "Includes pigment-ink printing, 250-micron lamination, mounting on 3 mm Sintra board, and free basic image enhancement when needed.",
    sampleImage: "assets/products/sintra/sintra-05.jpg",
    specs: [
      ["Printing", "Pigment ink"],
      ["Board", "3 mm Sintra"],
      ["Protection", "250-micron lamination"],
      ["Editing", "Basic image enhancement is free"]
    ],
    addOns: [
      { id: "stand", name: "Wooden Stand", price: 20, note: "For tabletop or shelf display." },
      { id: "hook", name: "Back Hook", price: 10, note: "For hanging the board on a wall." },
      { id: "corners", name: "Corner Protectors", price: 0, note: "Optional protective corner finish — FREE." },
      { id: "branding", name: "TintaLab Mini Icon", price: -10, note: "Allow a small TintaLab icon on the lower part of the design and get ₱10 off." }
    ],
    notes: [
      "Finished size may be slightly smaller than A4 depending on the design, image ratio, and required trimming.",
      "Please send a ready-to-print design or image whenever possible.",
      "Basic image enhancement is free. More complex editing may have an additional charge depending on the requested edit.",
      "Estimated pricing applies to the standard A4 Sintra Photo Board configuration."
    ],
    priceNote: "Estimated total updates automatically as you select options. Final price will be confirmed before production."
  },
  photoSizes: [
    ["Wallet", "50.8 × 76.2 mm"],
    ["Cute / 2R", "63.5 × 88.9 mm"],
    ["3R", "89 × 127 mm"],
    ["4R", "101.6 × 152.4 mm"],
    ["5R", "127 × 177.8 mm"],
    ["6R", "152.4 × 203.2 mm"],
    ["A4", "210 × 297 mm"]
  ],
  finishes: [
    { name: "Glossy", note: "Bright shine and vivid color", className: "finish-glossy", image: "assets/products/phototop/glossy.jpg" },
  { name: "Matte", note: "Soft, low-glare finish", className: "finish-matte", image: "assets/products/phototop/matte.jpg" },
  { name: "Leather", note: "Elegant textured surface", className: "finish-leather", image: "assets/products/phototop/leather.jpg" },
  { name: "Canvas", note: "Fine art-inspired texture", className: "finish-canvas", image: "assets/products/phototop/canvas.jpg" },
  { name: "Glitter", note: "Sparkling decorative effect", className: "finish-glitter", image: "assets/products/phototop/glitter.jpg" },
  { name: "3D", note: "Eye-catching dimensional look", className: "finish-3d", image: "assets/products/phototop/3D.jpg" },
  { name: "Broken Glass", note: "Color-shifting broken-glass effect", className: "finish-holo", image: "assets/products/phototop/brokenglass.jpg" }
  ],
  gallery: [
    { title: "Anime Art Sintra Board", category: "Sintra Board", image: "assets/products/sintra/sintra-01.jpg" },
  { title: "Basketball Art Sintra Board", category: "Sintra Board", image: "assets/products/sintra/sintra-02.jpg" },
  { title: "Custom Anime Sintra Board", category: "Sintra Board", image: "assets/products/sintra/sintra-03.jpg" },
  { title: "One Piece Sintra Board", category: "Sintra Board", image: "assets/products/sintra/sintra-04.jpg" },
  { title: "Custom Sintra Board Collection", category: "Sintra Board", image: "assets/products/sintra/sintra-05.jpg" },
  { title: "Custom Laminated Signage", category: "Signage", image: "assets/products/signages/signages.jpg" }
  ]
};
