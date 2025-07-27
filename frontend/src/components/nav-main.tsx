
import {Collapsible , CollapsibleTrigger , CollapsibleContent} from "@/components/ui/collapsible"
import {Link} from "react-router-dom"
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
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  return (
    <>
   
    <SidebarGroup>
      <SidebarGroupContent >
        <SidebarMenu>
            {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
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
        Traitement des lauréats
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
         </CollapsibleTrigger >
      <CollapsibleContent >
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <Link to={item.url}><span>{item.title}</span></Link>
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
