"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { GetCurrentUser, refreshToken } from "@/api/endpoints/auth";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbComponent } from "@/components/BreadcrumbComponent";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const validateToken = async () => {
      try {
        await GetCurrentUser();
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token inválido. Tentando atualizar...", error);
        try {
          await refreshToken();
          setIsAuthenticated(true);
        } catch (refreshError) {
          console.error(
            "Erro ao atualizar o token. Redirecionando para login...",
            refreshError
          );
          setIsAuthenticated(false);
          router.push("/pt/admin/login");
        }
      }
    };

    validateToken();
  }, [router]);

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <BreadcrumbComponent pathname={pathname} />
            </div>
          </header>

          {isAuthenticated !== null ? (
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              {isAuthenticated && children}
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              recharging...
            </div>
          )}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
