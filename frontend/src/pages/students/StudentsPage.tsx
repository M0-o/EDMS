import { AppSidebar } from "@/components/app-sidebar"
import { StudentsDataTable  } from "@/components/data-table-students"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { studentSchemaOut } from "@/schemas/studentSchemas"
import { z } from "zod"
import tdata from "@/app/dashboard/data.json"

const data : z.infer<typeof studentSchemaOut>[] = [{
  id: 1,
  first_name: "John",
  last_name: "Doe",
  cne: "CNE123",
  apogee: "APOGEE123",
  email: "john.doe@example.com",
  created_at: "2023-01-01",
}, {
  id: 2,
  first_name: "Jane",
  last_name: "Smith",
  cne: "CNE456",
  apogee: "APOGEE456",
  email: "jane.smith@example.com",
  created_at: "2023-01-02",
}]
export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            
              <StudentsDataTable pdata={data} />
             
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
