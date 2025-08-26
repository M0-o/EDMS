
import {Collapsible , CollapsibleTrigger , CollapsibleContent} from "@/components/ui/collapsible"
import { useNavigate} from "react-router-dom"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {ChevronDown } from "lucide-react"
import {type Icon} from "@tabler/icons-react"

export function NavMain({
  items,
  subItems
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[] ,
  subItems: {
    title: string
    url: string
    icon?: Icon
  }[]
  
}) {
  let navigate = useNavigate();
  return (
    <>
   
    <SidebarGroup>
      <SidebarGroupContent >
        <SidebarMenu>
            {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} onClick={() => navigate(item.url)}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
    <Collapsible>
    <SidebarGroup>
      <CollapsibleTrigger className="flex items-left">
        Traitement des Diplomes
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
         </CollapsibleTrigger >
      <CollapsibleContent >
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {subItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} onClick={()=> navigate(item.url)}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
      </CollapsibleContent>
    </SidebarGroup>
    </Collapsible>
     </>
  )
}
