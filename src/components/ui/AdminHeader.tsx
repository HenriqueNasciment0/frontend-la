"use client";

import React from "react";
import { ModeToggle } from "./mode-toggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import Image from "next/image";
import { useTheme } from "next-themes";

export function AdminHeader() {
  const { theme } = useTheme();

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2 text-gray-800 dark:text-white">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={32}
          height={32}
          className={`${theme === "dark" ? "invert" : ""}`}
        />
        <span className="text-lg font-bold">Admin</span>
      </div>

      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        <ModeToggle />
      </div>
    </header>
  );
}
