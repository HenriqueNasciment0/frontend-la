import { AdminHeader } from "@/components/ui/AdminHeader";
import { Footer } from "@/components/ui/Footer";

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <div className="flex flex-col min-h-screen justify-between">
          {/* <AdminHeader /> */}
          {children}
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
