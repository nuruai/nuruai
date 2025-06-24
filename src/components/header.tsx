"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./language-switcher";

const navItems = [
  { name: "Home", href: "/", key: "nav.home" },
  { name: "About", href: "/about", key: "nav.about" },
  { name: "AI Solutions", href: "/ai-solutions", key: "nav.aiSolutions" },
  { name: "Training", href: "/training", key: "nav.training" },
  { name: "Services", href: "/services", key: "nav.services" },
  { name: "Projects", href: "/projects", key: "nav.projects" },
  { name: "Blog", href: "/blog", key: "nav.blog" },
  { name: "Contact", href: "/contacts", key: "nav.contact" },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-md py-3"
          : "bg-background/80 py-5"
      )}
    >
      <div className="container flex items-center justify-between">
                <Link href="/" className="ml-2 md:ml-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Image src="/fivicon.png" alt="Nuruai Logo" width={28} height={28} />
            <span className="text-primary">Nuruai</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="flex items-center gap-2 ml-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mr-2"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-2 py-1 text-lg font-medium hover:text-primary transition-colors"
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}