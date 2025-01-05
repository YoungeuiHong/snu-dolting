import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "400 500 600 700",
});

const gmarket = localFont({
  src: "./fonts/GmarketSansTTFMedium.ttf",
  variable: "--font-gmarket",
  weight: "400 500 600 700",
});

export const metadata: Metadata = {
  title: "스누돌팅",
  description: "스누돌팅",
  verification: {
    google: process.env.GOOGLE_DNS,
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} ${gmarket.variable}`}>
        {children}
      </body>
    </html>
  );
}
