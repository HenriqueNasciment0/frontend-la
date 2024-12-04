"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GetCurrentUser, refreshToken } from "@/api/endpoints/auth";

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

  return <>{isAuthenticated && children}</>;
}
