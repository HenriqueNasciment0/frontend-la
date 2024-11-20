import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lua Abreu | Home",
  description: "Lua Abreu Photography",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
