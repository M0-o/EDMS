import * as React from "react"
import {
  IconDashboard,
  
  IconInnerShadowTop,
  IconListDetails,
  
} from "@tabler/icons-react"


import { NavMain } from "@/components/nav-main"

import { NavUser } from "@/components/nav-user"
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

const navMain =  [
    {
      title: "Liste des lauréats",
      url: "/students",
      icon: IconDashboard,
    },
    {
      title: "Liste des diplomes",
      url: "/diplomas",
      icon: IconListDetails,
    },
  
  ]

const subItems = [   {
      title:"En attente",
      url: "/diploma_status/en-attente",
      icon: IconInnerShadowTop,
    },
    {
      title:"Envoyé à la présidence",
      url: "/diploma_status/envoye-a-la-presidence",
      icon: IconInnerShadowTop,
    },
    {
      title:"Arrivé à la présidence",
      url: "/diploma_status/arrive-a-la-presidence",
      icon: IconInnerShadowTop,
    },
    {
      title:"Envoyé à l'établissement",
      url: "/diploma_status/envoye-a-l-etablissement",
      icon: IconInnerShadowTop,
    },
    {
      title:"Arrivé à l'établissement",
      url: "/diploma_status/arrive-a-l-etablissement",
      icon: IconInnerShadowTop,
    },
    {
      title:"Correction requise",
      url: "/diploma_status/correction-requise",
      icon: IconInnerShadowTop,
    },
    {
      title:"Renvoyé après correction",
      url: "/diploma_status/renvoye-apres-correction",
      icon: IconInnerShadowTop,
    },
    {
      title:"Signé par le président",
      url: "/diploma_status/signe-par-president",
      icon: IconInnerShadowTop,
    },
    {
      title:"Prêt",
      url: "/diploma_status/pret",
      icon: IconInnerShadowTop,
    },
    {
      title:"Délivré",
      url: "/diploma_status/delivre",
      icon: IconInnerShadowTop,
    },]
 


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
