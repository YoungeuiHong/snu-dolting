import type { Metadata } from "next";
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
  title: "돌싱글즈 in SNU",
  description: "돌싱글즈 in SNU",
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
