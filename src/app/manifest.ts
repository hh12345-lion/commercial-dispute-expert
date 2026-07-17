import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.businessName,
    short_name: siteConfig.brandShort,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#1c2b3a",
    theme_color: "#1b5e20",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/logo",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
