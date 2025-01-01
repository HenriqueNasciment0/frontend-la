import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslations } from "next-intl";

interface BreadcrumbComponentProps {
  pathname: string;
}

export const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({
  pathname,
}) => {
  const t = useTranslations("Breadcrumb");

  const generateBreadcrumbItems = React.useMemo(() => {
    if (!pathname) return { prefix: "", items: [] };
    const segments = pathname.split("/").filter(Boolean);

    const prefix = segments.slice(0, 2).join("/");

    const dashboardIndex = segments.indexOf("dashboard");
    const relevantSegments =
      dashboardIndex >= 0 ? segments.slice(dashboardIndex + 1) : [];

    const items = relevantSegments.map((segment, index) => ({
      name: segment,
      url:
        index === relevantSegments.length - 1
          ? null
          : `/${prefix}/dashboard/${relevantSegments
              .slice(0, index + 1)
              .join("/")}`,
    }));

    return { prefix, items };
  }, [pathname]);

  const { prefix, items: breadcrumbItems } = generateBreadcrumbItems;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/${prefix}/dashboard`}>
            DashBoard
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {item.url ? (
                <BreadcrumbLink href={item.url}>{t(item.name)}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{t(item.name)}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
