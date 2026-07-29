export const siteConfig = {
  businessName: "Acme Plumbing",
  tagline: "Your Trusted Local Plumber",
  phone: "(555) 123-4567",
  email: "info@acmeplumbing.com",
  address: {
    street: "123 Main St",
    city: "Houston",
    state: "TX",
    zip: "77001",
  },
  serviceArea: "Houston, TX",
  domain: "https://example.com",
  socialLinks: {
    facebook: "",
    instagram: "",
    google: "",
    youtube: "",
  },
  formEndpoint: "https://app.galaxygrowthmedia.com/api/leads",
  logo: "/images/logo.png",
  gtmId: "",
  googleMapsEmbed: "",

  /*
    Design tokens — set once per client, applied site-wide.

    pattern: CSS class for background texture on dark/accent sections.
      Options: "pattern-dots" | "pattern-grid" | "pattern-diagonal" |
      "pattern-topography" | "pattern-waves" | "pattern-zigzag" |
      "pattern-diamonds" | "pattern-crosses" | "pattern-circuit" |
      "pattern-hexagons" | "pattern-noise" | "" (none)

    silhouette: decorative bottom-edge SVG for value/content sections.
      Options: "trees" | "cityscape" | "roofline" | "tools" | "waves" | "mountains"
  */
  pattern: "pattern-diamonds",
  silhouette: "cityscape" as const,
};
