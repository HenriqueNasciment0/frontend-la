"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "@/components/team-switcher";

// This is sample data.
const data = {
  user: {
    name: "Lua Abreu",
    email: "luanicole@gmail.com",
    avatar: "/avatar.png",
  },
  teams: [
    {
      name: "Lua Abreu Photography",
      logo: GalleryVerticalEnd,
      plan: "Administração",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Trabalhos",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Novo",
          url: "dashboard/works/new",
        },
        {
          title: "Editar",
          url: "#",
        },
        {
          title: "Todos",
          url: "#",
        },
      ],
    },
    {
      title: "Tipos de Serviço",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Novo",
          url: "dashboard/categories/new",
        },
        {
          title: "Editar",
          url: "#",
        },
        {
          title: "Excluir",
          url: "#",
        },
      ],
    },
    {
      title: "Locations",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Visualizar",
          url: "#",
        },
        {
          title: "Editar",
          url: "#",
        },
        {
          title: "Excluir",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
