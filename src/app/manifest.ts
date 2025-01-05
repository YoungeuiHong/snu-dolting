import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "스누돌팅",
    short_name: "스누돌팅",
    description: "스누돌팅",
    theme_color: "#F1F4F6",
    background_color: "#F1F4F6",
    icons: [
      {
        src: "app-icon/android/android-launchericon-512-512.png",
        sizes: "512x512",
      },
      {
        src: "app-icon/android/android-launchericon-192-192.png",
        sizes: "192x192",
      },
      {
        src: "app-icon/android/android-launchericon-144-144.png",
        sizes: "144x144",
      },
      {
        src: "app-icon/android/android-launchericon-96-96.png",
        sizes: "96x96",
      },
      {
        src: "app-icon/android/android-launchericon-72-72.png",
        sizes: "72x72",
      },
      {
        src: "app-icon/android/android-launchericon-48-48.png",
        sizes: "48x48",
      },
      {
        src: "app-icon/ios/16.png",
        sizes: "16x16",
      },
      {
        src: "app-icon/ios/20.png",
        sizes: "20x20",
      },
      {
        src: "app-icon/ios/29.png",
        sizes: "29x29",
      },
      {
        src: "app-icon/ios/32.png",
        sizes: "32x32",
      },
      {
        src: "app-icon/ios/40.png",
        sizes: "40x40",
      },
      {
        src: "app-icon/ios/50.png",
        sizes: "50x50",
      },
      {
        src: "app-icon/ios/57.png",
        sizes: "57x57",
      },
      {
        src: "app-icon/ios/58.png",
        sizes: "58x58",
      },
      {
        src: "app-icon/ios/60.png",
        sizes: "60x60",
      },
      {
        src: "app-icon/ios/64.png",
        sizes: "64x64",
      },
      {
        src: "app-icon/ios/72.png",
        sizes: "72x72",
      },
      {
        src: "app-icon/ios/76.png",
        sizes: "76x76",
      },
      {
        src: "app-icon/ios/80.png",
        sizes: "80x80",
      },
      {
        src: "app-icon/ios/87.png",
        sizes: "87x87",
      },
      {
        src: "app-icon/ios/100.png",
        sizes: "100x100",
      },
      {
        src: "app-icon/ios/114.png",
        sizes: "114x114",
      },
      {
        src: "app-icon/ios/120.png",
        sizes: "120x120",
      },
      {
        src: "app-icon/ios/128.png",
        sizes: "128x128",
      },
      {
        src: "app-icon/ios/144.png",
        sizes: "144x144",
      },
      {
        src: "app-icon/ios/152.png",
        sizes: "152x152",
      },
      {
        src: "app-icon/ios/167.png",
        sizes: "167x167",
      },
      {
        src: "app-icon/ios/180.png",
        sizes: "180x180",
      },
      {
        src: "app-icon/ios/192.png",
        sizes: "192x192",
      },
      {
        src: "app-icon/ios/256.png",
        sizes: "256x256",
      },
      {
        src: "app-icon/ios/512.png",
        sizes: "512x512",
      },
      {
        src: "app-icon/ios/1024.png",
        sizes: "1024x1024",
      },
      {
        src: "app-icon/maskable/android-launchericon-512-512.png",
        sizes: "512x512",
        purpose: "maskable",
      },
      {
        src: "app-icon/maskable/android-launchericon-192-192.png",
        sizes: "192x192",
        purpose: "maskable",
      },
      {
        src: "app-icon/maskable/android-launchericon-144-144.png",
        sizes: "144x144",
        purpose: "maskable",
      },
      {
        src: "app-icon/maskable/android-launchericon-96-96.png",
        sizes: "96x96",
        purpose: "maskable",
      },
      {
        src: "app-icon/maskable/android-launchericon-72-72.png",
        sizes: "72x72",
        purpose: "maskable",
      },
      {
        src: "app-icon/maskable/android-launchericon-48-48.png",
        sizes: "48x48",
        purpose: "maskable",
      },
    ],
    orientation: "any",
    display: "standalone",
    dir: "auto",
    lang: "ko-KR",
    start_url: "/",
  };
}
