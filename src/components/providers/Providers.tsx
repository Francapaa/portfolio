"use client";

import { I18nProvider } from "@/lib/i18n";
import dynamic from "next/dynamic";

const ArgentinaSky = dynamic(
  () => import("@/components/three/ArgentinaSky"),
  { ssr: false }
);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <ArgentinaSky />
      {children}
    </I18nProvider>
  );
}
