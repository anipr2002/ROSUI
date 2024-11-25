"use client";
import React, { useState, useEffect } from "react";
import { ChevronRight, Command, LifeBuoy, Send, Files } from "lucide-react";
import {
  BagIcon,
  NodeIcon,
  ServiceIcon,
  TopicIcon,
} from "@/components/ros-icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import useNodeStore from "@/store/nodeStore";
import Image from "next/image";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  docs: [
    {
      title: "Docs",
      url: "#",
      icon: Files,
      isActive: true,
      items: [
        {
          title: "Installation",
          url: "/dashboard/docs",
        },
      ],
    },
  ],
  navMain: [
    {
      title: "Nodes",
      url: "#",
      icon: NodeIcon,
      isActive: true,
      items: [
        {
          title: "View Nodes",
          url: "/dashboard/nodes",
        },
      ],
    },
    {
      title: "Topics",
      url: "#",
      icon: TopicIcon,
      items: [
        {
          title: "View All Topics",
          url: "/dashboard/topics",
        },
        {
          title: "Publish Message",
          url: "/dashboard/topics/publish",
        },
      ],
    },
    {
      title: "Services",
      url: "#",
      icon: ServiceIcon,
      items: [
        {
          title: "View All Services",
          url: "/dashboard/services",
        },
        {
          title: "Call Service",
          url: "/dashboard/services/call",
        },
      ],
    },
    {
      title: "Parameters",
      url: "#",
      icon: BagIcon,
      items: [
        {
          title: "View Parameters",
          url: "/dashboard/params",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "GitHub",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

const AppSidebar = ({ children }: { children: React.ReactNode }) => {
  const [activeItem, setActiveItem] = useState({ parent: "", child: "" });

  const { nodes } = useNodeStore();
  useEffect(() => {
    // Set initial active item based on current URL
    const path = window.location.pathname;
    for (const item of [...data.docs, ...data.navMain]) {
      if (item.items) {
        for (const subItem of item.items) {
          if (subItem.url === path) {
            setActiveItem({ parent: item.title, child: subItem.title });
            return;
          }
        }
      }
    }
  }, []);

  const handleMenuClick = (parent: string, child: string) => {
    setActiveItem({ parent, child });
  };
  return (
    <>
      <Sidebar variant="inset" className="z-[9999]">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    {/* <Command className="size-4" /> */}
                    <Image
                      className="dark:invert"
                      src="/logo.svg"
                      alt="Logo"
                      width={16}
                      height={16}
                      priority
                    />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate text-2xl font-semibold">
                      ROSUI
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Getting Started</SidebarGroupLabel>
            <SidebarMenu>
              {data.docs.map((item) => (
                <Collapsible key={item.title} asChild defaultOpen>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      onClick={() => handleMenuClick(item.title, "")}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.items?.length ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <ChevronRight />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  onClick={() =>
                                    handleMenuClick(item.title, subItem.title)
                                  }
                                >
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <Collapsible key={item.title} asChild defaultOpen>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      onClick={() => handleMenuClick(item.title, "")}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.items?.length ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <ChevronRight />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  onClick={() =>
                                    handleMenuClick(item.title, subItem.title)
                                  }
                                >
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                {data.navSecondary.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      size="sm"
                      onClick={() => handleMenuClick(item.title, "")}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {activeItem.parent && (
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      {activeItem.parent}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                )}
                {activeItem.parent && activeItem.child && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
                {activeItem.child && (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{activeItem.child}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </>
  );
};

export default AppSidebar;
