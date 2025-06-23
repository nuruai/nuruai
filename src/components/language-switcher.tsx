"use client";

import * as React from "react";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FranceFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-6 rounded-sm" viewBox="0 0 3 2">
    <path fill="#0055A4" d="M0 0h1v2H0z" />
    <path fill="#FFFFFF" d="M1 0h1v2H1z" />
    <path fill="#EF4135" d="M2 0h1v2H2z" />
  </svg>
);

const UKFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-6 rounded-sm" viewBox="0 0 60 30">
        <clipPath id="a"><path d="M0 0v30h60V0z"/></clipPath>
        <path d="M0 0v30h60V0z" fill="#012169"/>
        <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
        <path d="M0 0l60 30m0-30L0 30" clipPath="url(#a)" stroke="#C8102E" strokeWidth="4"/>
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
    </svg>
);

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="transition-transform duration-200 hover:scale-110">
          {i18n.language.startsWith('fr') ? <FranceFlag /> : <UKFlag />}
          <span className="sr-only">Changer de langue</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage('fr')} className="flex items-center gap-2 cursor-pointer">
          <FranceFlag />
          <span>Français</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('en')} className="flex items-center gap-2 cursor-pointer">
          <UKFlag />
          <span>English</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
