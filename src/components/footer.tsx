"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="#home">
              <div className="font-bold text-xl mb-4">
                <span className="text-primary">Nuruai</span>
              </div>
            </Link>
            <p className="text-muted-foreground max-w-md">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4">{t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              {["Home", "About", "AI Solutions", "IT Solutions", "Projects", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/ /g, "-").replace("ai-solutions", "ai-solutions").replace("it-solutions", "it-solutions")}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(`nav.${item.toLowerCase().replace(/ /g, "")}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4">{t("footer.connect")}
            </h3>
            <div className="flex space-x-3 mb-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://www.linkedin.com/in/jospin-ndagano" target="_blank" rel="noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com/JospinNdagano" target="_blank" rel="noreferrer">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              jospinndagano1@gmail.com
            </p>
          </div>
        </div>

        <div className="border-t border-muted mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}