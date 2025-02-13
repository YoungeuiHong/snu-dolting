import { GnbBar } from "@/components/gnb";
import { layoutContainer } from "@/app/(with-gnb)/layout.css";

export default function GnbLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className={layoutContainer}>{children}</div>
      <GnbBar />
    </>
  );
}
