"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GetCurrentUser, refreshToken } from "@/api/endpoints/auth";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

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

  if (isAuthenticated === null) {
    return <div>Redirect...</div>;
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="dashboard">DashBoard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Trabalhos</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {isAuthenticated && children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
