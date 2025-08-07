import * as React from "react"
import {
  IconDashboard,
  IconFileDescription,
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
    {
      title: "Traitement des lauréats",
      url: "/diplomastatus",
      icon: IconFileDescription,
    },
    /*  EN_ATTENTE = "en attente"
    ENVOYE_A_LA_PRESIDENCE = "envoyé à la présidence"
    ARRIVE_A_LA_PRESIDENCE = "arrivé à la présidence"
    ENVOYE_A_L_ETABLISSEMENT = "envoyé à l'établissement"
    ARRIVE_A_L_ETABLISSEMENT = "arrivé à l'établissement"
    CORRECTION_REQUISE = "correction requise"
    RENVOYE_APRES_CORRECTION = "renvoyé après correction"
    SIGNE_PAR_PRESIDENT = "signé par le président" 
    PRET = "prêt"
    DELIVRE = "délivré" */
    //add a tap for each status
 
  ]

const subItems = [   {
      title:"En attente",
      url: "/diplomastatus/en-attente",
      icon: IconInnerShadowTop,
    },
    {
      title:"Envoyé à la présidence",
      url: "/diplomastatus/envoye-a-la-presidence",
      icon: IconInnerShadowTop,
    },
    {
      title:"Arrivé à la présidence",
      url: "/diplomastatus/arrive-a-la-presidence",
      icon: IconInnerShadowTop,
    },
    {
      title:"Envoyé à l'établissement",
      url: "/diplomastatus/envoye-a-l-etablissement",
      icon: IconInnerShadowTop,
    },
    {
      title:"Arrivé à l'établissement",
      url: "/diplomastatus/arrive-a-l-etablissement",
      icon: IconInnerShadowTop,
    },
    {
      title:"Correction requise",
      url: "/diplomastatus/correction-requise",
      icon: IconInnerShadowTop,
    },
    {
      title:"Renvoyé après correction",
      url: "/diplomastatus/renvoye-apres-correction",
      icon: IconInnerShadowTop,
    },
    {
      title:"Signé par le président",
      url: "/diplomastatus/signe-par-president",
      icon: IconInnerShadowTop,
    },
    {
      title:"Prêt",
      url: "/diplomastatus/pret",
      icon: IconInnerShadowTop,
    },
    {
      title:"Délivré",
      url: "/diplomastatus/delivre",
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
