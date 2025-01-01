"use client";

import * as React from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";

interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

export function NavMain({ items }: { items: NavItem[] }) {
  const t = useTranslations("Sections");

  const pathname = usePathname();
  const [openSection, setOpenSection] = React.useState<string>(
    () =>
      items.find((item) => pathname?.includes(`/${item.title}/`))?.title ||
      "works"
  );

  const getBasePath = () => {
    return pathname?.includes("/dashboard")
      ? pathname.substring(0, pathname.indexOf("/dashboard"))
      : "";
  };

  const isActiveSection = (item: NavItem) => {
    return openSection === item.title;
  };

  const isActiveLink = (url: string) => {
    return pathname?.endsWith(url.replace("dashboard/", ""));
  };

  const constructFullPath = (url: string) => {
    return `${getBasePath()}/${url}`;
  };

  const handleSectionClick = (title: string) => {
    setOpenSection(title === openSection ? "" : title);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            open={isActiveSection(item)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger
                asChild
                onClick={() => handleSectionClick(item.title)}
              >
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{t(item.title)}</span>
                  <ChevronRight
                    className="ml-auto transition-transform duration-200 
                    group-data-[state=open]/collapsible:rotate-90"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        data-active={isActiveLink(subItem.url)}
                      >
                        <Link href={constructFullPath(subItem.url)}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
