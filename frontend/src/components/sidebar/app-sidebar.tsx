import * as React from "react"
import {
  IconInnerShadowTop,
} from "@tabler/icons-react"


import { NavMain } from "@/components/sidebar/nav-main"

import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {useUser} from "@clerk/clerk-react"
import {navMain ,subItems} from "@/components/sidebar/config"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser()
  
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} subItems={subItems} />

      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ email: user?.primaryEmailAddress?.emailAddress || "", avatar: user?.imageUrl || "" }} />
      </SidebarFooter>
    </Sidebar>
  )
}
