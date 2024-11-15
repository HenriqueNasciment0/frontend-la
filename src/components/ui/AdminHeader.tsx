"use client";

import React from "react";
import { ModeToggle } from "./mode-toggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

export function AdminHeader() {
  const { theme } = useTheme();
  const t = useTranslations("Header");

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-700">
      <div className="flex items-center space-x-3 text-gray-800 dark:text-white">
        <div className="h-full">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={80}
            height={80}
            className={`h-full object-contain ${
              theme !== "light" ? "invert" : ""
            }`}
          />
        </div>
        <span className="text-lg font-bold">{t("admin")}</span>
      </div>

      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        <ModeToggle />
      </div>
    </header>
  );
}
