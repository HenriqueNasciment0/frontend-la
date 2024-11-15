// src/components/ui/LanguageSwitcher.tsx
"use client";

import React from "react";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

export function LanguageSwitcher() {
  const t = useTranslations("SwitcherLang");
  const router = useRouter();
  const pathname = usePathname();

  const handleLocalSwitch = (lang: string) => {
    router.replace({ pathname }, { locale: lang });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Switch Language">
          <Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={5}>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleLocalSwitch("pt")}>
            {t("portuguese")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleLocalSwitch("en")}>
            {t("english")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleLocalSwitch("es")}>
            {t("spanish")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
