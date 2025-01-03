"use client";

import React from "react";
// import Image from "next/image";
// import { useTheme } from "next-themes";
import Link from "next/link";

export function Footer({ t }: { t: (key: string) => string }) {
  // const { theme } = useTheme();

  return (
    <footer className="flex flex-col md:flex-row items-center justify-between px-6 py-4 space-y-4 md:space-y-0">
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 text-gray-800 dark:text-white text-center md:text-left">
        {/* <div className="flex-shrink-0">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={60}
            height={28}
            className={`object-contain ${theme !== "light" ? "invert" : ""}`}
          />
        </div> */}
        <span className="text-sm">
          &copy; {new Date().getFullYear()} {t("developer")}
          <Link
            href="https://github.com/HenriqueNasciment0"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <strong>Henrique Nascimento</strong>
          </Link>
        </span>
      </div>

      {/* Links */}
      <div className="flex flex-wrap justify-center md:justify-end items-center space-x-4 md:space-x-4 text-sm text-gray-600 dark:text-gray-400">
        <Link href="/terms" className="hover:underline">
          {t("terms")}
        </Link>
        <Link href="/privacy" className="hover:underline">
          {t("privacy")}
        </Link>
        <Link href="/contact" className="hover:underline">
          {t("contact")}
        </Link>
      </div>
    </footer>
  );
}
