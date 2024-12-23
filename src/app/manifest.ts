import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Puto Order", // Full name of your app
    short_name: "Puto Order", // Short name for the app, used in homescreen icons
    description: "Order Puto Easily", // A brief description of the app
    start_url: "/", // Start URL when the app is launched
    theme_color: "#53B7D2", // Theme color for the app
    background_color: "#FCE18E", // Background color for the splash screen
    icons: [
      {
        src: "/icon512_maskable.png", // Path to the icon image
        sizes: "512x512", // Icon size
        type: "image/png", // Icon file type
        purpose: "maskable" // Purpose of the icon
      },
      {
        src: "/icon512_rounded.png", // Path to another icon image
        sizes: "512x512", // Icon size
        type: "image/png", // Icon file type
        purpose: "any" // Purpose of the icon
      }
    ],
    orientation: "any", // Supported orientation of the app
    display: "standalone", // Display mode for the app (standalone, fullscreen, etc.)
    dir: "auto", // Text direction (auto, ltr, rtl)
    lang: "en-US", // Language of the app
  };
}
