import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lua Abreu | Login",
  description: "Admin Login",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
