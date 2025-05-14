import * as React from "react";
import { Minus, Plus } from "lucide-react";

import { SearchForm } from "@/components/search-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { getSubreddits } from "@/sanity/lib/subreddit/getSubreddits";
import CreateCommunityButton from "./header/CreateCommunityButton";

// This is sample data.
type SidebarData = {
  navMain: {
    title: string;
    url?: string;
    items?: {
      title: string;
      url?: string;
      isActive?: boolean;
    }[];
  }[];
};

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const subreddits = await getSubreddits();
  const sidebarData: SidebarData = {
    navMain: [
      {
        title: "Communities",
        url: "#",
        items:
          subreddits?.map((subreddit) => ({
            title: subreddit.title || "unknown",
            url: `/community/${subreddit.slug}`,
            isActive: false,
          })) || [],
      },
    ],
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={"/"}>
                <Image
                  src="/images/brandFullLogo.png"
                  alt="Brand Icon"
                  width={200}
                  height={50}
                  className="object-contain"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuSubButton asChild>
                <CreateCommunityButton/>
              </SidebarMenuSubButton>
            </SidebarMenuItem>
            {sidebarData.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 1}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.url ? (
                        <Link href={item.url}>{item.title}</Link>
                      ) : (
                        item.title
                      )}
                      {item.items?.length ? (
                        <>
                          <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                          <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                        </>
                      ) : null}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subitem) => (
                          <SidebarMenuSubItem key={subitem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={subitem.url ?? "#"}>
                                {subitem.title}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
