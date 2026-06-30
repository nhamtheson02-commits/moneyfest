import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MONEYFEST",
    short_name: "MONEYFEST",
    description: "Hiểu luật chơi, làm chủ cuộc đời.",
    start_url: "/",
    display: "standalone",
    background_color: "#070707",
    theme_color: "#D4A83F",
    icons: [
      {
        src: "/icon.png",
        sizes: "500x500",
        type: "image/png",
      },
    ],
  };
}
