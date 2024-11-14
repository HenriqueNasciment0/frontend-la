// src/components/ui/LanguageSwitcher.tsx
"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";

export function LanguageSwitcher() {
  const currentPath = usePathname();

  const generatePathWithLanguage = (locale: string) => {
    return `${currentPath.replace(/^\/(pt|en|es)/, `/${locale}`)}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Switch Language">
          <Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href={generatePathWithLanguage("pt")}>Português</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={generatePathWithLanguage("en")}>English</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={generatePathWithLanguage("es")}>Español</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
