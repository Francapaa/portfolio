"use client";

import { I18nProvider } from "@/lib/i18n";
import ArgentinaSky from "@/components/three/ArgentinaSky";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <ArgentinaSky />
      {children}
    </I18nProvider>
  );
}