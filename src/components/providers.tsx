"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import { ReactNode, useEffect } from "react";
import { useTranslation } from 'react-i18next';

function LanguageUpdater() {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <LanguageUpdater />
        {children}
      </ThemeProvider>
    </I18nextProvider>
  );
}
